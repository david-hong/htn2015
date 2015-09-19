from flask import Flask, request, url_for, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('hello.html', name="name")

@app.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == "__main__":
    app.run()
