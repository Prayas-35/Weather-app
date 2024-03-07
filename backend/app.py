from flask import Flask, jsonify
from flask_cors import CORS
from helpers import lookup

app = Flask(__name__)
CORS(app, origins="http://127.0.0.1:5173")

@app.route('/api/data')
def get_data():
    data = {'message': "hello, Flask here", 'success': True}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def hello_world():
    return 'Hello, World!'