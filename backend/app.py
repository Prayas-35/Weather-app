from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers import lookup



app = Flask(__name__)
CORS(app, origins="*")

@app.route('/api/data')
def get_data():
    city = request.args.get('city', default='London', type=str)
    weather_data = lookup(city)
    return jsonify(weather_data)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

@app.route('/api/weather/<city>')
def get_weather(city):
    data = lookup(city)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'City not found'})

if __name__ == '__main__':
    app.run(debug=True)
