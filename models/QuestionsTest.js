import mongoose from 'mongoose'

const {Schema, model} = mongoose;

const questionSchema = new Schema({
    description:  {
        type: String,
        require: true
    },
    question: { 
        type : Array , "default" : [true, false] 
    },
    tId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    }
});


export const QuestionsTest = mongoose.model("QuestionsTest", questionSchema);