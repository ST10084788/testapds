const express = require('express')
const cors = require('cors')
const app = express()
const urlprefix ='/api'
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: {sslCA: cert }};

    const connstring = 'mongodb+srv://user:password2023@testdb.gdzzqbi.mongodb.net/?retryWrites=true&w=majority'
//D44OgKXpVHxcXZxj

const characterRoutes = require('./routes/character');
const userRoutes = require('./routes/user');




//Initialize Mongoose 
mongoose
  .connect(connstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});


//https://expressjs.com/en/api.html#express.json
app.get(urlprefix+'/', (req,res)=> {
    res.send('Hello World')
})
app.use(cors());
app.use(urlprefix+'/characters',characterRoutes)
app.use(urlprefix+'/users',userRoutes)


module.exports = app;