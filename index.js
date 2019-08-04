const express = require('express');
const Sequelize = require('sequelize');
const config = require('./config.json');

const app = express();
const context = require('./db/db')(Sequelize, config);

let port = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.json({date: Date.now()});
})

app.all('/api', (req, res) => {

})

app.get('/api/notes', getNotes);
app.post('/api/notes', createNote)

async function getNotes(req, res){
    let id = req.query.id || 0;
    let result = await context.note.findAll({
        where: {
            author_id: id
        }
    });
    if (req.query.category){
        result = result.filter((note) => note.categoryId == req.query.category);
    }
    res.json({result});
}

async function createNote(req,res){
    let note = req.body;
    if (!isValid(note)){
        res.json({message: "Note is not valid"});
        return;
    }
    note.categoryId = note.categoryId || 1;
    let result = await context.note.create(note);
    if (result){
        res.json({id: result.id, message: "Note was created"})
    } else {
        res.json({message: "Note wasn't created"})
    }
}

function isValid(note){
    return note.title && note.text && note.author_id;
}

app.listen(port, () => {
    console.log("server is started")
})