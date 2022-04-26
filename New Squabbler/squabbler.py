from flask import Flask, render_template, request, flash, redirect, session, url_for, escape, make_response
from flask_socketio import SocketIO, join_room, leave_room, emit
import random
import string

app = Flask(__name__)
socketio = SocketIO(app)

import secrets
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key

@app.route("/", methods = ['GET','POST'])
def landing():
	if 'UID' in session:
		return redirect(url_for('home'))
	return render_template('landing.html')

@app.route("/register")
def register():
	if 'UID' in session:
		return redirect(url_for('home'))
	return render_template('createuser.html')

@app.route("/login")
def login():
	if 'UID' in session:
		return redirect(url_for('home'))
	return render_template('login.html')

@app.route("/home")
def home():
	if 'UID' not in session:
		return redirect(url_for('landing'))
	return render_template('home.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)