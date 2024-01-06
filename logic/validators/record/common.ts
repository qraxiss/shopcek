import Joi from 'joi'

export const recordRequired = Joi.object({
    hash: Joi.string().required(),
    status: Joi.string().valid('sended', 'pending', 'error').required()
})

export const record = Joi.object({
    hash: Joi.string(),
    status: Joi.string().valid('sended', 'pending', 'error')
})

export const base = Joi.object({
    query: Joi.any(),
    body: Joi.any()
})
