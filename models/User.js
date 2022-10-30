import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        require: true,
        trim: true,
        index: { unique: true },
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
});


export const User = model("user", userSchema);