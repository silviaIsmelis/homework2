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
        //var valuesResult = Object.keys(resultTest);
        //console.log(valuesResult);

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
            var compareV = parseInt(elementValue);
            if(countValue < compareV){
                diagnosticResult = resultTest[elementValue]
                console.log("entre");
            }  
            console.log(compareV)                
        }); */      

        //console.log(req.uId)
        const diagnostic = new  Diagnostic({diagnostic: diagnosticResult, uId: req.uId, tId: id});
        //console.log(diagnostic)
        await diagnostic.save();

        return res.status(201).json({ diagnostic }); 
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: "Formato del id incorrecto..."});
        }
        return res.status(500).json({error: "Error de servidor..."});
    }  
}