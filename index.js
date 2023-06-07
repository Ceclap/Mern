import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://cecleavictor:T1fEwF0cPXJBw3dI@cluster0.yjovoqs.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log("DB OK"))
    .catch(()=> console.log("DB ERROR"))

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('HelloWorld')
})

app.post('/auth/login',(req, res)=>{

    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
            fullName: "Ceclea Victor"
    },
        'secret123'
    )


    res.json({
        succes:true,
        token
    })
})

app.listen(3000, (err)=>{
    if(err)
    {
        return console.log(err)
    }

    console.log('Server OK')
})
