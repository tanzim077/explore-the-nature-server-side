import sys
import supervisely as sly


# qid = input("Enter QID:")
qid = sys.argv[1]

address = "quantigo.supervise.ly"

token = sys.argv[2]

api = sly.Api(address, token)

user_info = api.user.get_info_by_login(qid)
print(user_info)

# if user_info:
#     print(False)
# else:
#     print(True)