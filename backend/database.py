from model import CombatEntry
import motor.motor_asyncio

# tobiasdanbo
# kYlQCbYjWXBPJj8A

USER = "tobiasdanbo"
PASSWORD = "kYlQCbYjWXBPJj8A"
connection_string = f"mongodb+srv://{USER}:{PASSWORD}@combatlog.d9ledam.mongodb.net/"


client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client.CombatLog
collection = database.combatlog

async def get_combat_entries():
    combat_entries = []
    cursor = collection.find({})
    async for document in cursor:
        combat_entries.append(CombatEntry(**document))
    return combat_entries

async def create_combat_entry(log_entry):
    document = log_entry
    result = await collection.insert_one(document)
    return document