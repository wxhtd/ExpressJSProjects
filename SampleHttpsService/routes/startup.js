import express from 'express';
import {getLoggerInstance} from '../logger.js'

const logger = getLoggerInstance()
export const startup = express.Router();

startup.get('/', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')
    res.send(`This is a sample https web application\nuser ip: ${userIp}\nuser device: ${userDevice}`)
});