# Demo Task API

This API provides a way to manage users. It is intended for use by developers who need to integrate user management into their applications.

## How to run 

1- `yarn install `

2- `yarn start `

## Authorization

All requests to this API require a bearer token. To obtain a bearer token, send a POST request to the `/auth/login` endpoint with your email address and password in the request body. The response will contain a bearer token in the `Authorization` header.

### Endpoints

**_POST api/auth/login_**

_Authenticate and log in a user._

**Request body**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}

{
    "user": object,
    "message": "string",
    "token": "string"
}

Authorization: Bearer <token>

{
    "pageSize": number,
    "pageNumber": number,
    "totalItems": number,
    "users": []
}
Authorization: Bearer <token>

{
    "user": object
}

Authorization: Bearer <token>

{
    "name": "string (required)",
    "email": "string (required)",
    "password": "string (required)",
    "role": "admin" | "user" (required)
}

{
    "user": object,
    "message": "string"
}

Authorization: Bearer <token>
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "admin" | "user"
}

{
    "user": object,
    "message": "string"
}

Authorization: Bearer <token>
{
    "user": object,
    "message": "string"
}
