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
       const hash = await bcrypt.hash(password, salt)

       const doc = new UserModel({
           email: req.body.email,
           fullName: req.body.fullName,
           hash,
           avatarUrl: req.body.avatarUrl,

       })

       const user = await doc.save()

       const token = jwt.sign({
           id: user._id
            },
           "secret123",
           {
               expiresIn: '30d'
           }
           )

       const {passwordHash, ...userData} = user._doc

       res.json({
           ...user._doc,
           token
       })
   }catch (err){
       console.log(err)
       res.status(500).json({
           message:"Nu sa primit sa va conectati"
       })
   }

})

app.post('/auth/login',async (req, res)=>{
    try{
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({
                message: "User nu a fost gasit"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json({
                message: "Parola sau Login gresit"
            })
        }
        const token = jwt.sign({
                id: user._id
            },
            "secret123",
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...user._doc,
            token
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message:"Nu sa primit sa va autendificati"
        })
    }
})

app.listen(3000, (err)=>{
    if(err)
    {
        return console.log(err)
    }

    console.log('Server OK')
})
