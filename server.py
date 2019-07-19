from flask import render_template, Flask,  request, make_response,redirect
import json
messages = []

app = Flask(__name__,static_url_path='')

@app.route('/chat')
def hello_world(): 
	return render_template('index.html')

@app.route('/cows')
def cows():
	return render_template('cows.html')

@app.route("/post_new_message", methods = ["POST"])
def post_new_message():
	username = request.cookies.get('username')
	colour = request.cookies.get('colour')

	if "colour"  in request.form:
		colour = request.form["colour"]

	form_inputs = dict(request.form)
	form_inputs["user"] = username
	form_inputs["colour"] = colour
	messages.append(form_inputs)
	return json.dumps(messages)

@app.route("/get_all_messages")
def get_message():
	return json.dumps(messages)



@app.route('/',methods=["GET",  "POST"])
def login():
	if request.method == 'POST':
		username =  request.form["username"]
		colour  =  request.form["colour"]
		resp = make_response(redirect('/chat', code=302))
		resp.set_cookie('username', username)
		resp.set_cookie('colour',colour)
		return resp
	return render_template('login.html')



if __name__ == '__main__':
	app.run()

