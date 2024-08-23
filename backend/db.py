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

class BirthCertificate(db.Model):
    __tablename__ = "birth_certificates"
    id = db.Column(postgresql.UUID(as_uuid=True), primary_key=True, default=get_uuid, unique=True)
    user_id = db.Column(postgresql.UUID(as_uuid=True), nullable=False)

    gks_so = db.Column(db.String(50), nullable=True)
    gks_quyenSo = db.Column(db.String(50), nullable=True)

    con_hoVaTen = db.Column(db.String(100), nullable=True)
    con_gioiTinh = db.Column(db.String(10), nullable=True)
    con_ngaySinh = db.Column(db.String(50), nullable=True)
    con_ngaySinhChu = db.Column(db.String(200), nullable=True)
    con_noiSinh = db.Column(db.String(100), nullable=True)
    con_danToc = db.Column(db.String(50), nullable=True)
    con_quocTich = db.Column(db.String(50), nullable=True)

    cha_hoVaTen = db.Column(db.String(100), nullable=True)
    cha_danToc = db.Column(db.String(50), nullable=True)
    cha_quocTich = db.Column(db.String(50), nullable=True)
    cha_namSinh = db.Column(db.String(50), nullable=True)
    cha_noiThuongTruTamTru = db.Column(db.String(200), nullable=True)

    me_hoVaTen = db.Column(db.String(100), nullable=True)
    me_danToc = db.Column(db.String(50), nullable=True)
    me_quocTich = db.Column(db.String(50), nullable=True)
    me_namSinh = db.Column(db.String(50), nullable=True)
    me_noiThuongTruTamTru = db.Column(db.String(200), nullable=True)

    nks_hoVaTen = db.Column(db.String(100), nullable=True)
    nks_quanHe = db.Column(db.String(50), nullable=True)

    gks_noiDangKy = db.Column(db.String(200), nullable=True)
    gks_ngayDangKy = db.Column(db.String(100), nullable=True)
    gks_ghiChu = db.Column(db.String(255), nullable=True)

    gks_nguoiThucHien = db.Column(db.String(100), nullable=True)
    gks_nguoiKy = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return (
            f'<BirthCertificate(id={self.id}, '
            f'gks_so={self.gks_so!r}, '
            f'con_hoVaTen={self.con_hoVaTen!r}, '
            f'cha_hoVaTen={self.cha_hoVaTen!r}, '
            f'me_hoVaTen={self.me_hoVaTen!r})>'
        )