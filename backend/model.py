from pydantic import BaseModel


class CombatEntry(BaseModel):
    character: str
    result: int
    active: str
    type: str
    details: str


class CharacterEntry(BaseModel):
    details: dict = {"name": "", "xp": 0, "unspent": 0, "movement": 0}
    toughness: dict = {
        "damage": {"value": 0, "mod": 0},
        "max": {"value": 0, "mod": 0},
        "pain": {"value": 0, "mod": 0},
    }
    stats: dict = {
        "cunning": {"value": 0, "mod": 0},
        "discreet": {"value": 0, "mod": 0},
        "persuasive": {"value": 0, "mod": 0},
        "quick": {"value": 0, "mod": 0},
        "resolute": {"value": 0, "mod": 0},
        "strong": {"value": 0, "mod": 0},
        "vigilant": {"value": 0, "mod": 0},
        "accurate": {"value": 0, "mod": 0},
    }
    actives: dict = {
        "attack": {"stat": "accurate", "mod": 0},
        "defense": {"stat": "quick", "mod": 0},
        "casting": {"stat": "resolute", "mod": 0},
        "sneaking": {"stat": "discreet", "mod": 0},
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


class AbilityEntry(BaseModel):
    name: str
    requirement: str
    tradition: str
    description: str
    novice: str
    adept: str
    master: str
    type: str
    tag: str
