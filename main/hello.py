from flask import Flask, request, url_for, render_template, jsonify
from firebase import firebase
app = Flask(__name__)

firebase = firebase.FirebaseApplication('https://carpal-tunnel.firebaseio.com/users/', None)

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

@app.route('/leapRecord')
def leapRecord():
    return render_template('leapRecord.html')

@app.route('/test')
def testCTS():
    return render_template('test.html')

@app.route('/data')
def data():
	return render_template('data.html')

@app.route('/notification', methods=['POST'])
def checkStatus():

    return jsonify(result={"user": request.form['user'],
                            "notification": request.form['notification'],
                            "timeStamp": int(round(time.time() * 1000))})


if __name__ == "__main__":
    app.run()
