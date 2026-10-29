"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("./../DataAccess");
const data_1 = require("./data");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class ProductModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            productId: { type: Number, required: true },
            productCategory: { type: String, required: true },
            productCategoryId: { type: Number, required: true },
            price: { type: Number, required: true },
            location: { type: String, required: true },
            latestChange: { type: String, required: true }
        });
    }
    createModel() {
        this.model = mongooseConnection.model("Products", this.schema);
    }
    retrieveAllProducts(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            if (err) {
                console.error("Error while retrieving products:", err);
                response.status(500).json({ error: "An error occurred while retrieving products" });
            }
            else {
                response.json(itemArray);
            }
        });
    }
    retrieveProductCount(response) {
        console.log("retrieve Product Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfProducts) => {
            if (err) {
                console.error("Error while retrieving product count:", err);
                response.status(500).json({ error: "An error occurred while retrieving product count" });
            }
            else {
                console.log("numberOfProducts: " + numberOfProducts);
                response.json(numberOfProducts);
            }
        });
    }
    retrieveProductWithId(request, response) {
        let productId;
        productId = request.params.id;
        var query = this.model.find({ _id: productId });
        query.exec((err, product) => {
            if (err) {
                console.error("Error while retrieving product with the given id:", err);
                response.status(500).json({ error: "An error occurred while retrieving product with the given id" });
            }
            else {
                console.log("The product is: " + product);
                response.json(product);
            }
        });
    }
    addMockData() {
        this.model.insertMany(data_1.products);
    }
    addNewProduct(product, response) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield newProduct.save();
            response.json("Yes");
        });
    }
}
exports.ProductModel = ProductModel;
