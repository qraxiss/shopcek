import Joi from 'joi'
import { record } from './common'

export const createRecord = record

export const updateRecord = Joi.boolean()

export const getRecord = record

export const getRecords = Joi.array().items(record)

export const deleteRecord = Joi.boolean()
