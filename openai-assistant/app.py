
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
import mysql.connector
from dotenv import load_dotenv
import os
import secrets
from flask import Flask, request, jsonify, session, redirect, url_for


# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


# JWT Config
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", secrets.token_hex(32))
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Database Config
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
)

cursor = db.cursor(dictionary=True)  # This returns rows as dictionaries

# Function to load and execute schema.sql file
def execute_schema():
    with open(r'database/schema.sql', 'r') as file:
        schema = file.read()
    
    # Split the SQL commands by semicolons and execute each one
    sql_commands = schema.split(';')
    
    for command in sql_commands:
        command = command.strip()
        if command:
            try:
                cursor.execute(command)  # Execute each SQL statement
                db.commit()
            except mysql.connector.Error as err:
                print(f"Error executing command: {command}")
                print(f"Error: {err}")
                db.rollback()

# Call the function to execute schema when the app starts
execute_schema()

# User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        # Insert user details into the users table
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, hashed_password),
        )
        db.commit()
        return jsonify({
            "message": "Registration successful",
            "user": {
                "name": name,
                "email": email
            },
            "token": os.getenv("JWT_SECRET_KEY")  # If you're sending a token
        }), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400


# User Login
@app.route('/api/login', methods=['POST'])
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Fetch user from the database by email
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()  # Fetch a single user as a dictionary

    # Validate user credentials
    if user and bcrypt.check_password_hash(user["password"], password):
        # Generate JWT token
        access_token = create_access_token(identity=user["id"])

        # Return user details along with the token
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            },
            "token": access_token  # Provide the actual JWT token here
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    
    
@app.route('/api/logout')
def logout():
    session.clear()  # Clear all session data
    return redirect(url_for('signup')) 



if __name__ == "__main__":
    app.run(debug=True)
