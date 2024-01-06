import { RecordLogic } from '../../logic/models/record/crud'
import { ahandler, formatter as wrapper } from 'backend-helper-kit'
import { Response, Request, NextFunction } from 'express'

type status = {
    continue: boolean
    next: boolean
}

const formatter = wrapper(RecordLogic)

export class RecordController {
    @ahandler
    @formatter
    static async createRecord(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async getRecord(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async updateRecord(req: Request, res: Response, next: NextFunction): Promise<status | void> {}

    @ahandler
    @formatter
    static async deleteRecord(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
