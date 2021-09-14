// Set up express
const { response } = require('express')
const cors = require("cors")
const express = require('express')
const MongoUtil = require('./MongoUtil');
const ObjectId = require('mongodb').ObjectId;

// setup environmental variables to store the mongo connection string
require('dotenv').config();

let app = express();
// app.set('view engine', 'hbs')


// define static images in images folder
app.use(express.static('images'))
// // set up wax on 

// app.use(express.urlencoded({
//     'extended': false
// }))
app.use (express.json());
app.use(cors())


// ROUTES

async function main() {
    await MongoUtil.connect(process.env.MONGO_URL,"homebakers");

    app.post('/item_record', function (req, res) {
        let itemName = req.body.itemName;
        let itemDesc = req.body.itemDesc;
        let itemPrice = req.body.itemPrice
        let contactInfo = req.body.contactInfo
        let category = req.body.category;
        console.log(req.body);
        if (!category){
            category = [];
        } else if (!Array.isArray(category)){
                category = [category];
        }
        
        let db = MongoUtil.getDB();
        db.collection('listings').insertOne({
            'itemName': itemName,
            'itemDesc': itemDesc,
            'itemPrice': itemPrice,
            'contactInfo': contactInfo,
            'category': category
        })
        res.status(200);
        res.json({
            'insertedId': result.insertedID
        })
    });
    
    app.get('/item_record', async function(req,res){
        let db = MongoUtil.getDB();
        let results = await db.collection('listings').find({}).toArray();
        res.json(results);
    })


    // Edit item listing
    app.put('item_record/:itemId', async function (req, res) {
        let db = MongoUtil.getDB();
        let results = await db.collection('food').updateOne({
            '_id':ObjectId(req.params.itemId)
        }, {
            '$set': {
                'itemName': itemName,
                'itemDesc': itemDesc,
                'itemPrice': itemPrice,
                'contactInfo': contactInfo,
                'category': category
            }
        })
        res.json(results);
        res.redirect('/item_record')
    })

    app.delete('/item_record/:itemId', async function(req,res){
        let db = MongoUtil.getDB();
        let results = await db.collection('listing').deleteOne({
            "_id": ObjectId(req.params.itemId)
        })
        res.json(results);
        res.redirect('/item_record')
    })


    // // Adding review to an item page (subdoc)
    // app.get('/item_record/:itemID/reviews/add', async function (req, res) {
    //     let db = MongoUtil.getDB();
    //     let itemDetails = await db.collection('listings').findOne({
    //         '_id': ObjectId(req.params.id)
    //     })
    //     res.render('add_review', {
    //         'item': itemDetails
    //     })
    // })

    // app.post('/item_record/:item/reviews/add', async function (req, res) {
    //     let db = MongoUtil.getDB();
    //     let reviewContent = req.body.content;
    //     let id = req.params.id;
    //     let response = await db.collection('homebakers').updateOne({
    //         '_id': ObjectId(id)
    //     }, {
    //         '$push': {
    //             'notes': {
    //                 '_id': ObjectId(),
    //                 'review': reviewContent
    //             }
    //         }
    //     })
    //     res.redirect('/item_record')
    // })
}
main();

// START SERVER
app.listen(3000, () => {
    console.log("Server started")
})





