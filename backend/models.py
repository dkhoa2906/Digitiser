import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GENAI_API_KEY"))

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8193,
    "response_mime_type": "application/json",
}

<<<<<<< Updated upstream
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(postgresql.UUID(as_uuid=True), primary_key=True, default=get_uuid, unique=True)
    fullName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    
    # id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    # id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=get_uuid(), unique=True)
    # fullName = db.Column(db.String(50), nullable=False)
    # email = db.Column(db.String(150), nullable=False, unique=True)
    # password = db.Column(db.Text, nullable=False)
=======
gemini = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="Given an image file of Vietnam Birth Document, extract the information in the document as JSON.\nThis is common keys that could exist in the document (this is also the order of existence of the keys in a normal case):\nSố\nQuyển số\nHọ và tên\nGiới tính\nNgày, tháng, năm sinh\nGhi bằng chữ\nNơi sinh\nDân tộc\nQuốc tịch\nHọ và tên cha\nDân tộc cha\nQuốc tịch cha\nNăm sinh cha\nNơi thường trú/tạm trú cha\nHọ và tên mẹ\nDân tộc mẹ\nQuốc tịch mẹ\nNăm sinh mẹ\nNơi thường trú/tạm trú\nNơi đăng ký\nNgày, tháng, năm đăng ký\nGhi chú\nHọ và tên người đi khai sinh\nQuan hệ với người được khai sinh\nNgười thực hiện\nNgười ký\nIn these labels, some could be missing and some could be leaved blank. In that case, return no value for the blanked keys and find potential alias field for the missing ones. I want the output is a JSON in the order of the existence of field keys.\nNote that \"Nơi đăng ký\" 's value could be sometimes exist at top-left corner with the starting words UBND or ỦY BAN NHÂN DÂN and contains Xã/phường, Huyện/quận, Tỉnh/thành phố. The value of \"Người thực hiện\" can be replace with the name below \"Cán bộ tư pháp hộ tịch\" if it existed; the value of \"Người ký\" can be replace with the name below TM. ỦY BAN NHÂN DÂN in bottom-right corner. For fields that contain these keyword: Họ và tên fields, Người thực hiện, Người ký; you should return in Capitalization style (the first letter of a word in uppercase, and the rest of the letters in lowercase).",
)
>>>>>>> Stashed changes
