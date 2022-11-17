import mongoose from 'mongoose'

const {Schema, model} = mongoose;

const diagnosticSchema = new Schema({
    diagnostic: { 
        type : String 
    },
    dateEmited: { 
        type: Date, default: Date.now 
    },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    }
    
});

export const Diagnostic = mongoose.model("Diagnostic", diagnosticSchema);