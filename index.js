const express = require("express");
const userRoutes = require("./routes/user"); 
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
require('./config/db');

const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use('/api/v1', userRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
