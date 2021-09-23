const express = require('express')
const mongoose = require('mongoose')
const Customer = require('./models/customer')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))


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
	res.render('index')
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

