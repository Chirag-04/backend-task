import express from 'express';
import dotenv from 'dotenv'
import mongoose , {Schema} from 'mongoose';
import connectDb from './db/connnection.js'
import demoModel from './db/models/demoModel.js';
dotenv.config();

const app = express();
connectDb();
const port = process.env.PORT;
// middlewares
app.use(express.json())

// test route 
app.get('/' , async(req ,res)=>{
    res.json({msg : "Working fine"});
})

// milestone 1
app.get('/api/getQuestions' , async(req,res)=>{
    try{
        const allQuestions = await demoModel.find({});
        console.log(allQuestions);
        res.status(200).json(allQuestions);
    }catch(err){
        console.log(err);
        res.status(500).json({msg : "server error"});
    }
})

// milestone 2
function cleanInput(str) {
    let cleaned = str.replace(/<[^>]*>/g, '');
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}
app.post('/api/postQuestions' , async(req , res)=>{
    const question = req.body;
    try{
        if(question.questionName.length == 0){
            return res.status(400).json({msg : "Question is empty"});
        }

        if(question.questionName.length >=500){
            return res.status(400).json({msg : "you have exceeded the limit"});
        }
        const updatedQuestion =  cleanInput(question.questionName);

        const updatedAnswer =  cleanInput(question.answer);
        const newQuestion =  new demoModel({
            "questionName" : updatedQuestion,
            "answer" : updatedAnswer,
        });
        console.log(updatedQuestion);
        console.log(updatedAnswer);
        await newQuestion.save();
        res.status(200).json({msg : "post question route working fine"});
    }catch(err){
        console.log("Error in post question api" , err);
        res.status(500).json({msg : "server error"});
    }
})
// listen 
app.listen(port ,()=>{
    console.log(`server is running at ${port}`)
})