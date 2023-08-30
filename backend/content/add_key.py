import json
import os

cwd = os.getcwd()
print(cwd)
for category in os.listdir(os.path.join(".content", "abilities")):
    json_path = os.path.join(".content", "abilities", category)
    with open(json_path, "r", encoding="utf8") as f:
        json_data = json.load(f)
    for item in json_data:
        json_data[item]["level"] = "Novice"

    with open(json_path, "w") as f:
        json.dump(json_data, f, indent=4)
