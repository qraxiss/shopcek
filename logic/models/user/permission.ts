import * as inputTypes from '../../types/user/input-type'
import * as outputTypes from '../../types/user/output-type'
import * as commonTypes from '../../types/user/common'

import * as inputValidators from '../../validators/user/input-type'
import * as outputValidators from '../../validators/user/output-type'

import { deleteId, avalidator as wrapper, ErrorHelper } from 'backend-helper-kit'

import { config } from '../../../config'
import { UserModel } from '../../../database/models/user'

// import { UserModel } from '../../../database/models/user'

const errorHelper = new ErrorHelper(__filename)

const avalidator = wrapper(inputValidators, outputValidators, config)

function isEmpty(obj: any) {
    if (obj) {
        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false
            }
        }
        return true
    }

    return false
}

export class PermissionLogic {
    @avalidator
    static async addPermission(params: inputTypes.addPermission): Promise<outputTypes.addPermission | void> {
        let permissions = await PermissionLogic.getPermission({ query: { username: params.user.username } })

        // add permission
        if (params.query.permissionPath) {
            let temp = permissions
            var pathGlobal: string = ''
            params.query.permissionPath!.forEach((path: string): void => {
                if (isEmpty(temp)) {
                    throw new Error('Permission not found!')
                }

                console.log(temp)
                if (!isEmpty(temp[path])) {
                    temp = temp[path]
                }

                pathGlobal = path
            })

            temp[pathGlobal] = { ...params.body, ...temp[pathGlobal] }
        } else {
            permissions = { ...params.body.permission, ...permissions }
        }

        // save permission
        let result = await UserModel.updateOne({ username: params.user.username }, { permissions: permissions })

        errorHelper.createError({
            result,
            name: 'Permission'
        })

        return result
    }

    @avalidator
    static async removePermission(params: inputTypes.removePermission): Promise<outputTypes.removePermission | void> {
        let permissions = await PermissionLogic.getPermission({ query: { username: params.user.username } })

        // delete permission
        let temp = permissions
        var pathGlobal: string = ''
        params.query.permissionPath!.forEach((path: string): void => {
            if (isEmpty(temp)) {
                throw new Error('Permission not found!')
            }

            console.log(temp)
            if (!isEmpty(temp[path])) {
                temp = temp[path]
            }

            pathGlobal = path
        })

        let deletedPart = JSON.parse(JSON.stringify(temp[pathGlobal]))
        delete temp[pathGlobal]

        // save permission
        let result = await UserModel.updateOne({ username: params.user.username }, { permissions: permissions })

        errorHelper.createError({
            result,
            name: 'Permission'
        })

        return deletedPart
    }

    @avalidator
    @deleteId
    static async getPermission(params: inputTypes.getPermission): Promise<outputTypes.getPermission> {
        let permissions = await UserModel.findOne({ username: params.query.username })

        errorHelper.getError({
            result: permissions,
            name: 'User'
        })

        if (!permissions!.permissions) {
            throw new Error('There is no permission for this user!')
        }

        return permissions?.permissions
    }

    static checkPermission(requires: string[], user: commonTypes.user): boolean {
        let permissions = user.permissions

        if (requires.length === 0 && isEmpty(permissions)) {
            return true
        }

        let result = true
        let temp = permissions

        for (let require in requires) {
            require = requires[require] as string

            if (!temp[require]) {
                result = false
                break
            }

            temp = temp[require]
        }

        return result
    }
}
