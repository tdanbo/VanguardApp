from model import CombatEntry, CharacterEntry

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import (
    get_combat_entries,
    get_character_entries,
    create_combat_entry,
    create_character_entry,
    fetch_one_character,
    update_character,
    get_equipment_entries,
)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.get("/api/combatlog")
async def fetch_entries():
    response = await get_combat_entries()
    return response


@app.post("/api/combatlog", response_model=CombatEntry)
async def post_entry(log_entry: CombatEntry):
    response = await create_combat_entry(
        log_entry.model_dump()
    )  # KEEP AN EYE ON THIS AS MODEL_DUMP_JSON IS TWEAKED
    if response:
        return response
    raise HTTPException(404, f"Something went wrong")


@app.get("/api/characterlog/{name}", response_model=CharacterEntry)
async def get_character_by_name(name):
    response = await fetch_one_character(name)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {name}")


@app.get("/api/characterlog")
async def fetch_entries():
    response = await get_character_entries()
    return response


@app.post("/api/characterlog", response_model=CharacterEntry)
async def post_entry(log_entry: CharacterEntry):
    response = await create_character_entry(
        log_entry.model_dump()
    )  # KEEP AN EYE ON THIS AS MODEL_DUMP_JSON IS TWEAKED
    if response:
        return response
    raise HTTPException(404, f"Something went wrong")


@app.put("/api/characterlog/{name}", response_model=CharacterEntry)
async def put_character_log(name: str, updated_character: CharacterEntry):
    response = await update_character(name, updated_character.model_dump())
    if response:
        return response
    raise HTTPException(404, f"There is no character with the name {name}")


@app.get("/api/equipment")
async def fetch_equipment_entries():
    response = await get_equipment_entries()
    return response
