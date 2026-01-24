from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running!"}), 200

@app.route('/api/demo', methods=['GET'])
def get_demo_data():
    return jsonify({
        "message": "Hello from Flask!",
        "features": ["React Frontend", "Flask Backend", "CORS Enabled", "GitHub Integrated"]
    }), 200

@app.route('/api/login', methods=['POST'])
def login():
    # Simple mock login for demonstration
    return jsonify({"status": "success", "message": "User logged in successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
