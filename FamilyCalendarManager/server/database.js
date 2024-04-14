import { MongoClient } from "mongodb"

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_NAME}.1dm0j52.mongodb.net/`

let dbClient
export async function connectToDB() {
    try {
        const client = new MongoClient(uri)
        await client.connect()
        dbClient = client.db('CalendarManager')
        console.log('connect to db')
    }
    catch (error) {
        console.error(error)
    }
}

export function getDB() {
    return dbClient
}