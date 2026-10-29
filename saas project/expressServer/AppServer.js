"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const port = 8080;
let server = new App_1.App().express;
server.listen(port);
console.log("server running on port " + port);
