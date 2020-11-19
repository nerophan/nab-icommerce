# iCommerce
## Requires
* [docker-compose](https://docs.docker.com/compose/install/)
## Architecture
![Architecture](https://drive.google.com/uc?export=view&id=1x420IzBlbPIomSoLHDbjF8X6ocZ1pjTh)
### Microservices
1. **Products service:** all the business relates to products
2. **User Activities service:** store activity messages from product service
## Run application
* Install node_modules for services:
> cd backend; npm i; cd ../authentication-service; npm i; cd ..
* Clone sample configuration files:
> cd backend; cp .env_sample .env; cd ../authentication-service; cp .env_sample .env; cd ..
* Start all neccessary services as containers. There are four services: Authentication database, authentication service, app database, app service.
> docker-compose up
***
## APIs
### Authentication Service
#### **1. Signup**
Sample

`curl --location --request POST 'http://localhost:8081/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "huynhph95@gmail.com",
    "password": "123456",
    "fullname": "Huynh Phan"
}'`
#### **2. Login**
Sample

`curl --location --request POST 'http://localhost:8081/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "huynhph95@gmail.com",
    "password": "123456"
}'`
#### **3. Verify token** (Internal API for app service only)
Sample

`curl --location --request POST 'http://localhost:8081/priv/v1/users/verify_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbWFpbEBnbWFpbC5jb20iLCJmdWxsbmFtZSI6Ikh1eW5oIFBoYW4iLCJjcmVhdGVkQXQiOiIyMDIwLTExLTE0VDE2OjUxOjAzLjc4N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTE0VDE2OjUxOjAzLjc4N1oiLCJpYXQiOjE2MDU0MjI0NjksImV4cCI6MTYwNTUwODg2OX0.G7F9TAQwy8J6nwE-vw_aFtwWghaQrNK3HBepRozCSQ8"
}'`
### App Service
All request must include token as **Authorization** header
#### **1. Create wishlist**
Sample

`curl --location --request POST 'http://localhost:8080/v1/wishlists' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Wishlist 1"
}'`
#### **2. Add items to wishlist**
Sample

`curl --location --request POST 'http://localhost:8080/v1/wishlists/wishlist_items' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "wishlist": 1,
    "items": [
        {
            "name": "Item 2"
        },
        {
            "name": "Item 3"
        }
    ]
}'`
#### **3. Get wishlists**
Sample

`curl --location --request GET 'http://localhost:8080/v1/wishlists' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg'`
#### **4. Get wishlist detail**
Sample

`curl --location --request GET 'http://localhost:8080/v1/wishlists/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg'`
#### **5. Edit wishlist**
Sample

`curl --location --request PUT 'http://localhost:8080/v1/wishlists/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Wishlist 1 edited"
}'`
#### **6. Edit wishlist item**
Sample

`curl --location --request PUT 'http://localhost:8080/v1/wishlists/wishlist_items/1' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluaHBoOTVAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJIdXluaCBQaGFuIiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0xMS0xNVQxNToxODoxNS44NDdaIiwiaWF0IjoxNjA1NDUzNTAwLCJleHAiOjE2MDU1Mzk5MDB9.eR4Epbd6eBcOtSFQb_p6cEjNM6FtcH5h7ZfQ0WlZBNg' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Item 1"
}'`

