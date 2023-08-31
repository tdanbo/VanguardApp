import json
import os

cwd = os.getcwd()
print(cwd)
for category in os.listdir(os.path.join(".content", "equipment")):
    json_path = os.path.join(".content", "equipment", category)
    with open(json_path, "r", encoding="utf8") as f:
        json_data = json.load(f)
    for item in json_data:
        if "equip" not in json_data[item]:
            json_data[item]["equip"] = []

    with open(json_path, "w") as f:
        json.dump(json_data, f, indent=4)
