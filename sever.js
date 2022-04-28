const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json')
const querystring = require('querystring')
app.use(express.json());



app.get('/',(req ,res)=>{
    console.log(JSON.stringify(req.headers));
    console.log('id: ' + req.query.id);
    res.json(data)
}); 


app.post('/',(req,res)=>{
    const user = req.body
    data.push(user)
    res.json(data)
})



app.put('/:id', (req, res) => {
    const updateIndex = data.findIndex(data => data.id === req.params.id)
    res.json(Object.assign(data[updateIndex], req.body))
  })

app.delete('/:id', (req, res) => {
    const deleteIndex = data.findIndex(data => data.id === req.params.id)
    data.splice(deleteIndex, 1)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })