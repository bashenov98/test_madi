# test-api-for-madi  
A sample express api for task management system. 

## Endpoints
### auth
#### router.post("/users", register)
Body:
``` 
{
    "username": "daniyar",
    "password": "222222"
}
```
#### router.post("/users/authenticate", login)
Body:
``` 
{
    "username": "daniyar",
    "password": "222222"
}
```

### tasks
#### router.post("/tasks", verifyToken, create_task);
Body:
``` 
{
    "title": "Test task 2",
    "description": "Test task for Madi's team",
    "status": "ToDo"
}
```
#### router.get("/tasks/:id", verifyToken,  get_task_by_id)
#### router.put("/tasks/:id", verifyToken,  update_task_by_id)
Body:
``` 
{
    "title": "Test task 3",
    "description": "Test task for Madi's team",
    "status": "Done"
}
```
#### router.delete("/tasks/:id", verifyToken,  delete_task_by_id)

### tags
#### router.post("/tasks/:taskId/tags", verifyToken, create_tag)
Body:
``` 
{
    "name": "nodejs"
}
```
#### router.get("/tags/:id", verifyToken, get_tag_by_id)
#### router.put("/tags/:id", verifyToken, update_tag_by_id)
Body:
``` 
{
    "name": "nodets"
}
```
#### router.delete("/tags/:id", verifyToken, delete_tag_by_id)