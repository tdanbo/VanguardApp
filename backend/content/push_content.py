import pymongo
import constant as cons
import os
import json

client = pymongo.MongoClient(cons.CONNECT)
CONTENT = "Content"
DATABASE = client[CONTENT]

for category in os.listdir(".content"):
    collection = DATABASE[category.capitalize()]
    for subcategory in os.listdir(".content\\" + category):
        dictionary = json.load(
            open(".content\\" + category + "\\" + subcategory, encoding="utf8")
        )
        print(subcategory)
        for item in dictionary:
            item_dictionary = dictionary[item]
            if "name" not in item_dictionary:
                item_dictionary["name"] = item
                print(item_dictionary)

        #     # item_dictionary["name"] = item
        #     # print(item_dictionary)
        #     collection.insert_one(item_dictionary)

# async def create_database_entry(log_entry):
#     document = log_entry
#     if await collection.find_one({"details.name": document["details"]["name"]}):
#         print("Character already exists")
#         return False
#     else:
#         updated_document = add_corruption(document)
#         result = await character_log_collection.insert_one(updated_document)
#         return document
