const mongoose = require('mongoose');




const connectDBC = async()=>{
    try {
        const ConDB = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Artisan DataBase is Connected");
        
    } catch (error) {
        console.log("Artisan Database is Disconnected");
    }

};




module.exports = connectDBC;