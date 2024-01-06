import { validate } from 'backend-helper-kit'
import Joi from 'joi'

const name = 'template-ms'

type configType = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: string
    MODULE_KEY: string
    SESSION_SECRET: string
    ENV: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required()
})

export var config: configType = validate(
    {
        PORT: 8000,
        MONGO_CONNECTION: `mongodb://127.0.0.1:27017/${name}`,
        MODULE_KEY: '123',
        MODULE_NAME: name,
        SESSION_SECRET: '123',
        ENV: 'development'
    },
    configSchema
)

console.log(config)
