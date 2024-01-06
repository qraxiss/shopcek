import Joi from 'joi'
import { record, recordRequired, base } from './common'

export const createRecord = base.keys({
    body: recordRequired.required()
})

export const updateRecord = base.keys({
    body: record.required(),
    query: Joi.object({
        hash: Joi.string().required()
    }).required()
})

export const getRecord = base.keys({
    query: Joi.object({
        hash: Joi.string().required()
    }).required()
})

export const deleteRecord = getRecord
