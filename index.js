// Set up express
const { response } = require('express')
const cors = require("cors")
const express = require('express')
const MongoUtil = require('./MongoUtil');
const ObjectId = require('mongodb').ObjectId;

// setup environmental variables to store the mongo connection string
require('dotenv').config();

let app = express()
app.set('view engine', 'hbs')


// define static images in images folder
app.use(express.static('images'))
// set up wax on 
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// const helpers = require('handlebars-helpers');
// helpers({
//     'handlebars': hbs.handlebars
// })

app.use(express.urlencoded({
    'extended': false
}))
app.use (express.json)
app.use(cors())


// ROUTES

async function main() {
    await MongoUtil.connect(process.env.MONGO_URL,"homebakers");

    
    // // Homepage - all item view
    // app.get('/item_record', async function (req, res) {
    //     let db = MongoUtil.getDB();
    //     let itemRecords = await db.collection('listings').find({}).project({
    //         'itemName': 1,
    //         'itemDesc': 1,
    //         'itemPrice':1,
    //         'contactInfo':1,
    //         'category':1
    //     }).toArray();
    //         res.render("item", {
    //             'itemRecords': itemRecords
    //         });
    // })

    // // Create new listing via form
    // app.get('/item_record/create', function (req, res) {
    //     res.render('create_item')
    // })


    // Process the form

    app.post('/item_record', function (req, res) {
        let item_name = req.body.item_name;
        let item_desc = req.body.item_description;
        let item_price = req.body.item_price
        let contact_info = req.body.contact_info
        let category = req.body.category;
        console.log(req.body);
        if (!category){
            category = [];
        } else if (!Array.isArray(category)){
                category = [category];
        }
        
        let db = MongoUtil.getDB();
        db.collection('listings').insertOne({
            'itemName': item_name,
            'itemDesc': item_desc,
            'itemPrice': item_price,
            'contactInfo': contact_info
        })
        res.status(200);
        res.json({
            'insertedId': result.insertedID
        })

        // res.redirect('/item_record')
    });

    // Edit item listing
    app.put('/:itemID/update', async function (req, res) {
        let db = MongoUtil.getDB();
        let itemID = req.params.itemID;
        // let response = await axios.get ('')
        res.render('edit_item', {
            'listings': response.data
        })
    })

    app.post('/:itemID/update', async function (req, res) {
        let itemID = req.params.itemID;
        // let item = {
        //     "item_id": Math.floor(Math.random()*1000000+ 10000),
        //     "item_name": req.body.item_name,
        //     "item_desc": req.body.item_description,
        //     "category":{
        //         "cat_id": 1,
        //         "name": req.body.category
        //     },
        //     "contact_info": "number"
        // }
        res.redirect('/item')
    })

    // Adding review to an item page (subdoc)
    app.get('/item_record/:itemID/reviews/add', async function (req, res) {
        let db = MongoUtil.getDB();
        let itemDetails = await db.collection('listings').findOne({
            '_id': ObjectId(req.params.id)
        })
        res.render('add_review', {
            'item': itemDetails
        })
    })



    app.post('/item_record/:item/reviews/add', async function (req, res) {
        let db = MongoUtil.getDB();
        let reviewContent = req.body.content;
        let id = req.params.id;
        let response = await db.collection('homebakers').updateOne({
            '_id': ObjectId(id)
        }, {
            '$push': {
                'notes': {
                    '_id': ObjectId(),
                    'review': reviewContent
                }
            }
        })
        res.redirect('/item_record')
    })
}
main();

// START SERVER
app.listen(3000, () => {
    console.log("Server started")
})





