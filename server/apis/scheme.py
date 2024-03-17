from flask import jsonify


def failed(code, msg):
    return build_json_resp(None, code, msg)


def success(data, message=None):
    return build_json_resp(data, 0, message)


def build_json_resp(data=None, code=0, message=None):
    return jsonify({
        "data": data,
        "code": code,
        "message": message
    })
