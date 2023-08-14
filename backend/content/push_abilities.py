import pymongo
import constant as cons
import os
import json

client = pymongo.MongoClient(cons.CONNECT)
CONTENT = "Content"
DATABASE = client[CONTENT]

CATEGORY = "abilities"

collection = DATABASE[CATEGORY.capitalize()]

upload_list = ["abilities","rituals","mystical_powers"]
for item in upload_list:
    json_path = os.path.join(".content", CATEGORY, item + ".json")
    dictionary = json.load(open(json_path, encoding="utf8"))
    for item in dictionary:
        item_dictionary = dictionary[item]
        collection.insert_one(item_dictionary)
