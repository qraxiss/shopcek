import * as inputTypes from '../../types/user/input-type'
import * as outputTypes from '../../types/user/output-type'
import * as commonTypes from '../../types/user/common'

import * as inputValidators from '../../validators/user/input-type'
import * as outputValidators from '../../validators/user/output-type'

import { ErrorHelper, avalidator as wrapper, validate, decode, deleteId, ForbiddenError } from 'backend-helper-kit'

import { UserModel } from '../../../database/models/user'
import { config } from '../../../config'

import bcrypt from 'bcrypt'

import * as validators from '../../validators/user/common'

const avalidator = wrapper(inputValidators, outputValidators, config)
const errorHelper = new ErrorHelper(__filename)

export class AuthLogic {
    @avalidator
    static async login(params: inputTypes.login): Promise<outputTypes.login> {
        if (typeof params.body === 'string' || params.body instanceof String) {
            throw new Error('JWT Login not implemented yet')
        }

        const { username, password } = params.body as commonTypes.authUser
        const user = await UserModel.findOne({ username })

        if (!user) {
            throw new ForbiddenError('Invalid username password')
        }

        const isPasswordValid = await bcrypt.compare(password, user!.password)

        if (!isPasswordValid) {
            throw new ForbiddenError('Invalid username or password')
        }

        return isPasswordValid
    }

    @avalidator
    static async register(params: inputTypes.register): Promise<outputTypes.register> {
        params.body.password = await bcrypt.hash(params.body.password, 10)
        let result = await UserModel.create(params.body)

        errorHelper.createError({
            result,
            text: 'Error while register user. Please try again later.'
        })

        return !!result
    }

    @deleteId
    static async getUser(username: string): Promise<commonTypes.user> {
        let user = await UserModel.findOne(
            { username },
            {
                password: 0
            }
        )

        errorHelper.getError({
            result: user,
            name: 'User'
        })
        return user!.toObject() as commonTypes.user
    }

    static getUserFromToken(token: string): commonTypes.user {
        return validate(decode(token, config.MODULE_KEY).data, validators.user)
    }
}
