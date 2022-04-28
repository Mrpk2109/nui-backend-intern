import express,{Request , Response} from 'express'
import { query } from 'express'
import data,{id,name,description,image} from ("../nui-backend-intern");

const app = express()
const port = 3000
//const data = require('./data.json')
//const querystring = require('querystring')
app.use(express.json());



app.get('/',(req:Request ,res:Response)=>{
    console.log(JSON.stringify(req.headers));
    console.log('id: ' + req.query.id);
    res.json(data)
}); 


app.post('/',(req:Request ,res:Response)=>{
    const user = req.body
    data.push(user)
    res.json(data)
})



app.put('/:id', (req:Request ,res:Response) => {
    const updateIndex = data.findIndex((data: { id: string }) => data.id === req.params.id)
    res.json(Object.assign(data[updateIndex], req.body))
  })

app.delete('/:id', (req:Request ,res:Response) => {
    const deleteIndex = data.findIndex((data: { id: string }) => data.id === req.params.id)
    data.splice(deleteIndex, 1)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })