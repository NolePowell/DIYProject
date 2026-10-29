"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const ProductModel_1 = require("../Model/ProductModel");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.productModel = new ProductModel_1.ProductModel();
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res) => {
            this.productModel.addMockData();
        });
        router.get('/products', (req, res) => {
            this.productModel.retrieveAllProducts(res);
        });
        router.get('/product/:id', (req, res) => {
            this.productModel.retrieveProductWithId(req, res);
        });
        router.post('/add', (req, res) => {
            let product;
            product = req.body;
            this.productModel.addNewProduct(product, res);
        });
        this.express.use(router);
    }
}
exports.App = App;
