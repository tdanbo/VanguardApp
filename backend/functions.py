import math

def add_corruption(document):
    print("adding corruption")
    print(document)#
    resolute = int(document["stats"]["resolute"])
    max_corruption = math.ceil(resolute/2)
    for i in range(max_corruption):
        print(i)
        document["corruption"]["token"+str(i)] = 0

    return document
