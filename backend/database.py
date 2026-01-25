from pyairtable import Api

token = "patzWHd5tuDZWVKg1.4eb2cd83112d271844c0bdc4fe4dd50e44c2cd59c5284be514428e5c559631e8"
base_id = "apptrJWQiYgjwrNUS"

api = Api(token)

table_select = input("Users/Housing:")
while True:
    if table_select == "Users" or table_select == "Housing":
        table = api.table(base_id, table_select)
        break
    else:
        pass
records = table.all()

print(records)
