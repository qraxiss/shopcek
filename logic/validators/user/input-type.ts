import Joi from 'joi'
import { authUser, user, base, query, jwtToken } from '../user/common'

export const register = base.keys({
    body: authUser.required(),
    query: query.forbidden(),
    user: user.forbidden()
})

export const login = base.keys({
    body: Joi.alternatives(authUser, jwtToken),
    query: query.forbidden(),
    user: user.forbidden()
})

export const logout = base.keys({
    user: user.required(),
    query: query.forbidden(),
    body: authUser.forbidden()
})

export const getPermission = base.keys({
    query: query.required()
})

export const addPermission = base.keys({
    user: user.required(),
    query: query
        .keys({
            permissionPath: Joi.array().items(Joi.string())
        })
        .required(),
    body: Joi.object({
        permission: Joi.any().required()
    }).required()
})

export const removePermission = base.keys({
    user: user.required(),
    query: query
        .keys({
            permissionPath: Joi.array().items(Joi.string()).required()
        })
        .required()
})
