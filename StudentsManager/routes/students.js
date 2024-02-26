const express = require('express')
const fs = require('fs')

const students = express.Router()

students.get('/students', (req, resp)=>{
    try{
        const info = fs.readFileSync('./data/student-info.json')
        resp.statusCode = 200;
        resp.setHeader('Content-Type','text/plain');
        console.log('Get students visited');
        resp.send(`Here are all the student information:\n${info}`);
    }
    catch(ex){
        resp.statusCode = 500;
        resp.setHeader('Content-Type','text/plain');
        console.log('Get students visited but failed');
        resp.send(`Error occurred when getting student information:\n${ex}`);
    }    
})

module.exports = students