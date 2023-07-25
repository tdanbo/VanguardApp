from model import ToDo
import motor.motor_asyncio

# tobiasdanbo
# aXHkTyITkbUoFPNy

USER = "tobiasdanbo"
PASSWORD = "aXHkTyITkbUoFPNy"
connection_string = f"mongodb+srv://{USER}:{PASSWORD}@todolist.trkpluf.mongodb.net/"

client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client.TodoList
collection = database.todo


async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document


async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(ToDo(**document))
    return todos


async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document


async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document


async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True