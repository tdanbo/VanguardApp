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

def add_equipment(document):
    print("adding equipment")
    for i in range(4):
        document["equipment"].append({})
    print(document)
    return document