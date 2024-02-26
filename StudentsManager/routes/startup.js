const express = require('express')

const startup = express.Router()

startup.get('/', (req, resp)=>{
    resp.statusCode = 200;
    resp.setHeader('Content-Type','text/plain');
    console.log('default route visited');
    resp.send('Welcome to student info manager');
})

module.exports = startup