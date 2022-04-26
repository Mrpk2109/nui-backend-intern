const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json')


app.get('/',(req ,res)=>{
    res.json(data)
})


app.post('/',(req,res)=>{
    const user = req.body
    data.push(user)
    res.json(data)
})

app.put('/:id',(req,res)=>{
    data.findByIdAndUpdate
    req.params.id,
    {
        $set: req.body
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })