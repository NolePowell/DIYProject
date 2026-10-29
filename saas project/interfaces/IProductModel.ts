import Mongoose = require("mongoose");
interface IProductModel extends Mongoose.Document {
    name: string;
    description: string;
    productId: number;
    productCategory: string;
    productCategoryId: number;
    price: number;
    location: string;
    latestChange: string;
}
export {IProductModel};