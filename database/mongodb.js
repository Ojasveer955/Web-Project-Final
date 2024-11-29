const mongoose = require("mongoose");

require("dotenv").config();

const DBConnect = async () => {
    try{
        await mongoose.connect(process.env.mongodbURL);
        console.log("Connected to MongoDB");
        }
    catch (error){
        console.error("MongoDB connection error:", error);
    }
}

module.exports = DBConnect;