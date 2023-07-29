def add_corruption(document):
    print("adding corruption")
    print(document)
    strong = document["stats"]["strong"]
    print(strong)
    for i in range(int(strong)):
        print(i)
        document["corruption"][str(i)] = {"corruption": 0}

    return document