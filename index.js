const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const admin =   {
    email: "admin@crms.com",
    password: "admin"
}

const token = "SuperSecretToken";

const users = []

app.post("/admin/login",(req,res)=>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(404)
        res.send("Bad Request")
    }

    if((email === admin.email) && (password===admin.password)){
        res.json({
            token: token
        })
    }

    res.status(401)
    res.send("Unauthorized")
})

app.get('/', (req, res) => {
  res.send('Welcome to CRMS')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})