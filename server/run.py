from flask import Flask, jsonify
from server.router import init_router

def run_server():
    app = Flask(__name__)
    init_router(app)
    app.run(debug=True,port=9008)