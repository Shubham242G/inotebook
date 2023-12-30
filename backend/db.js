const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
module.exports.connect=()=>{
    
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('MongoDB connected successfully')
    }).catch((error)=> console.log('error: ',error))
}