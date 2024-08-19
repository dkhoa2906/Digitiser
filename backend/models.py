from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import sqlalchemy.dialects.postgresql as postgresql

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(postgresql.UUID(as_uuid=True), primary_key=True, default=get_uuid, unique=True)
    fullName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)