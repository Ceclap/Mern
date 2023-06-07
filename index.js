import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import {validationResult} from 'express-validator'
import {registerValidator} from "./validations/auth.js"

import UserModel from "./models/users.js"

mongoose.connect('mongodb+srv://cecleavictor:T1fEwF0cPXJBw3dI@cluster0.yjovoqs.mongodb.net/body?retryWrites=true&w=majority')
    .then(()=>console.log("DB OK"))
    .catch(()=> console.log("DB ERROR"))

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('HelloWorld')
})

app.post('/auth/register',registerValidator,async (req, res) => {
   try{
       const errors = validationResult(req)
       if (!errors.isEmpty()) {
           return res.status(400).json(errors.array())
       }

       const password = req.body.password
       const salt = await bcrypt.genSalt(10);
       const passwordHash = await bcrypt.hash(password, salt)

       const doc = new UserModel({
           email: req.body.email,
           fullName: req.body.fullName,
           passwordHash,
           avatarUrl: req.body.avatarUrl,

       })

       const user = await doc.save()


       res.json(user)
   }catch (err){
       console.log(err)
       res.status(500).json({
           message:"Nu sa primit sa va conectati"
       })
   }

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
