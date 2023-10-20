## Demo Task API

This API provides a way to manage users. It is intended for use by developers who need to integrate user management into their applications.

### Authorization

All requests to this API require a bearer token. To obtain a bearer token, send a POST request to the `/auth/login` endpoint with your email address and password in the request body. The response will contain a bearer token in the `Authorization` header.

### Endpoints

**_POST api/auth/login_**

_Authenticate and log in a user._

**Request body**

```
{
  "email": string (required),
  "password": "string (required)"
}

```

**Response body**

```
{
    "user": object,
    "message": string,
    "token": string
}
```

**_GET api/users_**

_Get all users. Optionally sort and paginate the results._

**Request headers**

```
Authorization: Bearer <token>

```

**Request parameters**

- `pageSize`: number
- `pageNumber`: number
- `role`: admin | user

**Response body**

```
{
    "pageSize": number,
    "pageNumber": number,
    "totalItems": number,
    "users": []
}
```

**_GET api/users/:id_**

_Get a single user by their ID._

**Request headers**

```
Authorization: Bearer <token>

```

**Request parameters**

- `id`: string (required)

**Response body**

```
{
    "user": object
}
```

**_POST api/users_**

_Add a new user._

**Request headers**

```
Authorization: Bearer <token>

```

**Request parameters**

- `id`: string (required)

**Request body**

```
{
    "name": string (required),
    "email": string (required),
    "password": string (required),
    "role": "admin" | "user" (required)
}
```

**Response body**

```
{
    "user": object,
    "message": string
}
```

**_PUT api/users/:id_**

_Update a user by their ID. Provide the fields you want to update in the request body._

**Request headers**

```
Authorization: Bearer <token>

```

**Request parameters**

- `id`: string (required)

**Request body**

```
{
    "name": string,
    "email": string,
    "password": string,
    "role": "admin" | "user"
}
```

**Response body**

```
{
    "user": object,
    "message": string
}
```

**_DELETE api/users/:id_**

_Delete a user by their ID._

**Request headers**

```
Authorization: Bearer <token>

```

**Request parameters**

- `id`: string (required)

**Response body**

```
{
    "user": object,
    "message": string
}
```
#   Z u m r a _ T a s k _ B a c k e n d  
 