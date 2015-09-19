from flask import Flask, request, url_for, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('hello.html', name="name")

@app.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@app.route('/signUp', methods=['POST'])
def signUp():
	_name = request.form['inputName']
	_email = request.form['inputEmail']
	_password = request.form['inputPassword']

	new_user = _name + ' ' + _email + ' ' + _password

	print 'signing up'

	if _name and _email and _password:
		result = firebase.post('/users', new_user, {'print': 'pretty'}, {'X_FANCY_HEADER' : 'VERY FANCY'})
		print 'hi'#return json.dumps({'html':'<span>All fields good !!</span>'})

if __name__ == "__main__":
    app.run()
