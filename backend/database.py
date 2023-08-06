from model import CombatEntry
from model import CharacterEntry
from model import ItemEntry
import motor.motor_asyncio
from functions import add_corruption, add_equipment

# tobiasdanbo
# E33ts3SKAOl1tR1W

USER = "tobiasdanbo"
PASSWORD = "E33ts3SKAOl1tR1W"
SESSION = "SessionA"
COMBAT_LOG = "CombatLog"
CHARACTER_LOG = "CharacterLog"
EQUIPMENT = "Equipment"
connection_string = (
    f"mongodb+srv://{USER}:{PASSWORD}@vanguardsessions.xbafis6.mongodb.net/"
)

client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client[SESSION]
combat_log_collection = database[COMBAT_LOG]
character_log_collection = database[CHARACTER_LOG]

database = client["Content"]
content_collection = database[EQUIPMENT]


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
    if await character_log_collection.find_one(
        {"details.name": document["details"]["name"]}
    ):
        print("Character already exists")
        return False
    else:
        added_corruption = add_corruption(document)
        added_equipment = add_equipment(added_corruption)
        result = await character_log_collection.insert_one(added_equipment)
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
    await character_log_collection.replace_one(
        {"details.name": name}, new_character_data
    )
    document = await character_log_collection.find_one({"details.name": name})
    return document


async def get_equipment_entries():
    equipment_entries = []
    cursor = content_collection.find({})
    async for document in cursor:
        equipment_entries.append(ItemEntry(**document))
    return equipment_entries
