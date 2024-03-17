import uuid

from flask import jsonify, request

from server.apis.scheme import failed, success
from server.db.User import User
from server.db import get_session
import hashlib

access_token_map = {}


def __salty_password(plain_password):
    salt = "How can a man die better?"
    salty_plain_text = plain_password + salt
    # 创建sha256对象
    sha256_hash = hashlib.sha256()

    # 更新hash对象
    sha256_hash.update(salty_plain_text.encode('utf-8'))

    # 获取16进制格式的哈希值
    return sha256_hash.hexdigest()


def __allocate_access_token_for(userId):
    accessToken = uuid.uuid4().hex
    access_token_map[accessToken] = userId
    return accessToken


def get_user_from_access_token(access_token):
    if access_token in access_token:
        return access_token_map[access_token]
    else:
        raise "Invalid authentication state"


def register_auth_apis(app):
    @app.route('/api/login', methods=['POST'])
    def login():
        json_body = request.get_json()
        username = json_body['username']
        password = json_body['password']

        session = get_session()
        user = session.query(User).filter_by(username=username).first()
        if user is not None:
            if user.password != __salty_password(password):
                return failed(403, "Invalid password")
        else:
            return failed(404, "Invalid username or password")
        session.close()

        return success({
            "username": user.username,
            "id": user.id,
            "accessToken": __allocate_access_token_for(user.id)
        })

    @app.route('/api/alive', methods=['GET'])
    def alive():
        token = request.headers["X-Access-Token"]
        try:
            get_user_from_access_token(token)
            return success(True)
        except:
            return success(False)

    @app.route('/api/register', methods=['POST'])
    def register():
        json_body = request.get_json()
        username = json_body['username']
        password = __salty_password(json_body['password'])

        session = get_session()
        user = session.query(User).filter_by(username=username).first()
        if user is not None:
            return failed(403, "Username already exists")

        new_user = User(username=username, password=password)
        session = get_session()
        session.add(new_user)
        session.commit()
        id = new_user.id
        session.close()

        return success({
            "userid": new_user.id,
            "accessToken": __allocate_access_token_for(id)
        })
