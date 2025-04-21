require("dotenv").config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import userRoutes from '@routes/userRoutes';
import categoryRoute from  './src/routers/billsoftadmin/selling-product/category-route';
import subCategoryRoute from './src/routers/billsoftadmin/selling-product/subcategory-route';
import employeeRoute from './src/routers/billsoftadmin/employee/employee-route';
import productRoute from './src/routers/billsoftadmin/selling-product/product-route';
import franchiseRoute from './src/routers/billsoftadmin/franchise/franchise-route';
import brandRoute from './src/routers/billsoftadmin/selling-product/brand-route';
import unitRoute from './src/routers/billsoftadmin/masters/unit-route';
import allocateProductRoute from './src/routers/billsoftadmin/selling-product/allocate-product-route';
import rawproductRoute from './src/routers/billsoftadmin/raw-product/product-route';
import godownRoute from './src/routers/billsoftadmin/godown/godown-route';
import godownStockRoute from './src/routers/billsoftadmin/godown/godown-stock-route';
import transferStockRoute from './src/routers/billsoftadmin/godown/transfer-stock-route';
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(categoryRoute);
app.use(subCategoryRoute);
app.use(employeeRoute);
app.use(productRoute);
app.use(franchiseRoute);
app.use(brandRoute);
app.use(unitRoute);
app.use(allocateProductRoute);
app.use(rawproductRoute);
app.use(godownRoute);
app.use(godownStockRoute);
app.use(transferStockRoute);

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://43.205.240.13:5174', // Allow requests from this origin
 }));


 app.get("/", (req, res) => {
  res.send("Welcome to Kwickbill Developmenbt ");
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
