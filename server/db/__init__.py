from sqlalchemy import create_engine

import server.db.User
from server.db.conn import Base, Session


def get_session():
    return Session()


def run_on_session(func):
    session = None
    try:
        session = get_session()
        func()
    except Exception as e:
        raise e
    finally:
        if session is not None:
            session.close()
