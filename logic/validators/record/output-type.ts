import Joi from 'joi'
import { recordRequired } from './common'

export const createRecord = recordRequired

export const updateRecord = Joi.boolean()

export const getRecord = recordRequired

export const deleteRecord = Joi.boolean()
