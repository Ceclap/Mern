import express from 'express'

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('HelloWorld')
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
