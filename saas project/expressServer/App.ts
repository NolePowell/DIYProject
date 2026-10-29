import * as path from 'path';
import * as express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import { DataAccess } from '../DataAccess';
import { ProductModel } from '../Model/ProductModel';


class App {
    public express: express.Application;
    private productModel: ProductModel;
    

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
        this.productModel = new ProductModel();
    }

    private middleware(): void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false}));
    }
    private routes(): void{


        
        

        let router = express.Router();
        router.get('/',(req, res)=>{
            this.productModel.addMockData();
            res.send("Mock data is added into db !");

        })
        router.get('/products', (req, res) => {
            this.productModel.retrieveAllProducts(res);        
                              
            
                   
            

        })


        router.get('/product/:id', (req, res) => {
       
            this.productModel.retrieveProductWithId(req, res);
        })

        router.post('/add', (req, res) => {
            let product;
            product = req.body
            this.productModel.addNewProduct(product, res);

        })
        this.express.use(router);
    }
}


export { App };