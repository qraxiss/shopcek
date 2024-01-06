import Joi from 'joi'

export const authUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const user = Joi.object({
    username: Joi.string().required(),
    permissions: Joi.any().default({})
})

export const jwtToken = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)

export const query = Joi.object({
    username: Joi.string()
})

export const body = Joi.alternatives(authUser, Joi.object({}))

export const base = Joi.object({
    query,
    body,
    user
})
