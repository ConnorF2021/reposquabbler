from flask import Flask, render_template, request, flash, redirect, session, url_for, escape, make_response
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import random
import string
import datetime

app = Flask(__name__)
socketio = SocketIO(app)
mysql = MySQL(app)

import secrets
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'squabbler'
app.config['MYSQL_PASSWORD'] = 'C@nner2002'
app.config['MYSQL_DB'] = 'squabblerusers'

@app.route("/", methods = ['GET','POST'])
def landing():
	if 'UID' in session:
		return redirect(url_for('squabble'))
	return render_template('landing.html')

@app.route("/register", methods = ['GET','POST'])
def register():
	msg = ''
	if 'UID' in session:
		return redirect(url_for('home'))
	elif request.method == 'POST' and 'fullname' in request.form and 'username' in request.form and 'password' in request.form and 'password2' in request.form:
		fullname = request.form['fullname']
		username = request.form['username']
		password = request.form['password']
		password2 = request.form['password2']
		letters = string.digits
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
		account = cursor.fetchone()
		if account:
			msg = 'Username has been taken!'
		elif not fullname or not username or not password or not password2:
			msg = 'Please fill out the form!'
		elif password != password2:
			msg = 'Passwords do not match!'
		elif not re.match(r'[A-Za-z0-9]+', fullname):
			msg = 'Name must contain only characters and numbers !'
		elif not re.match(r'[A-Za-z0-9]+', username):
			msg = 'Username must contain only characters and numbers !'
		else:
			uid = ( ''.join(random.choice(letters) for i in range(30)) )
			acctype = 'B'
			site = ''
			desc = ''
			email = ''
			cursor.execute('INSERT INTO accounts VALUES ( % s, % s, % s, % s, % s, % s, % s, % s )', (uid, username, password, acctype, email, fullname, site, desc ))
			mysql.connection.commit()
			msg = 'You have successfully registered !'
	elif request.method == 'POST':
			msg = 'Please fill out the form !'
	return render_template('createuser.html', msg = msg)

@app.route("/login", methods = ['GET','POST'])
def login():
	msg = ''
	if 'UID' in session:
		return redirect(url_for('home'))
	elif request.method == 'POST' and 'username' in request.form and 'password' in request.form:
		username = request.form['username']
		password = request.form['password']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
		account = cursor.fetchone()
		if account and password == account['password']:
			msg = 'Logged in successfully !'
			session['UID'] = account['id']
			return redirect(url_for('squabble'))
		else:
			msg = 'Failed to log you in!'
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('login.html', msg = msg)

@app.route("/squabble", methods = ['GET','POST'])
def squabble():
	if request.method == 'POST' and 'posttext' in request.form and 'UID' in session:
		posttext = request.form['posttext']
		posterid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (posterid, ))
		account = cursor.fetchone()
		if not posttext:
			return render_template('profile.html', username = account['username'].lower(), fullname = account['name'])
		author = account['username']
		authorname = account['name']
		postdate = (datetime.datetime.now()).strftime("%x")
		cursor.execute('INSERT INTO posts (postdate,content,id,author,authorname) VALUES ( % s, % s, % s, % s, % s )', (postdate, posttext, posterid, author, authorname ))
		mysql.connection.commit()
	elif 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('squabble.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/feed", methods = ['GET','POST'])
def feed():
	if 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		loadposts = cursor.execute('SELECT content, postdate, author, authorname, pid FROM posts ORDER BY postdate DESC')
		posts = cursor.fetchall()
		return render_template('feed.html', username = account['username'].lower(), fullname = account['name'], posts=posts)
	return redirect(url_for('landing'))

@app.route("/profile", methods = ['GET','POST'])
def profile():
	if 'UID' not in session:
		return redirect(url_for('landing'))
	elif request.method == 'POST' and ('changeuser' in request.form or 'changename' in request.form or 'changesite' in request.form or 'changedesc' in request.form):
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		changeuser = request.form['changeuser']
		changename = request.form['changename']
		changesite = request.form['changesite']
		changedesc = request.form['changedesc']
		if changeuser:
			newusername = request.form['changeuser']
		else:
			newusername = account['username']
		if changename:
			newname = request.form['changename']
		else:
			newname = account['name']
		if changesite:
			newsite = request.form['changesite']
		else:
			newsite = account['site']
		if changedesc:
			newdesc = request.form['changedesc']
		else:
			newdesc = account['description']
		
		if newusername != account['username']:
			cursor.execute('SELECT * FROM accounts WHERE username = % s', (newusername, ))
			searchaccount = cursor.fetchone()
			if searchaccount:
				flash('User Tag has been Taken!', 'errormsg')
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'])
			else:
				cursor.execute("UPDATE accounts SET username = '%s', name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newusername, newname, newsite, newdesc, uid))
				mysql.connection.commit()
				flash('Successfully Updated!', 'successmsg')
				cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
				account = cursor.fetchone()
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'])
		else:
			cursor.execute("UPDATE accounts SET name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newname, newsite, newdesc, uid))
			mysql.connection.commit()
			flash('Successfully Updated!', 'successmsg')
			cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
			account = cursor.fetchone()
			return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'])
	elif request.method == 'POST' and 'posttext' in request.form and 'UID' in session:
		posttext = request.form['posttext']
		posterid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (posterid, ))
		account = cursor.fetchone()
		if not posttext:
			return render_template('profile.html', username = account['username'].lower(), fullname = account['name'])
		author = account['username']
		authorname = account['name']
		postdate = (datetime.datetime.now()).strftime("%x")
		cursor.execute('INSERT INTO posts (postdate,content,id,author,authorname) VALUES ( % s, % s, % s, % s, % s )', (postdate, posttext, posterid, author, authorname ))
		mysql.connection.commit()
	elif 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'])
	return redirect(url_for('landing'))

@app.route("/explore", methods = ['GET','POST'])
def explore():
	if 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('explore.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/solo", methods = ['GET','POST'])
def solo():
	if 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('solo.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/multi", methods = ['GET','POST'])
def multi():
	if 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('multi.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/create", methods = ['GET','POST'])
def create():
	if request.method == 'POST' and 'solotitleinput' in request.form and 'solodescinput' in request.form and 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		inputtitle = request.form['solotitleinput']
		inputdesc = request.form['solodescinput']
		if not inputtitle or not inputdesc:
			msg = 'Please fill out the form!'
			return render_template('create.html', msg=msg, username = account['username'].lower(), fullname = account['name'])
		creatorid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('INSERT INTO solorooms (title,description,user1id,user2id,anon,basic,trusted,scholar) VALUES ( % s, % s, % s, % s, % s, % s, % s, % s )', (inputtitle, inputdesc, creatorid, 'none','1','1','1','1' ))
		mysql.connection.commit()
		return redirect(url_for('waitingroom'))
	elif 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		return render_template('create.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/waitingroom", methods = ['GET','POST'])
def waitingroom():
	if 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		cursor.execute('SELECT * FROM solorooms WHERE user1id = % s', (uid, ))
		user1idsearch = cursor.fetchone()
		if user1idsearch:
			return render_template('waitingroom.html', username = account['username'].lower(), fullname = account['name'], hostname = account['name'])
	return redirect(url_for('landing'))

@app.route("/account")
def account():
	if 'UID' in session:
		return render_template('account.html')
	return redirect(url_for('landing'))

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for('landing'))

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)