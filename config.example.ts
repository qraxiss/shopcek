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
    REMOTE_MYSQL: {
        host: string
        user: string
        password: string
        database: string
    }
    ZETA_CHAIN: {
        name: string
        path: string
        partnerKey: string
    }
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required(),
    REMOTE_MYSQL: Joi.object({
        host: Joi.string().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        database: Joi.string().required()
    }).required(),
    ZETA_CHAIN: Joi.object({
        name: Joi.string().required(),
        path: Joi.string().required(),
        partnerKey: Joi.string().required()
    }).required()
})

export var config: configType = validate(
    {
        PORT: 8000,
        MONGO_CONNECTION: `mongodb://127.0.0.1:27017/${name}`,
        MODULE_KEY: '123',
        MODULE_NAME: name,
        SESSION_SECRET: '123',
        ENV: 'development',
        REMOTE_MYSQL: {
            host: '',
            user: '',
            password: '',
            database: ''
        },
        ZETA_CHAIN: {
            name: '',
            path: '',
            partnerKey: ''
        }
    },
    configSchema
)

console.log(config)
