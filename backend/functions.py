import math

def add_corruption(document):
    print("adding corruption")

    resolute = int(document["stats"]["resolute"])
    max_corruption = math.ceil(resolute/2)
    for i in range(max_corruption):
        print(i)
        document["corruption"]["token"+str(i)] = 0
    print(document)
    return document

def add_inventory(document):
    print("adding inventory")
    strong = int(document["stats"]["strong"])
    for i in range(strong*2):
        document["inventory"][str(i)] = {}
    print(document)
    return document

def add_equipment(document):
    print("adding equipment")
    for i in range(4):
        document["equipment"][str(i)] = {}
    print(document)
    return document