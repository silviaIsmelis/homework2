import { Test } from "../models/Test.js";
import { QuestionsTest } from "../models/QuestionsTest.js";
import mongoose from "mongoose";


//* OBTIENE LAS PREGUNTAS DE UN TEST DETERMINADO
export const getQuestionsTest = async (req, res) => {
    try {
        const {id} = req.params;
        const test = await Test.find({ _id: id });

        if(!test)
            return res.status(404).json({error: "No existe el test..."});

        const questions = await QuestionsTest.find({ tId: id});
        console.log(questions);

        return res.status(201).json({ questions });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//? CREAR PREGUNTAS DE UN TEST
export const createQuestionTest = async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        
        const questionExist = await QuestionsTest.findOne({description});
        if(questionExist) return res.json({error: "Ya existe una Pregunta con esa descripcion..."});

        const question = new QuestionsTest({description: description, tId: id});
        await question.save();

        return res.status(201).json({ question });    
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    }  
};


//TODO ACTUALIZA UNA PREGUNTA SELECCIONADO
export const updateQuestion = async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;

        const questionExist = await QuestionsTest.findById(mongoose.Types.ObjectId(id.trim()));

        if(!questionExist)
            return res.status(404).json({error: "No existe la pregunta"});

        //? ACTUALIZACION DE LA PREGUNTA
        questionExist.description = description;
        await questionExist.save();

        return res.status(201).json({ questionExist });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//! ELIMINA UNA PREGUNTA DE UN TEST
export const removeQuestion = async (req, res) => {
    try {
        const {id} = req.params;
        const questionExist = await QuestionsTest.findById(mongoose.Types.ObjectId(id.trim()));

        if(!questionExist)
            return res.status(404).json({error: "No existe el link"});

        await questionExist.remove();

        return res.status(201).json({ questionExist });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};