import { PermissionLogic } from '../../../logic/models/user'

import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

const formatter = wrapper(PermissionLogic)

type status = {
    next: boolean
    continue: boolean
}

export class PermissionController {
    @ahandler
    @formatter
    static async removePermission(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async getPermission(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async addPermission(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
