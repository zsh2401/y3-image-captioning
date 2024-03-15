from flask import Flask, jsonify

from server.router import init_router

def run_server():
    app = Flask(__name__,static_url_path="",static_folder='front-end/dist')
    init_router(app)
    app.run(debug=True)