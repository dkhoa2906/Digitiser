from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_cors import CORS, cross_origin

from models import db, User

app = Flask(__name__)

app.config['SECRET_KEY'] = 'khoa-minh-ngu'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()



######################## ROUTES ########################


# SIGN UP
@app.route("/signup", methods=["POST"])
def signup():
    fullName = request.json.get("fullName")
    email = request.json.get("email")
    password = request.json.get("password")
    
    isUserExist = User.query.filter_by(email=email).first() is not None

    if isUserExist:
        return jsonify({"error": "User already exists"}), 409
    
    passwordBytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashedPassword = bcrypt.hashpw(passwordBytes, salt)

    newUser = User(fullName=fullName, email=email, password=hashedPassword)
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
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    passwordBytes = password.encode('utf-8')
    hashedPassword = user.password

    if not bcrypt.checkpw(passwordBytes, hashedPassword):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "fullName": user.fullName,
        "email": user.email
    })

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)