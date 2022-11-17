import { Test } from "../models/Test.js";
import mongoose from "mongoose";


//* LISTA TODOS LOS TESTS
export const getTests = async (req, res) => {
    try {
        const tests = await Test.find({uId: req.uId});

        return res.json({tests});    
    } catch (error) {
        res.status(500).json({error: "Error de servidor..."});
    }    
};

//* OBTIENE UN TEST DETERMINADO
export const getTest = async (req, res) => {
    try {
        const {id} = req.params;
        const test = await Test.findById(mongoose.Types.ObjectId(id.trim()));

        if(!test)
            return res.status(404).json({error: "No existe el test"});


        return res.status(201).json({ test });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//? CREAR UN TEST
export const createTest = async (req, res) => {
    try {
        const {nameTest} = req.body;
        //console.log(req.uId);

        const testExist = await Test.findOne({nameTest});
        if(testExist) return res.json({error: "Ya existe un Test con ese nombre..."});

        const test = new Test({nameTest, uId: req.uId});
        const newTest = await test.save();

        return res.status(201).json({ newTest });    
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    }  
};

//! ELIMINAR UN TEST DETERMINADO
export const removeTest = async (req, res) => {
    try {
        const {id} = req.params;
        const test = await Test.findById(mongoose.Types.ObjectId(id.trim()));

        if(!test)
            return res.status(404).json({error: "No existe el test"});

        test.active = false;
        await test.save();

        return res.status(201).json({ test });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//TODO ACTUALIZA UN TEST SELECCIONADO
export const updateTest = async (req, res) => {
    try {
        const {id} = req.params;
        const {nameTest} = req.body;

        const test = await Test.findById(mongoose.Types.ObjectId(id.trim()));

        if(!test)
            return res.status(404).json({error: "No existe el test"});

        //? ACTUALIZACION DEL TEST
        test.nameTest = nameTest;
        await test.save();

        return res.status(201).json({ test });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};