from flask import Flask, render_template, request, flash, redirect, session, url_for, escape, make_response
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_mysqldb import MySQL
from flask_login import LoginManager, UserMixin
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import MySQLdb.cursors
from werkzeug.security import generate_password_hash, check_password_hash
import re
import random
import string
import datetime
import json
import math

login_manager = LoginManager()
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
mysql = MySQL(app)

import secrets
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key
login_manager.init_app(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'squabbler'
app.config['MYSQL_PASSWORD'] = 'C@nner2002'
app.config['MYSQL_DB'] = 'squabblerusers'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@login_manager.user_loader
def load_user(UID):
    return User.get(UID)

class userInfo:
	def __init__(self, username, name, userId):
		self.name = name
		self.username = username
		self.userId = userId

class MyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])	

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
			return redirect(url_for('feed'))
		return render_template('login.html', msg = msg)
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('login.html', msg = msg)

@app.route("/feed", methods = ['GET','POST'])
def feed():	
	if check_session():
		userData = format_basic_user_data(session['UID'])
		return render_template('feed.html', userdata = userData)
	return redirect(url_for('landing'))

@app.route("/squabble", methods = ['GET','POST'])
def squabble():
	if check_session():
		userData = format_basic_user_data(session['UID'])
		return render_template('squabble.html', userdata = userData)
	return redirect(url_for('landing'))

@app.route("/profile", methods = ['GET','POST'])
def profile():
	if request.method == 'POST' and ('changeuser' in request.form or 'changename' in request.form or 'changesite' in request.form or 'changedesc' in request.form):
		uid = session['UID']
		cursor = connect_mysql()
		account = fetch_client_account()
		changeUser = request.form['changeuser']
		changeName = request.form['changename']
		changeSite = request.form['changesite']
		changeDesc = request.form['changedesc']
		if changeUser:
			newUsername = request.form['changeuser']
		else:
			newUsername = account['username']
		if changeName:
			newName = request.form['changename']
		else:
			newName = account['name']
		if changeSite:
			newSite = request.form['changesite']
		else:
			newSite = account['site']
		if changeDesc:
			newDesc = request.form['changedesc']
		else:
			newDesc = account['description']
		
		if newUsername != account['username']:
			cursor.execute('SELECT * FROM accounts WHERE username = % s', (newUsername, ))
			searchAccount = cursor.fetchone()
			if searchAccount:
				flash('User Tag has been Taken!', 'errormsg')
				posts = fetch_posts_by_id(uid)
				followers = fetch_followers(uid)
				following = fetch_following(uid)
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
			else:
				cursor.execute("UPDATE accounts SET username = '%s', name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newUsername, newName, newSite, newDesc, uid))
				mysql.connection.commit()
				flash('Successfully Updated!', 'successmsg')
				account = fetch_client_account()
				posts = fetch_posts_by_id(uid)
				followers = fetch_followers(uid)
				following = fetch_following(uid)
				return render_template('profile.html', username = account['username'].lower(), fullname = account['name'], desc = account['description'], site = account['site'], posts=posts, followers=followers, following=following)
		else:
			cursor.execute("UPDATE accounts SET name = '%s', site = '%s', description = '%s' WHERE id = '%s'" % (newName, newSite, newDesc, uid))
			mysql.connection.commit()
			flash('Successfully Updated!', 'successmsg')
			account = fetch_client_account()
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
		userData = format_basic_user_data(session['UID'])
		return render_template('explore.html', userdata = userData)
	return redirect(url_for('landing'))

@app.route("/solo", methods = ['GET','POST'])
def solo():
	if check_session():
		userData = format_basic_user_data(session['UID'])
		return render_template('solo.html', userdata = userData)
	return redirect(url_for('landing'))

@app.route("/multi", methods = ['GET','POST'])
def multi():
	if check_session():
		userData = format_basic_user_data(session['UID'])
		return render_template('multi.html', userdata = userData)
	return redirect(url_for('landing'))

@app.route("/create", methods = ['GET','POST'])
def create():
	if request.method == 'POST' and 'solotitleinput' in request.form and 'solodescinput' in request.form and check_session():
		uid = session['UID']
		cursor = connect_mysql()
		userData = format_basic_user_data(session['UID'])
		inputtitle = request.form['solotitleinput']
		inputdesc = request.form['solodescinput']
		if not inputtitle or not inputdesc:
			msg = 'Please fill out the form!'
			return render_template('create.html', msg=msg, userdata = userData)
		creatorid = session['UID']
		cursor = connect_mysql()
		cursor.execute('INSERT INTO solorooms (title,description,user1id,user2id,anon,basic,trusted,scholar) VALUES ( % s, % s, % s, % s, % s, % s, % s, % s )', (inputtitle, inputdesc, creatorid, 'none','1','1','1','1' ))
		mysql.connection.commit()
		return redirect(url_for('waitingroom'))
	elif check_session():
		userData = format_basic_user_data(session['UID'])
		return render_template('create.html', userdata = userData)
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
		userData = format_basic_user_data(session['UID'])
		if username == userData['username']:
			return	redirect(url_for('profile'))
		else:
			otherUsername = username
			cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
			otherAccount = cursor.fetchone()
			if otherAccount:
				otherFollowers = fetch_followers(otherAccount['id'])
				otherFollowing = fetch_following(otherAccount['id'])
				posts = fetch_posts_by_id(otherAccount['id'])
				return render_template('otherprofiles.html', userdata = userData, otherusername = otherAccount['username'], othername = otherAccount['name'], otherdesc = otherAccount['description'], othersite = otherAccount['site'], otherfollowers=otherFollowers, otherfollowing=otherFollowing, posts=posts)
			else:
				return redirect(url_for('squabble'))
	return redirect(url_for('landing'))

@app.route("/account")
def account():
	if check_session():
		return render_template('account.html')
	return redirect(url_for('landing'))

@app.route("/adminsuite")
def adminsuite():
	if check_session():
		account = fetch_client_account()
		return render_template('admin.html', username = account['username'].lower(), fullname = account['name'])
	return	redirect('landing')

@app.route("/adminsuite/squabbles")
def adminsuite_stream():
	if check_session():
		account = fetch_client_account()
		return render_template('adminsquabble.html', username = account['username'].lower(), fullname = account['name'])
	return

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for('landing'))

