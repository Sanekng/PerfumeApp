const mongoose = require("mongoose");
const {MONGO_URI} = require("./config");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("hold up!...Connected!");
    } catch (error) {
        console.error("Oh noo...", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;