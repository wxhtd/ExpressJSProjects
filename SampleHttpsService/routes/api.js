import express from 'express'
import axios from 'axios'
import 'dotenv/config'
import { GITHUB_API_URL, GITHUB_ACCESS_TOKEN } from '../settings.js'

export const api = express.Router()
api.use(express.json())

const getConfig = async () => {
    try {
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': GITHUB_ACCESS_TOKEN
            },
        })
        const jsonData = response.data
        return jsonData
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching the JSON file')
    }
}

const getValuesByKeys = (config, keys) => {
    const keyPaths = keys.map(key => key.split('.')); // Split keys into parts for nested objects
    let results = [];

    keyPaths.forEach(path => {
        let currentObject = config;
        let found = true;
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (part in currentObject) {
                currentObject = currentObject[part];
            } else {
                found = false;
                break;
            }
        }

        if (found) {
            results.push(`${path.join('.')} is ${currentObject}`);
        }
    });

    return results;
}

//Get json config file from GitHub
api.get('/fetch-config', async (req, res) => {
    const data = await getConfig()
    res.json(data)
})

//Fetch particular config by filter criteria
//Expected request payload: 
//{
//  'filter':[key1, key2, ...]
//}
api.post('/filter-config', async (req, res) => {
    try {
        const { filter } = req.body
        console.log('filters = ', filter)
        if (filter === undefined) {
            console.log('Cannot find filter in request')
            res.json('Cannot find filter in request')
            return
        }
        const data = await getConfig()
        const filteredData = getValuesByKeys(data, filter)
        res.json(filteredData)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error processing the request')
    }
})