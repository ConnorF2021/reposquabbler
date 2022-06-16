from flask import Flask, render_template, request, flash, redirect, session, url_for, escape, make_response
from flask_socketio import SocketIO, join_room, leave_room, emit
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
		return redirect(url_for('home'))
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
			return redirect(url_for('home'))
		else:
			msg = 'Failed to log you in!'
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('login.html', msg = msg)

@app.route("/home", methods = ['GET','POST'])
def home():
	if 'UID' not in session:
		return redirect(url_for('landing'))
	uid = session['UID']
	msg = ''
	failmsg = ''
	if request.method == 'POST' and ('changeuser' in request.form or 'changename' in request.form or 'changesite' in request.form or 'changedesc' in request.form):
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
				failmsg = 'User Tag has been Taken!'
			else:
				cursor.execute("UPDATE accounts SET username = '%s', name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newusername, newname, newsite, newdesc, uid))
				mysql.connection.commit()
				msg = 'Successfully Updated!'
		else:
			cursor.execute("UPDATE accounts SET name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newname, newsite, newdesc, uid))
			mysql.connection.commit()
			msg = 'Successfully Updated!'
	elif request.method == 'POST' and 'posttext' in request.form:
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		posttext = request.form['posttext']
		posterid = session['UID']
		postdate = (datetime.datetime.now()).strftime("%x")
		cursor.execute('INSERT INTO posts (postdate,content,id) VALUES ( % s, % s, % s )', (postdate, posttext, posterid ))
		mysql.connection.commit()
	elif 'UID' in session:
		uid = session['UID']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE id = % s', (uid, ))
		account = cursor.fetchone()
		loadposts = cursor.execute('SELECT content, postdate FROM posts')
		posts = cursor.fetchall()
		return render_template('home.html', username = account['username'].lower(), fullname = account['name'], msg = msg, failmsg = failmsg, desc = account['description'], site = account['site'], posts=posts)
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