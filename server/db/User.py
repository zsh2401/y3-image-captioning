from sqlalchemy import  Column, Integer, String

from server.db.conn import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True)
    username = Column(String)
    password = Column(String)