# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "elham",
  "password": "rahasia",
  "name": "M Elham Abdussalam"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "elham",
    "name": "M Elham Abdussalam"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registed"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "elham",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Budi Kurniawan", //optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "budi",
    "name": "Budi Kurniawan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "elham",
    "name": "M Elham Abdussalam"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorization"
}
```

## Logout User API

Endpoint : DELETE api/user/logout

Headers:

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
