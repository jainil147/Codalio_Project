from PyPDF2 import PdfReader

def process_file(file):
    if file.content_type == "application/pdf":
        reader = PdfReader(file)
        text = "".join([page.extract_text() for page in reader.pages])
    elif file.content_type == "text/plain":
        text = file.read().decode('utf-8')
    else:
        return {"error": "Unsupported file type"}, 400
    return {"message": "File processed", "content_preview": text[:500]}
