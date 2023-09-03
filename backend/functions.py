import math


def add_corruption(document):
    print("adding corruption")
    print(document)

    resolute = int(document["stats"]["resolute"]["value"])
    threshold = math.ceil(resolute / 2)
    document["corruption"]["threshold"] = threshold
    return document


def add_equipment(document):
    print("adding equipment")
    for i in range(3):
        document["equipment"].append({})
    print(document)
    return document

def add_max_toughness(document):
    print("adding max toughness")
    min_toughness = 10
    strong = int(document["stats"]["strong"]["value"])

    if strong < min_toughness:
        document["toughness"]["max"]["value"] = min_toughness
    else:
        document["toughness"]["max"]["value"] = strong

    return document

def add_pain_threshold(document):
    print("adding pain threshold")
    strong = int(document["stats"]["strong"]["value"])
    pain = math.ceil(strong / 2)
    document["toughness"]["pain"]["value"] = pain
    return document