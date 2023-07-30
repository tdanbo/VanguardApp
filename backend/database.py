from model import CombatEntry
from model import CharacterEntry
import motor.motor_asyncio
from functions import add_corruption

# tobiasdanbo
# E33ts3SKAOl1tR1W

USER = "tobiasdanbo"
PASSWORD = "E33ts3SKAOl1tR1W"
SESSION = "SessionA"
COMBAT_LOG = "CombatLog"
CHARACTER_LOG = "CharacterLog"
connection_string = (
    f"mongodb+srv://{USER}:{PASSWORD}@vanguardsessions.xbafis6.mongodb.net/"
)

client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client[SESSION]
combat_log_collection = database[COMBAT_LOG]
character_log_collection = database[CHARACTER_LOG]


async def get_combat_entries():
    combat_entries = []
    cursor = combat_log_collection.find({})
    async for document in cursor:
        combat_entries.append(CombatEntry(**document))
    return combat_entries


async def create_combat_entry(log_entry):
    document = log_entry
    result = await combat_log_collection.insert_one(document)
    return document


async def create_character_entry(log_entry):
    document = log_entry
    if await character_log_collection.find_one({"details.name": document["details"]["name"]}):
        print("Character already exists")
        return False
    else:
        updated_document = add_corruption(document)
        result = await character_log_collection.insert_one(updated_document)
        return document


async def get_character_entries():
    entries = []
    cursor = character_log_collection.find({})
    async for document in cursor:
        entries.append(CharacterEntry(**document))
    return entries


async def fetch_one_character(name):
    document = await character_log_collection.find_one({"details.name": name})
    return document

async def update_character(name: str, new_character_data: dict):
    await character_log_collection.replace_one({"details.name": name}, new_character_data)
    document = await character_log_collection.find_one({"details.name": name})
    return document