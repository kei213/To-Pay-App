/*import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import Customer from "/models/customer"*/
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
// const Schema = mongoose.Schema
const Customer = require('./models/customer')
// const AmountToPay = require('./models/amount_to_pay')


const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

//Set up default mongoose connection
const dbURI = 'mongodb://localhost:27017/topay';

mongoose.connect(dbURI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true}
)
.then((result) => {
        console.log('connected to db')
        app.listen(port, () => {
            console.log(`app listening at http://localhost:${port}`)
        })
    }
)
.catch((err) => console.log('not connected', err));

//Get the default connection
var connection = mongoose.connection;

app.get("/", (req, res) => {
	 
        Customer.find()
       .then((result) => {
            // res.render('index')
            res.render('index')
            console.log(result)
       })   
       .catch((err) => {
        console.log(err)
       })
})

app.get('/customer-list', (req, res) => {
    Customer.find()
       .then((result) => {
            res.send(result)
       })   
       .catch((err) => {
        console.log(err)
       })  
})

app.get('/to-pay-records', (req, res) => {
    Customer.find()
       .then((result) => {
            res.send(result)
       })   
       .catch((err) => {
        console.log(err)
       })  
})

app.post('/add-new-customer', (req, res) => {

    const name = req.body.name.toString()
          console.log('name =', name )
    const phoneNumber =  req.body.phoneNumber 
          console.log('phoneNumber =', phoneNumber ) 

    //Create new customer collection

    function CreateModel(name){//function to create collection , user_name  argument contains collection name

      var Model  = require(path.resolve('./models/dynamicmodel.js'))(name);
      console.log(Model)

    }
    
    CreateModel(name)

    function save_user_info(name, phoneNumber){//function to save user info , data argument contains user info
        console.log('function save_user_info')
         var UserModel  = mongoose.model(name + 'collection') ;
         console.log(UserModel)

        const newCustomer = new UserModel({
            name: name,
            phoneNumber: phoneNumber
        })

        newCustomer.save()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    console.log(err)
                })

         /*var usermodel  = UserModel(data);
                  usermodel.save(function (err) {

                   if (err) {
                      console.log(err);
                    } else {
                     console.log("\nSaved");
                    }
               });*/
    }      

    save_user_info(name, phoneNumber)
    
    //Create new customer 
    const newCustomer = new Customer({
        name: name,
        phoneNumber: phoneNumber
    })

    newCustomer.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            })
    
    //
    

})

app.post('/selected-customer', (req, res) => {
    const selectedCustomer = req.body.selectedCustomer.toString()
    console.log('selectedCustomer =', selectedCustomer )
    var selectedCustomerCollection  = mongoose.model(selectedCustomer + 'collection') ;
         console.log('POST', selectedCustomerCollection)
    // const custModel = `${selectedCustomer}AmountToPay`
    selectedCustomerCollection.find()
       .then((result) => {
            res.send(result)
            console.log('success', result)
       })   
       .catch((err) => {
        console.log(err)
       })
})