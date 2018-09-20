/*
  Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function ItemDAO(database) {
    "use strict";

    this.db = database;

    this.getCategories = function (callback) {
        "use strict";

        database.collection('item').aggregate(
            [
                {
                    $group: {
                        _id: "$category",
                        num: { $sum: 1 }
                    }
                }
            ]
        ).toArray(function (err, results) {
            assert.equal(err, null);
            var Allcount = results.reduce((acc, currCategory) => acc + Number(currCategory.num), 0);
            // copy array by value to prevent mutation
            var resultsWithAll = results.slice();
            resultsWithAll.push({ _id: "All", num: Allcount });
            resultsWithAll.sort((a, b) => a._id.charCodeAt(0) - b._id.charCodeAt(0));
            callback(resultsWithAll);
        });
    }


    this.getItems = function (category, page, itemsPerPage, callback) {
        "use strict";

        const categoryFilter = category === "All" ? database.collection('item').find({}) : database.collection('item').find({ "category": category })

        categoryFilter
            .sort({ "_id": 1 })
            .skip(itemsPerPage * page)
            .limit(itemsPerPage)
            .toArray(function (err, pageItems) {
                assert.equal(err, null);
                callback(pageItems);
            })
    }


    this.getNumItems = function (category, callback) {
        "use strict";

        const categoryFilter = category === "All" ? database.collection('item').find({}) : database.collection('item').find({ "category": category })

        categoryFilter.count(function (err, count) {
            assert.equal(err, null);
            callback(count);
        })
    }


    this.searchItems = function (query, page, itemsPerPage, callback) {
        "use strict";

        database.collection('item').find({ $text: { $search: `\"${query}\"` } })
            .sort({ "_id": 1 })
            .skip(itemsPerPage * page)
            .limit(itemsPerPage)
            .toArray(function (err, pageSearchItems) {
                assert.equal(err, null);
                callback(pageSearchItems);
            })
    }


    this.getNumSearchItems = function (query, callback) {
        "use strict";

        database.collection('item').find({ $text: { $search: `\"${query}\"` } })
            .count(function (err, count) {
                assert.equal(err, null);
                callback(count);
            })
    }


    this.getItem = function (itemId, callback) {
        "use strict";

        database.collection('item').find({ _id: itemId })
            .toArray(function (err, item) {
                assert.equal(err, null);
                callback(item[0]);
            })
    }


    this.getRelatedItems = function (callback) {
        "use strict";

        this.db.collection("item").find({})
            .limit(4)
            .toArray(function (err, relatedItems) {
                assert.equal(null, err);
                callback(relatedItems);
            });
    };


    this.addReview = function (itemId, comment, name, stars, callback) {
        "use strict";

        /*
         * TODO-lab4
         *
         * LAB #4: Implement addReview().
         *
         * Using the itemId parameter, update the appropriate document in the
         * "item" collection with a new review. Reviews are stored as an
         * array value for the key "reviews". Each review has the fields:
         * "name", "comment", "stars", and "date".
         *
         */

        var reviewDoc = {
            name: name,
            comment: comment,
            stars: stars,
            date: Date.now()
        }

        database.collection('item').findOneAndUpdate({ "_id": itemId }, { $push: { reviews: reviewDoc } }
            , function (err, result) {
                callback(result);
            })
    }


    this.createDummyItem = function () {
        "use strict";

        var item = {
            _id: 1,
            title: "Gray Hooded Sweatshirt",
            description: "The top hooded sweatshirt we offer",
            slogan: "Made of 100% cotton",
            stars: 0,
            category: "Apparel",
            img_url: "/img/products/hoodie.jpg",
            price: 29.99,
            reviews: []
        };

        return item;
    }
}


module.exports.ItemDAO = ItemDAO;
