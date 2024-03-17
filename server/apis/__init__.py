from flask import jsonify, request
from server.apis.auth import register_auth_apis
from server.apis.infer import register_infer_apis


def init_apis(app):
    register_auth_apis(app)
    register_infer_apis(app)
