from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers import lookup

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/api/<city>', methods=['POST'])
def get_weather(city):
    data = lookup(city)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'City not found'})

if __name__ == '__main__':
    app.run(debug=True)
