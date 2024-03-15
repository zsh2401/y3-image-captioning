from flask import send_from_directory
import os
front_end_dist = os.getcwd() +"/front-end/dist"

def init_router(app):
    apis(app)
    spa(app)
    
def apis(app):
    pass

def spa(app):
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_spa(path):
        if path != "" and os.path.exists(front_end_dist + '/' + path):
            return send_from_directory(front_end_dist, path)
        else:
            return send_from_directory(front_end_dist, 'index.html')
    