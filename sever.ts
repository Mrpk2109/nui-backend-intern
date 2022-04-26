const express = require('express')
const app = express()
const port = 3000
const data = []

app.get('/',(req ,res)=>{
    res.json(data)
})

app.post('/',(req,res)=>{
    data.push(res.body)
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })