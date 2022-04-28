"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const data = require('./data.json');
const querystring = require('querystring');
app.use(express_1.default.json());
app.get('/', (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log('id: ' + req.query.id);
    res.json(data);
});
app.post('/', (req, res) => {
    const user = req.body;
    data.push(user);
    res.json(data);
});
app.put('/:id', (req, res) => {
    const updateIndex = data.findIndex((data) => data.id === req.params.id);
    res.json(Object.assign(data[updateIndex], req.body));
});
app.delete('/:id', (req, res) => {
    const deleteIndex = data.findIndex((data) => data.id === req.params.id);
    data.splice(deleteIndex, 1);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
