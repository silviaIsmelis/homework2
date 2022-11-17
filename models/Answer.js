import mongoose from 'mongoose'

const {Schema, model} = mongoose;

const answerSchema = new Schema({
    valueQuestion: { 
        type : Boolean 
    },
    dateCreated: { 
        type: Date, default: Date.now 
    },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    qId: {
        type: Schema.Types.ObjectId,
        ref: "QuestionsTest",
        required: true,
    }
});


export const Answer = mongoose.model("Answer", answerSchema);