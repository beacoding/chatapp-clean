from flask import render_template
from flask import Flask
from flask import request
import json
messages = []

app = Flask(__name__,static_url_path='')

@app.route('/')
def hello_world():
	return render_template('index.html')

@app.route('/cows')
def cows():
	return render_template('cows.html')

@app.route('/random_string')
def random_string():
	return "hello !"

@app.route("/post_new_message", methods = ["POST"])
def post_new_message():
	print (request.form)
	messages.append(request.form)
	return json.dumps(messages)

@app.route("/get_all_messages")
def get_message():
	return json.dumps(messages)


if __name__ == '__main__':
	app.run()

