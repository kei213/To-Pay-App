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
let customerData
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

//init dynamic models
Customer.find()
       .then((result) => {
            

            for (let i = 0; i < result.length; i++) {
                const name = result[i].name
                function CreateModel(name){//function to create collection , user_name  argument contains collection name
                  console.log('CreateModel ran')
                  var Model  = require(path.resolve('./models/dynamicmodel.js'))(name);
                  console.log(Model)

                }
                CreateModel(name)
            }

       })   
       .catch((err) => {
        console.log(err)
       })

app.get("/", (req, res) => {
	 
        Customer.find()
       .then((result) => {         

            
            res.render('index')
            // console.log(result)
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


app.post('/add-new-customer', (req, res) => {

    const name = req.body.name.toString()
          console.log('name =', name )
    const phoneNumber =  req.body.phoneNumber 
          console.log('phoneNumber =', phoneNumber ) 

    //Dynamically create new customer collection model

    function CreateModel(name){//function to create collection , user_name  argument contains collection name

      var Model  = require(path.resolve('./models/dynamicmodel.js'))(name);
      console.log(Model)

    }
    
    CreateModel(name)

    //add new customer to customer list 
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

    /*function save_user_info(name, phoneNumber){//function to save user info , data argument contains user info
        console.log('function save_user_info')
         var UserModel  = mongoose.model(name + 'collection') ;
         console.log(UserModel)

        const newCustomer = new UserModel({
            day: name,
            amount: phoneNumber
        })

        newCustomer.save()
                .then((result) => {
                    // res.send(result)
                })
                .catch((err) => {
                    console.log(err)
                })     
    }
    save_user_info(name, phoneNumber)  */  

})

app.post('/selected-customer', (req, res) => {
    console.log('/selected-customer')
    const selectedCustomer = req.body.selectedCustomer.toString()

    var selectedCustomerCollection  = mongoose.model(selectedCustomer + 'collection') ;
         console.log('POST', selectedCustomerCollection)

    selectedCustomerCollection.find()
       .then((result) => {
            
            customerData = result
            console.log('customerData', customerData)
            res.send(result)

       })   
       .catch((err) => {
        console.log(err)
    })
})

app.get("/customer-data", (req, res) => {
    console.log('customer-data', customerData )

    res.send(customerData)
})

app.post('/add-daily-amount', (req, res) => {
    
    const customerName = req.body.customerName.toString()

    var selectedCustomerCollection  = mongoose.model(customerName + 'collection') ;
         console.log('POST', selectedCustomerCollection)

    const dailyAmountValue =   req.body.dailyAmountValue  

    const newDailyDocument = new selectedCustomerCollection({
        day: customerName, 
        amount: dailyAmountValue
    })

        newDailyDocument.save()
            .then((result) => {
                res.send(result)
                console.log('daily document saved')
            })
            .catch((err) => {
                console.log(err)
            })


})