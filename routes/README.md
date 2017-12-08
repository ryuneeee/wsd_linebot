
# linebot.js
| Method | URL | Description |
|-|-|-|
| POST | / | Line Bot WebHook |

# code.js
| Method | URL | Description |
|-|-|-|
|GET | /codes/:id| get code list by context id|
|GET | /code/:id| get code by code id|
| POST | /code/:id | insert code, id is context id |
| PUT | /code/:id | update code by code id |
| DELETE | /code/:id | delete code by code id |

# user.js
| Method | URL | Description |
|-|-|-|
|POST| /login | Login, userid and userpw, result=0 - Success, result=1 - Illegal format, result=2 - password not match, result=2 = no userid |
|POST | /join | Join, userid and userpw, result=0 - Success, result=1 - Illegal format, result=2 - already exist |
| POST | /logout | Logout |
| POST | checkSess | get user id or 401 error |
