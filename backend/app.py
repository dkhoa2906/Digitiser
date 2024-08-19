from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

from models import db, User

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = 'khoa-minh-ngu'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()



######################## ROUTES ########################

# LANDING PAGE TO MAKE SURE IT WORKS
@app.route("/")
def hello_world():
    return "Hello World"

# SIGN UP
@app.route("/signup", methods=["POST"])
def sign_up():
    fullName = request.json.get("fullName")
    email = request.json.get("email")
    password = request.json.get("password").encode("utf-8")
    
    isUserExist = User.query.filter_by(email=email).first() is not None

    if isUserExist:
        return jsonify({"error": "User already exists"}), 409 

    hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt(12))

    newUser = User(
        fullName=fullName,
        email=email,
        password=hashedPassword.decode("utf-8")
    )
    
    db.session.add(newUser)
    db.session.commit() 

    session["user_id"] = newUser.id

    return jsonify({
        "id": newUser.id,
        "fullName": newUser.fullName,
        "email": newUser.email
    })

# LOGIN
@app.route("/login", methods=["POST"])
def log_in():
    email = request.json.get("email")
    password = request.json.get("password").encode("utf-8")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    hashedPassword = user.password.encode("utf-8")
    
    if not bcrypt.checkpw(password, hashedPassword):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "fullName": user.fullName,
        "email": user.email
    })

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)