const express = require('express')
const mongoose = require('mongoose')
const Customer = require('./models/customer')
const bodyParser = require('body-parser')

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

app.get('/add-customer', (req, res) => {
    const newCustomer = new Customer({
        name: 'Tim',
        phoneNumber: 72664512
    })

    newCustomer.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            })
})

app.get('/all-customers', (req, res) => {
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
     
})