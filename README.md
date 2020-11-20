# iCommerce
## Requires
* [docker-compose](https://docs.docker.com/compose/install/)
## Architecture
![Please click here if it does not show](https://drive.google.com/uc?export=view&id=1x420IzBlbPIomSoLHDbjF8X6ocZ1pjTh)
### Microservices
1. **Products service:** all the business relates to products
2. **User Activities service:** store user activities. Received as messages from product service using message queue
## Run application
* Clone sample configuration files:
```
> cp .env_sample .env
```
* Start all neccessary services as containers. There are five services: rabbitmq, products database, user activities database, products front service, user activities front service.
```
> docker-compose up
```
***
## APIs
### Authentication Service
#### **1. Get products:** GET: /v1/products
* **filter** by *name*, *price*, *brand*, *color*. **name** is indexed by fulltext
* **limit**
* **page** start at 1
* **sort** 1 for asc, -1 for desc

Sample

```
curl --location --request GET 'http://localhost:8080/v1/products?filter=%7B%22name%22%3A%22bluetooth%22%7D&sort=%7B%22_id%22%3A-1%7D&limit=1&page=1'
```
#### **2. Get product:** GET: /v1/products/:id
Sample

```
curl --location --request POST 'http://localhost:8081/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "huynhph95@gmail.com",
    "password": "123456"
}'
```

## Test
### **Products service**
#### Requires:
Start necessary services. This may take several seconds to fully start.
```
> docker-compose up -d rabbitmq products_db
```
Have environment config for products service if not exist
```
> cp products/.env_sample products/.env
``` 
#### Run test cases
```
> cd products
```
```
> cp .env_sample .env
```
```
> npm test
```

If you have any connection issue, wait for few seconds for other services to be started

### Notes
*Seed database and database authentication information is initiated by scripts in **init-db-activities/** and **init-db-products/** directories. If you want to edit these data, edit these file and update environment variables in **.env** (copied from .env_sample sample file) file in root directory according to changes*
