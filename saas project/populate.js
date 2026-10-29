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
const mongoose_1 = require("mongoose");
mongoose_1.default.connect('mongodb+srv://nolepowell:ghbOqoX3NPqoGdvn@diyproject.fw33ryy.mongodb.net/DIYProject');
const db = mongoose_1.default.connection;
db.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("We're connected!");
    try {
        const products = [
            {
                name: "Hammer",
                description: "Hammer for nails",
                productId: 1,
                productCategory: "Hand tools",
                productCategoryId: 1,
                price: 23,
                location: "HomeDepot",
                latestChange: "04/21/2024 6:01 PM"
            },
            {
                name: "Nails",
                description: "Picture hanging nails",
                productId: 2,
                productCategory: "Nails and screws",
                productCategoryId: 2,
                price: 2,
                location: "Lowes",
                latestChange: "04/21/2024 6:01 PM"
            },
            {
                name: "Screws",
                description: "Screws for studs",
                productId: 3,
                productCategory: "Nails and screws",
                productCategoryId: 3,
                price: 3,
                location: "Ace hardware",
                latestChange: "04/21/2024 6:01 PM"
            }
        ];
        // await ProductModel.insertMany(products);
        console.log("Data added succesfully");
    }
    catch (error) {
        console.error("Error:", error);
    }
    finally {
        db.close();
    }
}));
