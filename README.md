## NX Angular + NestJS Auth Example with Permission Based

### Angular

Awaiting `Angular 9`

### NestJS (WIP)

1. Run `yarn ng serve api` to start the server on port `3001`
2. `SwaggerUI` runs on `localhost:3001/docs`
3. Make sure to have a local `mongod` instance running
4. Make sure to create the following role to test things out:

```json
{
  "isGlobal": false,
  "parentId": "string",
  "roleName": "Standard User",
  "notes": "This is a standard user",
  "permissions": {
    "user": 7,
    "role": 1
  }
}
```

This is the exact JSON that `Swagger -> Role -> POST /roles` is having as example so you don't have to worry about it

5. Create a User

