from flask import Blueprint, request, jsonify
from app.services.openai_integration import query_openai

query_bp = Blueprint('query', __name__)

@query_bp.route('/', methods=['POST'])
def handle_query():
    data = request.get_json()
    
    # Extract query and extracted text from the request
    query = data.get("query")
    extracted_text = data.get("extracted_text")
    
    # Check if both parameters are provided
    if not query or not extracted_text:
        return jsonify({"error": "Both 'query' and 'extracted_text' are required."}), 400
    
    # Call query_openai with both extracted text and query
    try:
        answer = query_openai(extracted_text, query)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500