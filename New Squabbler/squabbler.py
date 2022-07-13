from flask import Flask, render_template, request, flash, redirect, session, url_for, escape, make_response
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import random
import string
import datetime
import json

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
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route("/", methods = ['GET','POST'])
def landing():
	if check_session():
		return redirect(url_for('squabble'))
	return render_template('landing.html')

@app.route("/register", methods = ['GET','POST'])
def register():
	msg = ''
	if check_session():
		return redirect(url_for('squabble'))
	elif request.method == 'POST' and 'fullname' in request.form and 'username' in request.form and 'password' in request.form and 'password2' in request.form:
		msg = handle_create_account_form()
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('createuser.html', msg = msg)

@app.route("/login", methods = ['GET','POST'])
def login():
	msg = ''
	if check_session():
		return redirect(url_for('squabble'))
	elif request.method == 'POST' and 'username' in request.form and 'password' in request.form:
		msg = handle_login_request()
		if check_session():
			return redirect(url_for('squabble'))
		return render_template('login.html', msg = msg)
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('login.html', msg = msg)

@app.route("/squabble", methods = ['GET','POST'])
def squabble():
	if request.method == 'POST' and 'posttext' in request.form and check_session():
		posttext = request.form['posttext']
		posterid = session['UID']
		cursor = connect_mysql()
		account = fetch_client_account()
		if not posttext:
			return render_template('squabble.html', username = account['username'].lower(), fullname = account['name'])
		author = account['username']
		authorname = account['name']
		postdate = (datetime.datetime.now()).strftime("%x")
		cursor.execute('INSERT INTO posts (postdate,content,id,author,authorname) VALUES ( % s, % s, % s, % s, % s )', (postdate, posttext, posterid, author, authorname ))
		mysql.connection.commit()
		return render_template('squabble.html', username = account['username'].lower(), fullname = account['name'])
	elif check_session():
		account = fetch_client_account()
		return render_template('squabble.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/feed", methods = ['GET','POST'])
def feed():	
	if check_session():
		account = fetch_client_account()
		discoverposts = fetch_feed_discover()
		followingposts = fetch_feed_following()
		return render_template('feed.html', username = account['username'].lower(), fullname = account['name'], discoverposts=discoverposts, followingposts=followingposts, UID = account['id'])
	return redirect(url_for('landing'))

@app.route("/profile", methods = ['GET','POST'])
def profile():
	if request.method == 'POST' and ('changeuser' in request.form or 'changename' in request.form or 'changesite' in request.form or 'changedesc' in request.form):
		uid = session['UID']
		cursor = connect_mysql()
		account = fetch_client_account()
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
			searchaccount = connect_mysql()
			if searchaccount:
				flash('User Tag has been Taken!', 'errormsg')
				posts = fetch_posts_by_id(uid)
				followers = fetch_followers(uid)
				following = fetch_following(uid)
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
			else:
				cursor.execute("UPDATE accounts SET username = '%s', name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newusername, newname, newsite, newdesc, uid))
				mysql.connection.commit()
				flash('Successfully Updated!', 'successmsg')
				account = fetch_client_account()
				posts = fetch_posts_by_id(uid)
				followers = fetch_followers(uid)
				following = fetch_following(uid)
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
		else:
			cursor.execute("UPDATE accounts SET name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newname, newsite, newdesc, uid))
			mysql.connection.commit()
			flash('Successfully Updated!', 'successmsg')
			account = fetch_client_account()
			posts = fetch_posts_by_id(uid)
			followers = fetch_followers(uid)
			following = fetch_following(uid)
			return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
	elif request.method == 'POST' and 'posttext' in request.form and check_session():
		posttext = request.form['posttext']
		uid = session['UID']
		posterid = uid
		cursor = connect_mysql()
		account = fetch_client_account()
		if not posttext:
			posts = fetch_posts_by_id(uid)
			followers = fetch_followers(uid)
			following = fetch_following(uid)
			return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
		author = account['username']
		authorname = account['name']
		postdate = (datetime.datetime.now()).strftime("%x")
		cursor.execute('INSERT INTO posts (postdate,content,id,author,authorname) VALUES ( % s, % s, % s, % s, % s )', (postdate, posttext, posterid, author, authorname ))
		mysql.connection.commit()
		posts = fetch_posts_by_id(uid)
		followers = fetch_followers(uid)
		following = fetch_following(uid)
		return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
	elif check_session():
		uid = session['UID']
		if '_flashes' in session:
			session['_flashes'].clear()
		cursor = connect_mysql()
		account = fetch_client_account()
		followers = fetch_followers(uid)
		following = fetch_following(uid)
		posts = fetch_posts_by_id(uid)
		return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
	return redirect(url_for('landing'))

@app.route("/explore", methods = ['GET','POST'])
def explore():
	if check_session():
		account = fetch_client_account()
		return render_template('explore.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/solo", methods = ['GET','POST'])
def solo():
	if check_session():
		account = fetch_client_account()
		return render_template('solo.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/multi", methods = ['GET','POST'])
def multi():
	if check_session():
		account = fetch_client_account()
		return render_template('multi.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/create", methods = ['GET','POST'])
def create():
	if request.method == 'POST' and 'solotitleinput' in request.form and 'solodescinput' in request.form and check_session():
		uid = session['UID']
		cursor = connect_mysql()
		account = fetch_client_account()
		inputtitle = request.form['solotitleinput']
		inputdesc = request.form['solodescinput']
		if not inputtitle or not inputdesc:
			msg = 'Please fill out the form!'
			return render_template('create.html', msg=msg, username = account['username'].lower(), fullname = account['name'])
		creatorid = session['UID']
		cursor = connect_mysql()
		cursor.execute('INSERT INTO solorooms (title,description,user1id,user2id,anon,basic,trusted,scholar) VALUES ( % s, % s, % s, % s, % s, % s, % s, % s )', (inputtitle, inputdesc, creatorid, 'none','1','1','1','1' ))
		mysql.connection.commit()
		return redirect(url_for('waitingroom'))
	elif check_session():
		account = fetch_client_account()
		return render_template('create.html', username = account['username'].lower(), fullname = account['name'])
	return redirect(url_for('landing'))

@app.route("/waitingroom", methods = ['GET','POST'])
def waitingroom():
	if check_session():
		uid = session['UID']
		account = fetch_client_account()
		cursor = connect_mysql()
		cursor.execute('SELECT * FROM solorooms WHERE user1id = % s', (uid, ))
		user1idsearch = cursor.fetchone()
		if user1idsearch:
			return render_template('waitingroom.html', username = account['username'].lower(), fullname = account['name'], hostname = account['name'])
	return redirect(url_for('landing'))

@app.route("/<username>", methods = ['GET','POST'])
def profiles(username):
	if check_session():
		cursor = connect_mysql()
		account = fetch_client_account()
		if username == account['username']:
			return	redirect(url_for('profile'))
		else:
			otherusername = username
			cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
			otheraccount = cursor.fetchone()
			if otheraccount:
				otherfollowers = fetch_followers(otheraccount['id'])
				otherfollowing = fetch_following(otheraccount['id'])
				posts = fetch_posts_by_id(otheraccount['id'])
				return render_template('otherprofiles.html', username = account['username'].lower(), fullname = account['name'], otherusername = otheraccount['username'], othername = otheraccount['name'], otherdesc = otheraccount['description'], othersite = otheraccount['site'], otherfollowers=otherfollowers, otherfollowing=otherfollowing, posts=posts)
			else:
				return redirect(url_for('squabble'))
	return redirect(url_for('landing'))

@app.route("/account")
def account():
	if check_session():
		return render_template('account.html')
	return redirect(url_for('landing'))

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for('landing'))

@socketio.on('handle_comment')
def handle_comment(data):
	commentdate = (datetime.datetime.now()).strftime("%x")
	commenterid = data['UID']
	content = data['comment']
	postid = data['postid']
	cursor = connect_mysql()
	cursor.execute('INSERT INTO postcomments (postdate,posterid,content,postid) VALUES ( % s, % s, % s, % s )', (commentdate, commenterid,content,postid))
	mysql.connection.commit()

@socketio.on('get_comments')
def get_comments(data):
	app.logger.info("Recieved data {}".format(data['postid']))
	requesterid = session['UID']
	print(requesterid)
	postid = data['postid']
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM postcomments WHERE postid = % s', (postid, ))
	c = cursor.fetchall()
	comments = json.dumps(c)
	app.logger.info("Sending Data {}, {}".format(comments, postid))
	socketio.emit('recieve_comments', comments, postid=data['postid'])

def check_session():
	if 'UID' in session and 'username' in session:
		if validate_session():
			return	True
		else:
			return	False
	else:
		return False

def validate_session():
	account = fetch_client_account()
	if session['username'] == account['username']:
		return True
	else:
		return False

def fetch_client_account():
	sessionid = session['UID']
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM accounts WHERE id = % s', (sessionid, ))
	account = cursor.fetchone()
	return account

def connect_mysql():
	cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
	return cursor

def generate_uid():
	letters = string.digits
	uid = ( ''.join(random.choice(letters) for i in range(30)) )
	return uid

def handle_create_account_form():
	fullname = request.form['fullname']
	username = request.form['username']
	password = request.form['password']
	password2 = request.form['password2']
	cursor = connect_mysql()
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
		msg = create_account(username,password,fullname)
	return msg

def create_account(username,password,fullname):
	cursor = connect_mysql()
	uid = generate_uid()
	cursor.execute('INSERT INTO accounts (id,username,password,name) VALUES ( % s, % s, % s, % s )', (uid, username, password, fullname ))
	mysql.connection.commit()
	msg = 'You have successfully registered ! Navigate to log in page to get started!'
	return msg

def handle_login_request():
	username = request.form['username']
	password = request.form['password']
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
	account = cursor.fetchone()
	if account and password == account['password']:
		msg = 'Logged in successfully !'
		session['UID'] = account['id']
		session['username'] = account['username']
	else:
		msg = 'Failed to log you in!'
	return msg

def fetch_feed_discover():
	cursor = connect_mysql()
	loadposts = cursor.execute('SELECT content, postdate, author, authorname, pid FROM posts ORDER BY postdate DESC')
	posts = cursor.fetchall()
	return posts

def fetch_feed_following():
	uid = session['UID']
	cursor = connect_mysql()
	followinglist = cursor.execute('SELECT following FROM followers WHERE follower = % s', (uid, ))
	loadposts = cursor.execute('SELECT content, postdate, author, authorname, pid FROM posts WHERE id in (SELECT following FROM followers WHERE follower = % s) ORDER BY postdate DESC', (uid, ))
	posts = cursor.fetchall()
	return posts

def fetch_followers(a):
	cursor = connect_mysql()
	followers = cursor.execute('SELECT * FROM followers WHERE following = % s', (a, ))
	return followers

def fetch_following(a):
	cursor = connect_mysql()
	followers = cursor.execute('SELECT * FROM followers WHERE follower = % s', (a, ))
	return followers

def fetch_posts_by_id(a):
	cursor = connect_mysql()
	loadposts = cursor.execute('SELECT content, postdate, author, authorname, pid FROM posts WHERE id = % s ORDER BY postdate DESC' % (a, ))
	posts = cursor.fetchall()
	return posts

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True, log_output=True)