import json
from flask import render_template, Flask, request, make_response, redirect


APP = Flask(__name__, static_url_path='')

@APP.route('/chat')
def chat():
    return render_template('index.html')

@APP.route("/post_new_message", methods=["POST"])
def post_new_message():
    username = request.cookies.get('username')
    colour = request.cookies.get('colour')

    if "colour"  in request.form:
        colour = request.form["colour"]

    form_inputs = dict(request.form)
    form_inputs["user"] = username
    form_inputs["colour"] = colour
    with open('messages.json', 'r+') as f:
        messages = json.load(f)
        messages.append(form_inputs)
        f.seek(0)
        json.dump(messages, f)
        f.truncate()
    return json.dumps(messages)

@APP.route("/get_all_messages")
def get_message():
    with open('messages.json', 'r') as(f):
        messages = json.load(f)
    return json.dumps(messages)

@APP.route('/', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form["username"]
        colour = request.form["colour"]

        resp = make_response(redirect('/chat', code=302))
        resp.set_cookie('username', username)
        resp.set_cookie('colour', colour)
        return resp
    return render_template('login.html')

if __name__ == '__main__':
    APP.run()

