from flask import Flask, request, url_for, render_template, jsonify, request
from firebase import firebase

import time

firebase = firebase.FirebaseApplication('https://carpal-tunnel.firebaseio.com', None)

app = Flask(__name__)
app.debug = True

@app.route("/")
def hello():
    return render_template('hello.html')

@app.route("/main")
def main():
    return render_template('hello.html')

@app.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/notification', methods=['POST'])
def checkStatus():

	result = firebase.get("/users/" + request.form["user"], None)

	result["notification"].append({"id": request.form['notification'], "timeStamp": int(round(time.time() * 1000)) })
	result["handValues"] = request.form["handValues"]

	firebase.put("/users", request.form["user"], result)
	
	return jsonify(result)

if __name__ == "__main__":
    app.run()
