import express from 'express'
import https from 'https'
import {readFileSync} from 'fs'
import {startup} from './routes/startup.js'
import {students} from './routes/students.js'

const app = express()
app.use(express.json())
app.use('/', startup)
app.use('/students/', students)

const httpsOptions = {
    key: readFileSync('./ssl/key.key'),
    cert: readFileSync('./ssl/cert.crt')
}
const server = https.createServer(httpsOptions, app)

server.listen(8000, () => {
    console.log('app is running')
})