@socketio.on('handle_post')
def handle_post(data):
	content = data['content']
	if content and len(content) <= 1000:
		cursor = connect_mysql()
		posterId = session['UID']
		currentAccount = fetch_name_username(posterId)
		cursor.execute('INSERT INTO posts (content,posterid) VALUES ( % s, % s )', (content, posterId, ))
		mysql.connection.commit()

@socketio.on('handle_comment')
def handle_comment(data):
	cursor = connect_mysql()
	cursor.execute('INSERT INTO postcomments (commenterid,content,postid) VALUES ( % s, % s, % s )', (session['UID'], data['comment'], data['postid']))
	mysql.connection.commit()

@socketio.on('get_comments')
def get_comments(data):
	requesterId = session['UID']
	postId = data['postid']
	rawComments = load_comments(postId)
	if not rawComments:
		comments = create_empty_comment(postId)
		socketio.emit('recieve_comments', comments)
	else:
		comments = json_comments(rawComments,requesterId)
		socketio.emit('recieve_comments', comments)

@socketio.on('handle_reply')
def handle_reply(data):
	cursor = connect_mysql()
	cursor.execute('INSERT INTO commentreplies (replierid,content,commentid) VALUES ( % s, % s, % s )', (session['UID'], data['reply'], data['commentid']))
	mysql.connection.commit()

@socketio.on('get_replies')
def get_replies(data):
	requesterId = session['UID']
	commentId = data['commentid']
	rawReplies = load_replies(commentId)
	replies = json_replies(rawReplies,requesterId)
	socketio.emit('recieve_replies', replies)

@socketio.on('post_upvote')
def post_upvote(data):
	requesterId = session['UID']
	postid = data['postid']
	cursor = connect_mysql()
	checkupvote = check_upvote(requesterId,postid)
	checkdownvote = check_downvote(requesterId,postid)
	if not checkupvote and not checkdownvote:
		cursor.execute('INSERT INTO postupvotes (id,postid) VALUES ( % s, % s )', (requesterId, postid, ))
		mysql.connection.commit()
	elif not checkupvote:
		cursor.execute('INSERT INTO postupvotes (id,postid) VALUES ( % s, % s )', (requesterId, postid, ))
		cursor.execute('DELETE FROM postdownvotes WHERE id = % s', (requesterId, ))
		mysql.connection.commit()
	else:
		pass

@socketio.on('post_downvote')
def post_downvote(data):
	requesterId = session['UID']
	postid = data['postid']
	cursor = connect_mysql()
	checkupvote = check_upvote(requesterId,postid)
	checkdownvote = check_downvote(requesterId,postid)
	if not checkupvote and not checkdownvote:
		cursor.execute('INSERT INTO postdownvotes (id,postid) VALUES ( % s, % s )', (requesterId, postid, ))
		mysql.connection.commit()
	elif not checkdownvote:
		cursor.execute('INSERT INTO postdownvotes (id,postid) VALUES ( % s, % s )', (requesterId, postid, ))
		cursor.execute('DELETE FROM postupvotes WHERE id = % s AND postid = % s', (requesterId, postid, ))
		mysql.connection.commit()
	else:
		pass

