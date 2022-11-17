
import { Test } from "../models/Test.js";
import { Answer } from "../models/Answer.js";
import { QuestionsTest } from "../models/QuestionsTest.js";
import mongoose from "mongoose";

//* OBTIENE LAS RESPUESTAS DE UN TEST DETERMINADO
export const getAnswersTest = async (req, res) => {
    try {
        const {id} = req.params;
        const test = await Test.find({ _id: id });

        if(!test)
            return res.status(404).json({error: "No existe el test..."});

        const answers = await Answer.find({ tId: id});
        console.log({answers});

        return res.status(201).json({ answers });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//* RESPUESTA A UNA PREGUNTA DE UN TEST DETERMINADO
export const getAnswerTest = async (req, res) => {
    try {
        const {id, qId} = req.params;
        const {valueQuestion} = req.body;
        const test = await Test.findById({ _id: id });

        if(!test)
            return res.status(404).json({error: "No existe el test..."});

        const answer = new Answer({valueQuestion: valueQuestion, uId: req.uId, qId: qId});
        const newAnswer = await answer.save();
        //console.log(newAnswer);

        return res.status(201).json({ newAnswer });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//TODO ACTUALIZA UNA RESPUESTA SELECCIONADA
export const updateAnswer = async (req, res) => {
    try {
        const {id} = req.params;
        const {valueQuestion} = req.body;

        const answerExist = await Answer.findById(mongoose.Types.ObjectId(id.trim()));

        if(!answerExist)
            return res.status(404).json({error: "No existe la respuesta"});

        //? ACTUALIZACION DE LA RESPUESTA
        answerExist.valueQuestion = valueQuestion;
        await answerExist.save();

        return res.status(201).json({ answerExist });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

