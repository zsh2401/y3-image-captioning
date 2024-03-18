# 定义ORM模型
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from server.opts import connection_url

Base = declarative_base()

engine = create_engine(connection_url)

# 创建Session类
Session = sessionmaker(bind=engine)

# 使用Session创建实例来操作数据库
session = Session()