@socketio.on('get_initial_posts')
def get_initial_posts():
	requesterId = session['UID']
	posts = fetch_feed_discover([0])
	socketio.emit('recieve_posts', posts)

@socketio.on('get_more_posts')
def get_more_posts(data):
	requesterId = session['UID']
	requestType = data['returnedFeed']
	postsAlreadyLoaded = data['postIdList']
	if requestType == 'discover':
		posts = fetch_feed_discover(postsAlreadyLoaded)
		if not posts:
			posts = create_empty_post_bubble('standard')
		socketio.emit('recieve_posts', posts)
	else:
		posts = fetch_feed_following(postsAlreadyLoaded)
		if not posts:
			posts = create_empty_post_bubble('following')
		socketio.emit('recieve_posts', posts)

def create_empty_comment(postId):
	return json.dumps([{"content": "No comments yet! Comment your thoughts on this post!", "postdate": "Just Now", "postid": postId, "author": "Squabbler", "tag": "squabbler", "commentid": "0", "replynumber": "0", "ownership": "1"}])

def create_empty_post_bubble(a):
	if a == 'following':
		return [{"content": "Nothing to see here! Follow other squabblers and posts will appear here!", "postdate": "Just Now", "pid": "0", "authorname": "Squabbler", "author": "squabbler", "commentnumber": "0", "upvotesnumber": "0", "downvotesnumber": "0", "ownership": "1", "hasvoted": "3"}]
	else:
		return [{"content": "Nothing to see here!", "postdate": "Just Now", "pid": "0", "authorname": "Squabbler", "author": "squabbler", "commentnumber": "0", "upvotesnumber": "0", "downvotesnumber": "0", "ownership": "1", "hasvoted": "3"}]


def check_upvote(a,b):
	cursor = connect_mysql()
	cursor.execute('SELECT 1 FROM postupvotes WHERE id = % s AND postid = % s', (a, b, ))
	checkupvote = cursor.fetchone()
	if not checkupvote:
		return False
	return True

def check_downvote(a,b):
	cursor = connect_mysql()
	cursor.execute('SELECT 1 FROM postdownvotes WHERE id = % s AND postid = % s', (a, b, ))
	checkdownvote = cursor.fetchone()
	if not checkdownvote:
		return False
	return True

def check_if_voted(a,b):
	if check_upvote(a,b):
		return 1
	elif check_downvote(a,b):
		return 2
	else:
		return 3

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
	passwordhash = generate_password_hash(password)
	cursor.execute('INSERT INTO accounts (id,username,passwordhash,name) VALUES ( % s, % s, % s, % s )', (uid, username, passwordhash, fullname ))
	mysql.connection.commit()
	msg = 'You have successfully registered ! Navigate to log in page to get started!'
	return msg

def handle_login_request():
	username = request.form['username']
	password = request.form['password']
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
	account = cursor.fetchone()
	if account and check_password_hash(account['passwordhash'], password):
		msg = 'Logged in successfully !'
		session['UID'] = account['id']
		session['username'] = account['username']
		currentUser = userInfo(account['username'], account['name'], account['id'])
	else:
		msg = 'Failed to log you in!'
	return msg

def fetch_feed_discover(a):
	requesterId = session['UID']
	postData = load_discover_posts(4, a)
	posts = json_posts(postData,requesterId)
	return posts

def json_posts(a,b):
	requesterId = b
	posts = []
	for post in a:
		posterId = post["posterid"]
		postId = post["postid"]
		ownership = determine_ownership_unauthenticated(posterId)
		commentNumber = count_comments(postId)
		upvotesNumber = count_post_upvotes(postId)
		downvotesNumber = count_post_downvotes(postId)
		hasVoted = check_if_voted(requesterId,postId)
		currentAccount = fetch_name_username(posterId)
		postDate = time_since(post["postdate"])
		posts.append({"content": post["content"], "postdate": postDate, "pid": postId, "authorname": currentAccount["name"], "author": currentAccount["username"], "commentnumber": commentNumber, "upvotesnumber": upvotesNumber, "downvotesnumber": downvotesNumber, "ownership": ownership, "hasvoted": hasVoted})
	return posts

def json_comments(a,b):
	requesterId = b
	jsonData = []
	for comment in a:
		rowid = comment["commenterid"]
		commentId = comment['commentid']
		commentDate = time_since(comment["commentdate"])
		ownership = determine_ownership_unauthenticated(comment['commenterid'])
		replyNumber = count_replies(commentId)
		currentAccount = fetch_name_username(rowid)
		jsonData.append({"content": comment["content"], "postdate": commentDate, "postid": comment["postid"], "author": currentAccount["name"], "tag": currentAccount["username"], "commentid": commentId, "replynumber": replyNumber, "ownership": ownership})
	return json.dumps(jsonData)

