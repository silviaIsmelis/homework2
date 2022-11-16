import { Link } from "../models/Links.js";
import {nanoid} from "nanoid";
import mongoose from "mongoose";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({uId: req.uId});

        return res.json({links});    
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    }    
};

export const getLink = async (req, res) => {
    try {
        const {nanoLink} = req.params;
        const link = await Link.findOne({nanoLink});

        if(!link)
            return res.status(404).json({error: "No existe el link"});

        return res.status(201).json({ longLink: link.longLink });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

//? PARA LOS CRUD DE MI APP
export const getLinkCRUD = async (req, res) => {
    try {
        const {id} = req.params;
        const link = await Link.findById(mongoose.Types.ObjectId(id.trim()));

        if(!link)
            return res.status(404).json({error: "No existe el link"});

        if(!link.uId.equals(req.uId))
            return res.status(401).json({error: "No le pertenece el id"});

        return res.status(201).json({ link });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

export const createLinks = async (req, res) => {
    try {
        let {longLink} = req.body;
        if(!longLink.startsWith("https://")){
            longLink = "https://" + longLink;
            }

        const link = new Link({longLink, nanoLink: nanoid(6), uId: req.uId});
        const newLink = await link.save();

        return res.status(201).json({ newLink });    
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error de servidor..."});
    }  
};

export const removeLink = async (req, res) => {
    try {
        const {id} = req.params;
        const link = await Link.findById(mongoose.Types.ObjectId(id.trim()));

        if(!link)
            return res.status(404).json({error: "No existe el link"});

        if(!link.uId.equals(req.uId))
            return res.status(401).json({error: "No le pertenece el id"});

        await link.remove();

        return res.status(201).json({ link });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};

export const updateLink = async (req, res) => {
    try {
        const {id} = req.params;
        const {longLink} = req.body;

        console.log(longLink);

        if(!longLink.startsWith("https://")){
            longLink = "https://" + longLink;
            }

        const link = await Link.findById(mongoose.Types.ObjectId(id.trim()));

        if(!link)
            return res.status(404).json({error: "No existe el link"});

        if(!link.uId.equals(req.uId))
            return res.status(401).json({error: "No le pertenece el id"});

        //? ACTUALIZACION DEL LINK
        link.longLink = longLink;
        await link.save();

        return res.status(201).json({ link });    
    } catch (error) {
        //console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }    
};