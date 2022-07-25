#

<div align="center">

  <img src="./.github/logo.svg" alt="Logo" width="250">
  
  <h3 align="center">
     Document sharing backend app
  </h3>
    <br />
  
  <div align="center">

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white&style=for-the-badge)
  ![Node.js ](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white&style=for-the-badge)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB&style=for-the-badge)
  
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

  </div>
  
</div>

## What I Learned
 
  - Integration tests using Jest
  - How to setup a testing database
  - [Seeding](https://www.prisma.io/docs/guides/database/seed-database) with Prisma
  - Factory pattern for tests using Faker

## :rocket: Routes

- The default responses are:
  - `200` - Successful GET request
  - `201` - Successful POST request
  - `204` - Successful DELETE request
  - `401` - Auth errors
  - `404` - Resource not found 
  - `409` - Resource conflict on POST requests
  - `422` - Body validation error on POST requests

### Auth

```yml
POST /signup
    - Route for creating a new user
    - body:{
        "email": "jon@doe.com",
        "password": "DonJoe27"
      }
    - response: {"token": "JWT_TOKEN"}
```

```yml
POST /signin
    - Route for signing an existing user
    - body:{
        "email": "jon@doe.com",
        "password": "DonJoe27"
    }
    - Response: {"token": JWT_TOKEN}
```
    
### Tests

```yml 
POST /tests
    - Route for creating new tests
    - headers: {"Authorization": "Bearer TOKEN"}
    - body: {
        "name": "Matrixes and vector space",
        "pdfUrl": "https://mywebsite.com/linearAlgebra/firstExam.pdf",
        "categoryId": "1",
        "disciplineId": "5",
        "teacherId": "6",
    }
```

```yml
GET /tests/disciplines
    - Route for finding all tests organized by terms and disciplines
    - headers: {"Authorization": "Bearer TOKEN"}
    - Response: array of tests
``` 

```yml
GET /credentials/teachers
    - Route for finding all tests organized by teachers
    - headers: {"Authorization": "Bearer TOKEN"}
    - Response: credential
``` 
