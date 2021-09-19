const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))


//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/topay';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var connection = mongoose.connection;

/*//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/

// When successfully connected
connection.on('connected', function () {  
  console.log('Connected to mongo server' /*+ dbURI*/);
}); 

// If the connection throws an error
connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});

/*var collections = mongoose.connections[0].collections;
var names = [];
Object.keys(collections).forEach(function(k) {
    names.push(k);
});
console.log(names);*/



connection.once('open', function () {
    console.log('connection.once')

    connection.db.collection("topay", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log('data', data); // it will print your collection data
        })

    });

    Object.keys(connection.models).forEach((collection) => {
    // You can get the string name.
    console.log('collection', collection);
    })

});



app.get("/", (req, res) => {
	res.render('index')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})