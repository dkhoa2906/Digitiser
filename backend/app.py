from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from werkzeug.utils import secure_filename
from models import gemini, genai
from db import db, User, BirthCertificate
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager
)
import bcrypt
import json
import tempfile
import os

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
genai.configure(api_key=os.getenv('GENAI_API_KEY'))

migrate = Migrate(app, db)
CORS(app, supports_credentials=True)
db.init_app(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()


######################## ROUTES ########################

# LANDING PAGE TO MAKE SURE IT WORKS
@app.route("/")
def hello_world():
    return "Deploy successfully! Chuc mung Minh Ngu yen"

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

    access_token = create_access_token(identity=user.id)
  
    return jsonify({
        "email": email,
        "access_token": access_token
    })


# REFRESH TOKEN
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token 
                response.data = json.dumps(data)
    except (RuntimeError, KeyError):
        pass
    return response

# LOGOUT
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# BIRTH CERTIFICATE EXTRACTION
@app.route('/birth_cert', methods=['POST'])
# @jwt_required()
def extract_info():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            file.save(tmp_file.name)
            tmp_file_path = tmp_file.name

        try:
            # Upload the file to Gemini
            uploaded_file = genai.upload_file(tmp_file_path, mime_type=file.content_type)

            # Start a chat session and send the file URI
            chat_session = gemini.start_chat(history=[])
            response = chat_session.send_message(uploaded_file.uri)

            # Extract the JSON content
            content = response.candidates[0].content.parts[0].text
            response_data = json.loads(content)

            return jsonify(response_data)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
        finally:
            os.remove(tmp_file_path)

    return jsonify({"error": "Invalid file"}), 400




    data = request.json

    # Create a new BirthCertificate instance with individual fields
    new_certificate = BirthCertificate(
        user_id=get_jwt_identity(),
        gks_so=data.get("gks_so"),
        gks_quyenSo=data.get("gks_quyenSo"),
        mau_so=data.get("mau_so"),
        con_hoVaTen=data.get("con_hoVaTen"),
        con_gioiTinh=data.get("con_gioiTinh"),
        con_ngaySinh=datetime.strptime(data.get("con_ngaySinh"), "%Y-%m-%d") if data.get("con_ngaySinh") else None,
        con_ngaySinhChu=data.get("con_ngaySinhChu"),
        con_noiSinh=data.get("con_noiSinh"),
        con_danToc=data.get("con_danToc"),
        con_quocTich=data.get("con_quocTich"),
        cha_hoVaTen=data.get("cha_hoVaTen"),
        cha_danToc=data.get("cha_danToc"),
        cha_quocTich=data.get("cha_quocTich"),
        cha_namSinh=datetime.strptime(data.get("cha_namSinh"), "%Y-%m-%d") if data.get("cha_namSinh") else None,
        cha_noiThuongTru=data.get("cha_noiThuongTru"),
        me_hoVaTen=data.get("me_hoVaTen"),
        me_danToc=data.get("me_danToc"),
        me_quocTich=data.get("me_quocTich"),
        me_namSinh=datetime.strptime(data.get("me_namSinh"), "%Y-%m-%d") if data.get("me_namSinh") else None,
        me_noiThuongTru=data.get("me_noiThuongTru"),
        nks_hoVaTen=data.get("nks_hoVaTen"),
        nks_quanHe=data.get("nks_quanHe"),
        gks_noiDangKy=data.get("gks_noiDangKy"),
        gks_ngayDangKy=datetime.strptime(data.get("gks_ngayDangKy"), "%Y-%m-%d") if data.get("gks_ngayDangKy") else None,
        gks_ghiChu=data.get("gks_ghiChu"),
        gks_nguoiThucHien=data.get("gks_nguoiThucHien"),
        gks_nguoiKy=data.get("gks_nguoiKy")
    )

    db.session.add(new_certificate)
    db.session.commit()

    return jsonify({"msg": "Birth certificate added successfully!"})


@app.route('/db_birth_cert', methods=['POST'])
@jwt_required()
def add_birth_certificate_to_database():
    data = request.json

    birthCertificate = BirthCertificate(
        user_id=get_jwt_identity(),

        gks_so=data.get('Số'),
        gks_quyenSo=data.get('Quyển số'),
        
        con_hoVaTen=data.get('Họ và tên'),
        con_gioiTinh=data.get('Giới tính'),
        con_ngaySinh=data.get('Ngày, tháng, năm sinh'),
        con_ngaySinhChu=data.get('Ghi bằng chữ'),
        con_noiSinh=data.get('Nơi sinh'),
        con_danToc=data.get('Dân tộc'),
        con_quocTich=data.get('Quốc tịch'),

        cha_hoVaTen=data.get('Họ và tên cha'),
        cha_danToc=data.get('Dân tộc cha'),
        cha_quocTich=data.get('Quốc tịch cha'),
        cha_namSinh=data.get('Năm sinh cha'),
        cha_noiThuongTruTamTru=data.get('Nơi thường trú/tạm trú cha'),
        
        me_hoVaTen=data.get('Họ và tên mẹ'),
        me_danToc=data.get('Dân tộc mẹ'),
        me_quocTich=data.get('Quốc tịch mẹ'),
        me_namSinh=data.get('Năm sinh mẹ'),
        me_noiThuongTruTamTru=data.get('Nơi thường trú/tạm trú mẹ'),
        
        gks_noiDangKy=data.get('Nơi đăng ký'),
        gks_ngayDangKy=data.get('Ngày, tháng, năm đăng ký'),
        gks_ghiChu=data.get('Ghi chú'),

        gks_nguoiThucHien=data.get('Người thực hiện'),
        gks_nguoiKy=data.get('Người ký')
    )

    db.session.add(birthCertificate)
    db.session.commit()

    return jsonify({"message": "Birth certificate added successfully!"}), 201


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)