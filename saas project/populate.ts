import mongoose from 'mongoose';
import { ProductModel } from './Model/ProductModel';
import { IProductModel } from './interfaces/IProductModel';
import exp = require('constants');

mongoose.connect('mongodb+srv://nolepowell:ghbOqoX3NPqoGdvn@diyproject.fw33ryy.mongodb.net/DIYProject');



const db = mongoose.connection;

db.once('open', async () => {
  console.log("We're connected!");
  try {

    
    // await ProductModel.insertMany(products);
    console.log("Data added succesfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    db.close();
  }
});
