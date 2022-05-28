require('dotenv').config();
const connectDb = require('./db/connect');
const Product = require('./model/Product');
const jsonProducts = require('./products.json');

const start = async () => {
   try {
       await connectDb(process.env.MONGO_URI);
       await Product.create(jsonProducts);
       console.log('Products are added successfully')
       process.exit(0);
   } catch (err) {
       console.log(err);
       process.exit(1);
   }
}

start();