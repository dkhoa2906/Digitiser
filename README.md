# Digitiser
Final project for CSBU109 subject. A web application that Automated Digitization System for Vietnam Birth Certificates.
## Base URL
[`https://digitiser.up.railway.app](https://digitiser-uit.web.app/`]



# API Documentation

## Base URL

[`https://digitiser.up.railway.app`]

## Authentication

- **JWT Token**: Required for protected routes.
  - **Login**: `/login`
  - **Signup**: `/signup`

## Endpoints

### 1. Landing Page

- **URL**: `/`
- **Method**: [`GET`]
- **Description**: Checks if the server is running.

**Response**:
```json
"Deploy successfully! Chuc mung Minh Ngu yen"
```

### 2. Sign Up
- **URL**: `/signup`
- **Method**: [`POST`]
- **Description**: Registers a new user.

**Request Body**:
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "id": "uuid",
  "fullName": "string",
  "email": "string"
}
```

**Errors**:
- [`409 Conflict`]: User already exists.
- [`400 Bad Request`]: Invalid request data.

### 3. Login
- **URL**: `/login`
- **Method**: [`POST`]
- **Description**: Authenticates a user and returns an access token.

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "email": "string",
  "access_token": "string"
}
```

**Errors**:
- [`401 Unauthorized`]: Invalid credentials.

### 4. Refresh Token
- **URL**: Not a separate endpoint.
- **Method**: Automatically handled.
- **Description**: Refreshes the JWT token if it's about to expire.

**Response**:
```json
{
  "access_token": "string"
}
```

### 5. Logout
- **URL**: `/logout`
- **Method**: [`POST`]
- **Description**: Logs out the user and invalidates the JWT token.

**Response**:
```json
{
  "msg": "logout successful"
}
```

### 6. Birth Certificate Extraction
- **URL**: `/birth_cert`
- **Method**: [`POST`]
- **Description**: Uploads a birth certificate image and extracts information.

**Request Form Data**:
- [`file`]: Image file of the birth certificate.

**Response**:
```json
{
  "gks_so": "string",
  "gks_quyenSo": "string",
  "con_hoVaTen": "string",
  "con_gioiTinh": "string",
  "con_ngaySinh": "string",
  "con_ngaySinhChu": "string",
  "con_noiSinh": "string",
  "con_danToc": "string",
  "con_quocTich": "string",
  "cha_hoVaTen": "string",
  "cha_danToc": "string",
  "cha_quocTich": "string",
  "cha_namSinh": "string",
  "cha_noiThuongTruTamTru": "string",
  "me_hoVaTen": "string",
  "me_danToc": "string",
  "me_quocTich": "string",
  "me_namSinh": "string",
  "me_noiThuongTruTamTru": "string",
  "nks_hoVaTen": "string",
  "nks_quanHe": "string",
  "gks_noiDangKy": "string",
  "gks_ngayDangKy": "string",
  "gks_ghiChu": "string",
  "gks_nguoiThucHien": "string",
  "gks_nguoiKy": "string"
}
```

**Errors**:
- [`400 Bad Request`]: No file part or invalid file.

### 7. Add Birth Certificate to Database
- **URL**: `/db_birth_cert`
- **Method**: [`POST`]
- **Description**: Adds the extracted birth certificate information to the database.

**Request Body**:
```json
{
  "Số": "string",
  "Quyển số": "string",
  "Họ và tên": "string",
  "Giới tính": "string",
  "Ngày, tháng, năm sinh": "string",
  "Ghi bằng chữ": "string",
  "Nơi sinh": "string",
  "Dân tộc": "string",
  "Quốc tịch": "string",
  "Họ và tên cha": "string",
  "Dân tộc cha": "string",
  "Quốc tịch cha": "string",
  "Năm sinh cha": "string",
  "Nơi thường trú/tạm trú cha": "string",
  "Họ và tên mẹ": "string",
  "Dân tộc mẹ": "string",
  "Quốc tịch mẹ": "string",
  "Năm sinh mẹ": "string",
  "Nơi thường trú/tạm trú mẹ": "string",
  "Nơi đăng ký": "string",
  "Ngày, tháng, năm đăng ký": "string",
  "Ghi chú": "string",
  "Người thực hiện": "string",
  "Người ký": "string"
}
```
**Response**:
```json
{
  "message": "Birth certificate added successfully!"
}
```

**Errors**:
- [`401 Unauthorized`]: Missing or invalid JWT token.
- [`400 Bad Request`]: Invalid request data.

## Models

### User
- [`id`]: UUID, primary key, unique
- [`fullName`]: String, 50 characters, not nullable
- [`email`]: String, 150 characters, unique, not nullable
- [`password`]: Text, not nullable

### BirthCertificate
- [`id`]: UUID, primary key, unique
- [`user_id`]: UUID, not nullable
- [`gks_so`]: String, nullable
- [`gks_quyenSo`]: String, nullable
- [`con_hoVaTen`]: String, nullable
- [`con_gioiTinh`]: String, nullable
- [`con_ngaySinh`]: String, nullable
- [`con_ngaySinhChu`]: String, nullable
- [`con_noiSinh`]: String, nullable
- [`con_danToc`]: String, nullable
- [`con_quocTich`]: String, nullable
- [`cha_hoVaTen`]: String, nullable
- [`cha_danToc`]: String, nullable
- [`cha_quocTich`]: String, nullable
- [`cha_namSinh`]: String, nullable
- [`cha_noiThuongTruTamTru`]: String, nullable
- [`me_hoVaTen`]: String, nullable
- [`me_danToc`]: String, nullable
- [`me_quocTich`]: String, nullable
- [`me_namSinh`]: String, nullable
- [`me_noiThuongTruTamTru`]: String, nullable
- [`nks_hoVaTen`]: String, nullable
- [`nks_quanHe`]: String, nullable
- [`gks_noiDangKy`]: String, nullable
- [`gks_ngayDangKy`]: String, nullable
- [`gks_ghiChu`]: String, nullable
- [`gks_nguoiThucHien`]: String, nullable
- [`gks_nguoiKy`]: String, nullable
