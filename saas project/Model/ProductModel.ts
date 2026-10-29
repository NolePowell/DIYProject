import Mongoose = require("mongoose");
import { DataAccess } from './../DataAccess';
import { IProductModel } from '../interfaces/IProductModel';
import mongoose, { Document, Schema } from 'mongoose';
import { products } from "./data";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ProductModel {

    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }


    public createSchema(): void {
        this.schema = new Mongoose.Schema<IProductModel>(
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                productId: { type: Number, required: true },
                productCategory: { type: String, required: true },
                productCategoryId: { type: Number, required: true },
                price: { type: Number, required: true },
                location: { type: String, required: true },
                latestChange: { type: String, required: true }
            },
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IProductModel>("Products", this.schema);
    }

    public retrieveAllProducts(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            if (err) {
                console.error("Error while retrieving products:", err);
                response.status(500).json({ error: "An error occurred while retrieving products" });
            } else {
                response.json(itemArray);
            }
        }); 
    }

    public retrieveProductCount(response: any): any {
        console.log("retrieve Product Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfProducts) => {
            if (err) {
                console.error("Error while retrieving product count:", err);
                response.status(500).json({ error: "An error occurred while retrieving product count" });
            } else {
                console.log("numberOfProducts: " + numberOfProducts);
                response.json(numberOfProducts);
            }
        });

    }

    public retrieveProductWithId(request: any, response: any): any {
        let productId;
        productId = request.params.id;
        var query = this.model.find({ _id: productId });
        query.exec((err, product) => {
            if (err) {
                console.error("Error while retrieving product with the given id:", err);
                response.status(500).json({ error: "An error occurred while retrieving product with the given id" });
            } else {
                console.log("The product is: " + product);
                response.json(product);
            }
        });


    }

    public addMockData(){
        this.model.insertMany(products);

    }

    public async addNewProduct(product: any, response: any): Promise<any> {

        const newProduct = new this.model({
            name: product.name,
            description: product.description,
            productId: product.productId,
            productCategory: product.productCategory,
            productCategoryId: product.productCategoryId,
            price: product.price,
            location: product.location,
            latestChange: product.latestChange
        });

        await newProduct.save();

    }

}
export { ProductModel };