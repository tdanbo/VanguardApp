import pymongo
import constant as cons
import os
import json

client = pymongo.MongoClient(cons.CONNECT)
CONTENT = "Content"
DATABASE = client[CONTENT]

category = "equipment"

collection = DATABASE[category.capitalize()]

upload_list = ["quality_weapon", "quality_armor", "elixirs", "ammunition","quality_ranged","provision"] 
for item in upload_list:
    json_path = os.path.join(".content", category, item + ".json")
    dictionary = json.load(open(json_path, encoding="utf8"))
    for item in dictionary:
        item_dictionary = dictionary[item]
        if "name" not in item_dictionary:
            item_dictionary["name"] = item
        collection.insert_one(item_dictionary)
