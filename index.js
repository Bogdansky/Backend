const express = require('express');
const Sequelize = require('sequelize');
const config = require('./config.json');

const app = express();
const context = require('./db/db')(Sequelize, config);

app.all('/api', (req, res) => {

})

app.get('/api/notes', getNotes)

function getNotes(req, res){
    let id = req.query.id || 0;
}