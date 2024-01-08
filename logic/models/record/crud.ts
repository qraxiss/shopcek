import * as inputTypes from '../../types/record/input-type'
import * as outputTypes from '../../types/record/output-type'

import * as inputValidators from '../../validators/record/input-type'
import * as outputValidators from '../../validators/record/output-type'

import { avalidator as wrapper, ErrorHelper } from 'backend-helper-kit'

import { config } from '../../../config'
import { RecordModel } from '../../../database/models/record'

// import * as validators from '../../validators/record/common'

const avalidator = wrapper(inputValidators, outputValidators, config)
const errorHelper = new ErrorHelper('Record')

export class RecordLogic {
    static async createRecord(params: inputTypes.createRecord): Promise<outputTypes.createRecord> {
        let result = await RecordModel.create(params.body)

        errorHelper.createError({
            result
        })

        return result.toObject()
    }

    static async getRecord(params: inputTypes.getRecord): Promise<outputTypes.getRecord> {
        let result = await RecordModel.findOne(params.query)

        errorHelper.getError({
            result
        })

        return result?.toObject()!
    }

    @avalidator
    static async getRecords(params: inputTypes.getRecords): Promise<outputTypes.getRecords> {
        let result = await RecordModel.find(params.query)

        errorHelper.getAllError({
            result
        })

        return result.map((item) => item.toObject())
    }

    @avalidator
    static async updateRecord(params: inputTypes.updateRecord): Promise<outputTypes.updateRecord> {
        let result = await RecordModel.updateOne(params.query, params.body)

        errorHelper.updateError({
            result
        })

        return !!result
    }

    @avalidator
    static async deleteRecord(params: inputTypes.deleteRecord): Promise<outputTypes.deleteRecord> {
        let result = await RecordModel.deleteOne(params.query)

        errorHelper.deleteError({
            result
        })

        return !!result
    }

    static async getLastRecord() {
        return await RecordModel.findOne().sort({ id: -1 })
    }
}
