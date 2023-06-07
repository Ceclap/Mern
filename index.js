import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {validationResult} from 'express-validator'
import {registerValidator} from "./validations/auth.js"

mongoose.connect('mongodb+srv://cecleavictor:T1fEwF0cPXJBw3dI@cluster0.yjovoqs.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log("DB OK"))
    .catch(()=> console.log("DB ERROR"))

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('HelloWorld')
})

app.post('/auth/register',registerValidator,(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    res.json({
        succes:true,
    })
})


app.post('/auth/login',(req, res)=>{
    console.log(req.body)
    res.json({
        succes:true
    })
})

app.listen(3000, (err)=>{
    if(err)
    {
        return console.log(err)
    }

    console.log('Server OK')
})
