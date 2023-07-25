from model import CombatEntry

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import (
    get_combat_entries,
    create_combat_entry,
)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.get("/api/combatlog/")
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