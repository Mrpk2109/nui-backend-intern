import express,{Request , Response} from 'express'
import { query } from 'express'

const app = express()
const port = 3000
app.use(express.json());

const data = [
    {
        "id" : "1",
        "name" : "Panuphong",
        "description" : "I'm Intern",
        "image" : "isgsdf"
    }]

app.get('/',(req:Request ,res:Response)=>{
    console.log(JSON.stringify(req.headers));
    console.log('id: ' + req.query.id);
    res.json(data)
    res.status(200).send("Success")
}); 


app.post('/',(req:Request ,res:Response)=>{
    const user = req.body
    data.push(user)
    res.json(data)
    res.status(201).send("Create new respone");
})

app.put('/:id', (req:Request ,res:Response) => {
    const updateIndex = data.findIndex((data: { id: string }) => data.id === req.params.id)
    //res.json(Object.assign(data[updateIndex], req.body))
    res.status(200).send("Input and update success");
  })


app.delete('/:id', (req:Request ,res:Response) => {
    const deleteIndex = data.findIndex((data: { id: string }) => data.id === req.params.id)
    data.splice(deleteIndex, 1)
    res.status(200).send("Delete success");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })