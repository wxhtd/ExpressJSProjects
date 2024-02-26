const express = require('express')
const https = require('https')
const fs = require('fs')
const startup = require('./routes/startup')
const students = require('./routes/students')

const app = express()
app.use(express.json())
app.use('/', startup)
app.use('/student-info/v1', students)

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.crt')
}
const server = https.createServer(httpsOptions, app)

server.listen(8080, () => {
    console.log('app is running')
})