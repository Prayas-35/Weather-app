import datetime as dt
import requests
import pycountry

# url = "http://api.openweathermap.org/data/2.5/weather?APPID=544552592067b3cd93f36d645c9380cb"
# CITY = "new york"
# url = url + "&q=" + CITY

# response = requests.get(url).json()
# print(response)
def code_to_country(code):
    try:
        country = pycountry.countries.get(alpha_2=code.upper())
        if country:
            return country.name
        else:
            return "Not found"
    except Exception as e:
        return str(e)

def kelvin_to_celcius(temp):
    celcius = temp - 273.15
    return celcius

def lookup(city):
    url = "http://api.openweathermap.org/data/2.5/weather?APPID=544552592067b3cd93f36d645c9380cb"
    url = url + "&q=" + city

    response = requests.get(url).json()
    
    if response['cod'] == 200:
        return {
            'country': code_to_country(response['sys']['country']),
            'city': city.capitalize(),
            'humidity': response['main']['humidity'],
            'temperature': round(kelvin_to_celcius(response['main']['temp'])),
            'feels_like': round(kelvin_to_celcius(response['main']['feels_like'])),
            'description': response['weather'][0]['description'],
            'wind_speed': response['wind']['speed'],
        }
    
    else:
        return None

# print(lookup(input("City: ")))