def json_replies(a,b):
	requesterId = b
	jsonData = []
	for reply in a:
		replierId = reply["replierid"]
		currentAccount = fetch_name_username(replierId)
		replyDate = time_since(reply["replydate"])
		jsonData.append({"content": reply["content"], "replydate": replyDate, "commentid": reply["commentid"], "author": currentAccount["name"], "tag": currentAccount["username"], "replyid": reply['replyid']})
	return json.dumps(jsonData)

def load_discover_posts(a,b):
	cursor = connect_mysql()
	cursor.execute('SELECT content, postdate, postid, posterid FROM posts WHERE postid NOT IN % s ORDER BY postdate DESC LIMIT % s', (b, a))
	return cursor.fetchall()

def load_comments(a):
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM postcomments WHERE postid = % s ORDER BY commentdate DESC', (a, ))
	return cursor.fetchall()

def load_replies(a):
	cursor = connect_mysql()
	cursor.execute('SELECT * FROM commentreplies WHERE commentid = % s ORDER BY replydate DESC', (a, ))
	return cursor.fetchall()

def determine_ownership_unauthenticated(a):
	if a == session['UID']:
		return 2
	else:
		return 1

def count_post_upvotes(a):
	cursor = connect_mysql()
	cursor.execute('SELECT 1 FROM postupvotes WHERE postid = % s', (a, ))
	return cursor.rowcount

def count_post_downvotes(a):
	cursor = connect_mysql()
	cursor.execute('SELECT 1 FROM postdownvotes WHERE postid = % s', (a, ))
	return cursor.rowcount

def fetch_name_username(a):
	cursor = connect_mysql()
	cursor.execute('SELECT username,name FROM accounts WHERE id = % s', (a, ))
	return cursor.fetchone()

def format_basic_user_data(a):
	rawUserData = fetch_name_username(a)
	return {"username": rawUserData['username'].lower(), "fullname": rawUserData['name']}

def fetch_feed_following(a):
	requesterId = session['UID']
	postData = load_following_posts(4, a)
	posts = json_posts(postData,requesterId)
	return posts

def load_following_posts(a,b):
	uid = session['UID']
	cursor = connect_mysql()
	loadposts = cursor.execute('SELECT content, postdate, postid, posterid FROM posts WHERE posterid IN (SELECT following FROM followers WHERE follower = % s) AND postid NOT IN % s ORDER BY postdate DESC LIMIT % s', (uid, b, a, ))
	return cursor.fetchall()

def count_comments(a):
	cursor = connect_mysql()
	cursor.execute('SELECT 1 FROM postcomments WHERE postid = % s', (a, ))
	return cursor.rowcount

def count_replies(a):
	cursor = connect_mysql()
	cursor.execute('SELECT commentid FROM commentreplies WHERE commentid = % s', (a, ))
	return cursor.rowcount

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
	loadposts = cursor.execute('SELECT content, postdate, postid, posterid FROM posts WHERE posterid = % s ORDER BY postdate DESC' % (a, ))
	postdata = cursor.fetchall()
	data = []
	for post in postdata:
		posterid = post["posterid"]
		cursor.execute('SELECT username,name FROM accounts WHERE id = % s', (posterid, ))
		currentAccount = cursor.fetchone()
		postdate = time_since(post["postdate"])
		data.append({"content": post["content"], "postdate": postdate, "pid": post["postid"], "authorname": currentAccount["name"], "author": currentAccount["username"]})
	posts = data
	return posts

def time_since(a):
	f = '%Y-%m-%d %H:%M:%S'
	ts = str(a)
	oldTime = datetime.datetime.strptime(ts, f)
	now = datetime.datetime.now()
	dateMath = now - oldTime
	daysSince = dateMath.days
	hoursSince = dateMath.seconds / 3600
	minutesSince = dateMath.seconds / 60
	monthsSince = daysSince / 30
	years_since = monthsSince / 12
	if minutesSince < 1:
		dateOutput = str(math.trunc(dateMath.seconds)) + 's'
	elif hoursSince < 1:
		dateOutput = str(math.trunc(minutesSince)) + 'm'
	elif daysSince < 1:
		dateOutput = str(math.trunc(hoursSince)) + 'h'
	elif monthsSince < 1:
		dateOutput = str(math.trunc(daysSince)) + 'd'
	elif years_since < 1:
		dateOutput = str(math.trunc(monthsSince)) + 'mo'
	else:
		dateOutput = str(math.trunc(years_since)) + 'y'
	return dateOutput

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True, log_output=True)
