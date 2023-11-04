from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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

@app.post('/login')
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    """
    Given a username and password from form data, add them to the database.
    """

    UserCollection.insert_one({ "username": username , "password": password })

    ...
=======

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/username/{item_id}")
def get_users(item_id: str):
    return {"item_id": item_id, "q": userList[item_id].email}

@app.post("/test/{email}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get('/rooms/')
def getRooms(start_time:int, end_time:int):
    """
    Example time range: 10/1/2-12:00
    Given a time range, returns a list of unbooked rooms in that time frame.
    """
    
    bookedRooms = list()
    availableRooms = list()
    for booking in bookingCollection.find():
        if time_in_range(booking['time_start'], booking['time_ending'], start_time) \
            or time_in_range(booking['time_start'], booking['time_ending'], end_time):
            bookedRooms.append(booking['locationId'])
    
    for location in locCollection.find():
        if location['name'] not in bookedRooms:
            availableRooms.append(location['name'])

    return {"locations": availableRooms}

def time_in_range(start: datetime.time, end: datetime.time, x):
    """Return true if x is in the range [start, end]"""
    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end
  
