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

    // CRUD for item listing
    app.post('/item_record', function (req, res) {
        let itemName = req.body.itemName;
        let itemDesc = req.body.itemDesc;
        let itemPrice = req.body.itemPrice
        let contactInfo = req.body.contactInfo
        let category = req.body.category;
        let shopName =req.body.shopName
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
            'category': category,
            'shopName': shopName
        })
        res.status(200);
        res.json({
            'insertedId': result.insertedID
        })
    });
    
    // show all the item listing
    app.get('/item_record', async function(req,res){
        let db = MongoUtil.getDB();
        let results = await db.collection('listings').find({}).toArray();
        res.json(results);
    })


    // Update item listing
    app.put('item_record/:itemId', async function (req, res) {

        let db = MongoUtil.getDB();
        let results = await db.collection('listings').updateOne({
            '_id':ObjectId(req.params.itemId)
        }, {
            '$set': {
                'itemName': req.body.itemName,
                'itemDesc': req.body.itemDesc,
                'itemPrice': req.body.itemPrice,
                'contactInfo': req.body.contactInfo,
                'category': req.body.category,
                'shopName': shopName
            }
        })
        res.json(results);
        // res.redirect('/item_record')
    })
    // Delete item listing
    app.delete('/item_record/:itemId', async function(req,res){
        let db = MongoUtil.getDB();
        let results = await db.collection('listings').deleteOne({
            "_id": ObjectId(req.params.itemId)
        })
        res.json(results);
    })





    // search engines
    app.get('/item_record/search', async function(req,res){
        let critera = {};
        // search by item description
        if (req.query.itemDesc) {
            // add to the critera object a key 'description' 
            critera['itemDesc'] =  {$regex: req.query.itemDesc, $options:'i'};
        }
        // search by item name
        if (req.query.itemName) {
            critera['itemName'] = {$regex: req.query.itemName, $options:'i'}
        }
        // search by shop
        if (req.query.shopName) {
            critera['shopName'] = {$regex: req.query.shopName, $options:'i'}
        }

        console.log(critera);
        let db = MongoUtil.getDB();
        let results = await db.collection('listings').find(critera).toArray();
        res.json(results);
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





