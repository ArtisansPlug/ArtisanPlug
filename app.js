require("dotenv").config();
const express = require("express");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require("./database/artisanDB");
const providerRouter = require('./router/artisanRouter');







const app = express();
connectDB();


const port = process.env.PORT || 6750



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());



app.use('/provider', providerRouter);






app.listen(port, ()=>{
    console.log(`Artisan Network is On Live @ http://localhost:${port}`);
})




