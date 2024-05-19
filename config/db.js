const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(()=>{
        console.log('MongoDB connected....');
    }).catch((err)=>{
        console.log("Error while connecting to Database...", err);
    })
