import express from 'express'
import https from 'https'
import cors from 'cors'

import {readFileSync} from 'fs'
import {startup} from './routes/startup.js'
import {api} from './routes/api.js'
import {getLoggerInstance} from './logger.js'

const logger = getLoggerInstance()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/', startup)
app.use('/api/', api)

const httpsOptions = {
    key: readFileSync('./ssl/key.key'),
    cert: readFileSync('./ssl/cert.crt')
}
const server = https.createServer(httpsOptions, app)

server.listen(8000, () => {
    logger.info('app is running')
})