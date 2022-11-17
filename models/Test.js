import mongoose from 'mongoose'

const {Schema, model} = mongoose;

const testSchema = new Schema({
    nameTest:  {
        type: String,
        require: true
    },
    resultToEvaluate: {
        type : Array , "default" : [{2: "Bajo riesgo de autismo", 7: "Medio riesgo de autismo", 20: "Alto riesgo de autismo"}]
    },
    dateCreated: { 
        type: Date, default: Date.now 
    },
    active: { 
        type: Boolean, default: true 
    },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});


export const Test = mongoose.model("Test", testSchema);