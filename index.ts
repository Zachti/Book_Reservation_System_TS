import bodyParser = require("body-parser");
import express = require("express");
import Logger from "./utils/logger";
import { BooksInventory } from "./storage/booksInventory";
import { CustomerController } from "./controllers/customerController";
import { AdminController } from "./controllers/adminController";
import { CustomerRoutesHandler } from "./routes/customerRoutesHandler";
import { AdminRoutesHandler } from "./routes/adminRoutesHandler";


const app = express();
app.use(bodyParser.json());

const logger = new Logger();
const booksInventory = new BooksInventory();
const customerController = new CustomerController(booksInventory, logger);
const adminController = new AdminController(booksInventory, logger);
const customerRouter = new CustomerRoutesHandler(customerController).Router;
const adminRouter = new AdminRoutesHandler(adminController).Router;

app.use('/', customerRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});
