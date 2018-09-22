# Mongomart
Created as a project for [M101JS - MongoDB for NodeJS Developers at Mongo University](https://university.mongodb.com/courses/M101JS/about), Mongomart is a simple Ecommerce web app built using [mongoDB Node.js driver](https://mongodb.github.io/node-mongodb-native/) and [Express](https://expressjs.com/)

https://mongomarty.herokuapp.com/


## Installation
```bash
git clone https://github.com/muubar/mongomart.git
npm install
node mongomart.js
```

## MongoDB database setup
to crate and populate a mongomart database, make sure you have a mongod running version 3.2.x of MongoDB,
then run the following commands:

```bash
Import the "item" collection: mongoimport -d mongomart -c item data/items.json
Import the "cart" collection: mongoimport -d mongomart -c cart data/cart.json
```

in order to use the search functionality, a text index must be created, run mongo shell using `mongo` command, and then run the following commands:
```bash
use mongomart
db.item.createIndex({title: "text", slogan: "text", description: "text"})
```


## Screenshots
### home page:
![home page screenshot](/screenshots/homepage.png?raw=true)
### item page:
![item page screenshot](/screenshots/singleItem.png?raw=true)
### cart page:
![cart page screenshot](/screenshots/cart.png?raw=true)
