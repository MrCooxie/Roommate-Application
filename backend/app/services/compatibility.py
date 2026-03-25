def Algoritm(userInterests, personInterests):
    from airtable_service import get_interest
    user = []
    person = []
    for id in userInterests:
        user.append(get_interest(id))
    for id in personInterests:
        person.append(get_interest(id))

    #actual algoritm here
    return