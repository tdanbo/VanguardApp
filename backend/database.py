from model import CombatEntry
import motor.motor_asyncio

# tobiasdanbo
# E33ts3SKAOl1tR1W

USER = "tobiasdanbo"
PASSWORD = "E33ts3SKAOl1tR1W"
SESSION = "SessionA"
COMBAT_LOG = "CombatLog"

connection_string = (
    f"mongodb+srv://{USER}:{PASSWORD}@vanguardsessions.xbafis6.mongodb.net/"
)

client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client[SESSION]
collection = database[COMBAT_LOG]


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
