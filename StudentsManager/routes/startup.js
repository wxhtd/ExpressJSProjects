const express = require('express')

const startup = express.Router()

startup.get('/', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.header('User-Agent');
    res.send(`Welcome to student center\nuser ip: ${userIp}\nuser device: ${userDevice}`)
})

module.exports = startup