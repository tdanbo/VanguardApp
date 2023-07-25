from pydantic import BaseModel

class CombatEntry(BaseModel):
    character: str
    result: int
    active: str
    type: str
    details: str