import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose'


const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
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
    phone: Number,
    address: String,
    relationship: String,
    admin: Boolean,
});

userSchema.pre(
    "save",
    async function(next){
        const user = this 

        if(!user.isModified('password')) 
            return next();

        try {
            const salt = await bcryptjs.genSalt( 10 );
            user.password = await bcryptjs.hash(user.password, salt); 
            next();
        } catch (error) {
            console.log(error);
            throw new Error("Fallo el hash del Password...");
        }
    }
);

userSchema.methods.comparePassword = async function(passedPassword) {
    return await bcryptjs.compare(passedPassword, this.password);
};


export const User = mongoose.model("User", userSchema);