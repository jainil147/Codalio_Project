from flask import Flask
from app.routes.upload import upload_bp
from app.routes.query import query_bp

app = Flask(__name__)

# Load configuration
app.config.from_pyfile('config.py')

# Register blueprints
app.register_blueprint(upload_bp, url_prefix='/upload')
app.register_blueprint(query_bp, url_prefix='/query')

@app.route('/')
def home():
    return {"message": "Welcome to the OpenAI Assistant!"}

if __name__ == '__main__':
    app.run(debug=True)
