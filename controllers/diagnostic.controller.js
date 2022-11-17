import { Answer } from "../models/Answer.js";
import { Diagnostic } from "../models/Diagnostic.js";
import { Test } from "../models/Test.js";


//* DIAGNOSTICO DEL TEST EFECTUADO
export const getDiagnosticTest = async (req, res) => {
    try {
        const id = req.params.id;
        const test = await Test.find({ _id: id });
        //const {diagnosticPred} = test.resultToEvaluate;
        const answers = await Answer.find({ tId: id});

        var countValue = 0;
        var diagnosticResult = "";
        answers.forEach(element => {
            if(element.valueQuestion === false){
                countValue = countValue + 1;                
            }                
        });

        //const resultTest = test[0].resultToEvaluate[0];
        //const valuesResult = Object.keys(resultTest)

        if(countValue < 3){
            diagnosticResult = "Bajo riesgo de autismo"
        }
        else if(countValue > 2 && countValue < 8){
            diagnosticResult = "Medio riesgo de autismo"
        }
        else{
            diagnosticResult = "Alto riesgo de autismo"
        }

        /*valuesResult.forEach(elementValue => {
            console.log(parseInt(countValue));
            console.log(parseInt(elementValue));
            console.log(3>5)
            if(parseInt(countValue) <= parseInt(elementValue)){
                diagnostic = resultTest[elementValue]
            }                
            else if(parseInt(countValue) > parseInt(elementValue)){
                diagnostic = resultTest[elementValue]
            }    
        });  */      

        console.log(req.uId)
        const diagnostic = new  Diagnostic({diagnostic: diagnosticResult, uId: req.uId, tId: id});
        console.log(diagnostic)
        await diagnostic.save();

        return res.status(201).json({ diagnostic }); 
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }  
}