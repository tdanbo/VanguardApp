import json
import os
import re

cwd = os.getcwd()
print(cwd)
for category in os.listdir(os.path.join(".content", "abilities")):
    json_path = os.path.join(".content", "abilities", category)
    with open(json_path, "r", encoding="utf8") as f:
        json_data = json.load(f)

    for item in json_data:
        novice_description = json_data[item]["novice"]["description"]
        adept_description = json_data[item]["adept"]["description"]
        master_description = json_data[item]["master"]["description"]

        matches = re.findall(r"\b\d*[dD]\d+\+?\d*\b", novice_description)
        if not matches:
            pass  # Output: ['1D8', '4d20', '2d10+2']
            json_data[item]["novice"]["roll"] = []
        else:
            json_data[item]["novice"]["roll"] = []
            for match in matches:
                json_data[item]["novice"]["roll"].append(
                    {"type": json_data[item]["type"].lower(), "dice": match.lower()}
                )

        matches = re.findall(r"\b\d*[dD]\d+\+?\d*\b", adept_description)
        if not matches:
            pass  # Output: ['1D8', '4d20', '2d10+2']
            json_data[item]["adept"]["roll"] = []
        else:
            json_data[item]["adept"]["roll"] = []
            for match in matches:
                json_data[item]["adept"]["roll"].append(
                    {"type": json_data[item]["type"].lower(), "dice": match.lower()}
                )

        matches = re.findall(r"\b\d*[dD]\d+\+?\d*\b", master_description)
        if not matches:
            pass  # Output: ['1D8', '4d20', '2d10+2']
            json_data[item]["master"]["roll"] = []
        else:
            json_data[item]["master"]["roll"] = []
            for match in matches:
                json_data[item]["master"]["roll"].append(
                    {"type": json_data[item]["type"].lower(), "dice": match.lower()}
                )

    with open(json_path, "w") as f:
        json.dump(json_data, f, indent=4)
