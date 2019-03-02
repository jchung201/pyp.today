import os

from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = os.environ.get('DATABASE_URL', 'localhost:5432')
db_name = os.environ.get('DATABASE_NAME', 'pyp-today')
db_user = os.environ.get('DATABASE_USER', 'postgres')
db_password = os.environ.get('DATABASE_PASSWORD', 'hello123')
engine = create_engine(
    f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by