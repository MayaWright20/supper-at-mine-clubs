import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    username: {
        type: String,
        unique: [true, "Username taken"],
        required: [true, "Please choose a username"]
    },
    email: {
        type: String,
        unique: [true, "Email already registed"],
        required: [true, "Please enter your email"],
        validator: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
        validator: [validator.isStrongPassword, "Too easy! Please enter a stronger password"],
        select: false
    }
});


export const User = mongoose.model("User", schema);
