import Joi from 'joi'

export const record = Joi.object({
    hash: Joi.string().required(),
    wallet: Joi.string().required(),
    userId: Joi.string().required(),
    optInId: Joi.string().required(),
    id: Joi.number().required()
})

export const recordNoRequire = Joi.object({
    hash: Joi.string(),
    wallet: Joi.string(),
    userId: Joi.string(),
    optInId: Joi.string(),
    id: Joi.number()
})

export const base = Joi.object({
    query: Joi.any(),
    body: Joi.any()
})
