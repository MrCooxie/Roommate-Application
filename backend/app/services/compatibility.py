import math
from flask import current_app

def get_airtable_client():
    return current_app.airtable

def Algoritm(userInterests, personInterests):
    at = get_airtable_client()
    user = []
    person = []
    for id in userInterests:
        user.append(at.get_interest(id))
    for id in personInterests:
        person.append(at.get_interest(id))

    userScore = 0
    personScore = 0
    for interest in user:
        rarity = len(interest["Users"])
        userScore += 100/pow(rarity, 0.1)
    for interest in person:
        if interest in user:
            rarity = len(interest["Users"])
            personScore += 100 / pow(rarity, 0.1)

    compatibility = ((personScore*len(user))/(userScore*len(person)))*100
    print(compatibility)
    return compatibility
