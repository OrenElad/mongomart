# Mongomart
Created as a project for [M101JS - MongoDB for NodeJS Developers at Mongo University](https://university.mongodb.com/courses/M101JS/about), Mongomart is a simple Ecommerce web app built using [mongoDB Node.js driver](https://mongodb.github.io/node-mongodb-native/) and [Express](https://expressjs.com/)


## Installation
```bash
git clone https://github.com/ratracegrad/mongomart
npm install
node mongomart.js
```

## Populating MongoDB database with items
to crate and populate a mongomart database, make sure you have a mongod running version 3.2.x of MongoDB,
then run the following commands:

```bash
Import the "item" collection: mongoimport -d mongomart -c item data/items.json
Import the "cart" collection: mongoimport -d mongomart -c cart data/cart.json
```

## Screenshots
### home page:
![home page screenshot](/screenshots/homepage.png?raw=true)
### item page:
![item page screenshot](/screenshots/singleItem.png?raw=true)
### cart page:
![cart page screenshot](/screenshots/cart.png?raw=true)
