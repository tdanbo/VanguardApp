from pydantic import BaseModel


class CombatEntry(BaseModel):
    character: str
    result: int
    active: str
    type: str
    details: str


class CharacterEntry(BaseModel):
    details: dict = {"name": "", "xp": 0, "unspent": 0, "movement": 0}
    toughness: dict = {"damage": 0, "max": 0, "pain": 0}
    stats: dict = {
        "cunning": 0,
        "discreet": 0,
        "persuasive": 0,
        "quick": 0,
        "resolute": 0,
        "strong": 0,
        "vigilant": 0,
        "accurate": 0,
    }
    corruption: dict = {}
    abilities: list = []
    inventory: list = []
    equipment: list = []


class ItemEntry(BaseModel):
    roll: list
    quality: list
    equip: list
    type: str
    cost: str
    name: str
    category: str
