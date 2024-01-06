import Joi from 'joi'

export const register = Joi.boolean()

export const login = Joi.boolean()

export const logout = Joi.boolean()

export const getPermission = Joi.any()

export const addPermission = Joi.any()

export const removePermission = Joi.any()
