from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Annotated
from fastapi import FastAPI, Form
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://zothacks:zotzotzot@petermeeter.l3g6u1b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

db = client.PeterMeeter
UserCollection = db.Users

# @app.get('/login')
# def getLogin():


@app.post('/login')
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    """
    Given a username and password from form data, add them to the database.
    """

    UserCollection.insert_one({ "username": username , "password": password })

    ...