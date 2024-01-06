import { AuthLogic } from '../../../logic/models/user'

import { ahandler, SessionError, returnFormatter } from 'backend-helper-kit'

import { Response, Request, NextFunction } from 'express'

type status = {
    continue: boolean
    next: boolean
}

export class AuthController {
    @ahandler
    static async register(req: Request, res: Response, next: NextFunction): Promise<status | void> {
        if (req.session.user) throw new SessionError('User already logged in')

        if (!(await AuthLogic.register({ body: req.body }))) next()

        req.session.user = await AuthLogic.getUser(req.body.username)
        res.json(returnFormatter({ data: !!req.session.user }))
    }

    @ahandler
    static async login(req: Request, res: Response, next: NextFunction): Promise<status | void> {
        if (req.session.user) throw new SessionError('User already logged in')

        if (await AuthLogic.login({ body: req.body })) req.session.user = await AuthLogic.getUser(req.body.username)

        res.json(returnFormatter({ data: !!req.session.user }))
    }

    @ahandler
    static async logout(req: Request, res: Response): Promise<status | void> {
        if (!req.session.user) throw new SessionError('User not logged in')

        req.session.destroy((err: Error): void => {
            if (err) {
                throw err
            }
        })

        res.json(returnFormatter({ data: !!req.session.user }))
    }

    @ahandler
    static async check(req: Request, res: Response): Promise<void> {
        res.json(returnFormatter({ data: !!req.session.user }))
    }
}
