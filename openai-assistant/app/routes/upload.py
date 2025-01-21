from flask import Blueprint, request, jsonify
from app.services.file_processing import process_file

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file provided"}), 400
    return process_file(file)
