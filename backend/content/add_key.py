import json
import os

cwd = os.getcwd()
print(cwd)
for category in os.listdir(os.path.join("src", ".content", "monsters")):
    json_path = os.path.join("src", ".content", "monsters", category)
    with open(json_path, "r", encoding="utf8") as f:
        json_data = json.load(f)
    for item in json_data:
        json_data[item]["Imbued"] = ""

    with open(json_path, "w") as f:
        json.dump(json_data, f, indent=4)
