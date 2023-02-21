# Task

All this task must be done in 1 day

- in src/utils/MkdSDK.jsx implement Line 17
- in src/utils/MkdSDK.jsx implement Line 91
- in src/pages/AdminLoginPage.jsx implement Line 30
- once login successful, call snackbar component to show logged in toast. DONT use 3rd party library
- in src/authContext.jsx implement 16
- in src/authContext.jsx implement 40 to check if token still valid
- There's a bug that it flickers Page Not Found
- once logged in go to dashboard page like figma file
  https://www.figma.com/file/veiESwD61KJBa7BpEHtbdl/react-task-2?node-id=1086%3A15525

- Call paginate api as shown below to get video data. Show 10 per page. Have a next button at bottom when clicked, load next 10 videos

- Call paginate api as shown below to get video data. Show 10 per page. Have a prev button at bottom when clicked, load prev 10 videos

- Implement logout button

- Please READ SDK file and reuse code when you can. DO NOT REINVENT THE WHEEL.
- Use React Drag and drop library https://react-dnd.github.io/react-dnd/about to be able to rearrange the rows and columns in the table in dashboard. On Refresh, the columns go back to default

## Login

```
https://reacttask.mkdlabs.com/v2/api/lambda/login
Method POST
content-type application/json
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
body
{
  "email": "adminreacttask@manaknight.com",
  "password": "a123456",
  "role": "admin"
}
Response
{
    "error": false,
    "role": "admin",
    "token": "",
    "expire_at": 3600,
    "user_id": 1
}
```

## Check

```
Check if token still valid
https://reacttask.mkdlabs.com/v2/api/lambda/check
Method POST
Header
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
Bearer <token>
body
{
  "role": "admin"
}
Response
http code 200
```

## Video Paginate

```
https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE
Method POST
Header
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
Bearer <token>
body
{
    "payload": {},
    "page": 1,
    "limit": 10
}
Response
http code 200
{
    "error": false,
    "list": [
        {
            "id": 1,
            "title": "Rune raises $100,000 for marketing through NFT butterflies sale",
            "photo": "https://picsum.photos/200/200",
            "user_id": 1,
            "username": "boss",
            "create_at": "2022-01-01",
            "update_at": "2022-01-01T04:00:00.000Z",
            "like": 10
        }
    ],
    "page": 1,
    "limit": 10,
    "total": 112,
    "num_pages": 12
}

```
# react-task
# react-task
