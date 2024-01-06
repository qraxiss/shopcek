import Mongoose, { connection } from 'mongoose'
import { config } from '../config'

Mongoose.connect(config.MONGO_CONNECTION)
    .then(() => {
        console.log(`Connected to the database! ✅`)
    })
    .catch((error) => {
        console.log(`Error connecting to the database! ❌`)
        console.log(error.message)
    })

export { connection }
