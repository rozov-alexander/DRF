import requests


response1 = requests.get('http://localhost:8000/api/CustomUser/') 
print(response1.json())
response2 = requests.get('http://localhost:8000/api/CustomUser/', headers={'Accept': 'application/json; version=2.0'})
print(response2.json())
