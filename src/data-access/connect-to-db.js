"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("Successfully connected to MongoDB");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
