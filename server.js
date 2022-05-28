const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const port = 3000;
require('dotenv').config()

app.use(express.urlencoded({extended: false}));
app.use(express.json());


const product = require('./routes/product');


app.use('/api/product' , product)


app.get('/' , (req,res) => {
    res.send(`<h1>Welcome to the product page</h1>`)
})

const start = async (url) => {
    try {
        const connect = await connectDB(url);
        console.log('Connected to mongodb')
        app.listen(port , () => {
          console.log(`Serer is listening at ${port}`);
        })   
    } catch (err) {
        console.log(err)
    }
}

start(process.env.MONGO_URI);



