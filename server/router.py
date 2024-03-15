from flask import send_from_directory
import os

from server.apis import init_apis
front_end_dist = os.getcwd() +"/front-end/dist"

def init_router(app):
    init_apis(app)
    spa(app)


def spa(app):
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_spa(path):
        if path != "" and os.path.exists(front_end_dist + '/' + path):
            return send_from_directory(front_end_dist, path)
        else:
            return send_from_directory(front_end_dist, 'index.html')
    