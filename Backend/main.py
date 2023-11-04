from typing import Union, Annotated
from fastapi import FastAPI, Form
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi.staticfiles import StaticFiles

uri = "mongodb+srv://zothacks:zotzotzot@petermeeter.l3g6u1b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.PeterMeeter
bookingCollection = db.Bookings
locCollection = db.Locations
UserCollection = db.Users

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = FastAPI()

@app.get('/hello')
def getHello():
    return ['a', 'b', 'c']

@app.post('/login')
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    """
    Given a username and password from form data, add them to the database.
    """

    UserCollection.insert_one({ "username": username , "password": password })  


    
@app.get('/locations')
async def getLocationInfo():
    locationList = []
    for location in locCollection.find():
        locationList.append({ "name": location['name'], "rooms": location['rooms']})
    return locationList


@app.get('/rooms')
async def getRooms(start_time: Annotated[float, Form()], end_time: Annotated[float, Form()]):
    """
    Example time range: 10/1/2-12:00
    Given a time range, returns a list of unbooked rooms in that time frame.
    """
    
    bookedRooms = list()
    availableRooms = list()
    
    
    for booking in bookingCollection.find():
        if time_in_range(booking['time_start'], booking['time_end'], start_time) \
            or time_in_range(booking['time_start'], booking['time_end'], end_time):
            bookedRooms.append((booking['locationId'], booking['room']))
   
    for location in locCollection.find():
        roomDict = dict()
        roomDict[location['name']] = []
        for room in location['rooms']:
            if (location['name'], room) not in bookedRooms:
                roomDict[location['name']].append(room)
        if len(roomDict[location['name']]) != 0:
            availableRooms.append(roomDict)
    return {"locations": availableRooms}

def time_in_range(start, end, x):
    """Return true if x is in the range [start, end]"""
    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end
  
@app.post('/reserve')
async def reserveRoom(username: Annotated[str, Form()], location_name: Annotated[str, Form()], room: Annotated[str, Form()],
                      start_time:Annotated[float, Form()], end_time:Annotated[float, Form()]):
    """
    Given a username, location name, start time, and end time, add the user's reservation to the Bookings collection.
    """
    bookingCollection.insert_one({'locationId': location_name, 
                                  'room': room,
                                  'time_start':start_time, 
                                  'time_end':end_time, 
                                  'username':username})
    

@app.get('/reservations/{username}')
async def reservations(username):

    """
    Given a username, get all of the reservations they've made (from the Bookings collection)
    """

    userInfo = list()

    reservations = bookingCollection.find({'username': username})
    
    for reservation in reservations:
        start_time = reservation['time_start']  # Replace 'start_time' with the actual field name
        end_time = reservation['time_end']      # Replace 'end_time' with the actual field name
        location = reservation['locationId']
        room = reservation['room']
        userInfo.append({'time_start': start_time, 'time_end': end_time, 'locationId' : location, 'room': room})

    return {"reservations": userInfo}



app.mount("/static", StaticFiles(directory="../Frontend"))

