import { record, recordNoRequire, base } from './common'

export const createRecord = base.keys({
    body: record.required()
})

export const updateRecord = base.keys({
    body: recordNoRequire.required(),
    query: recordNoRequire.required()
})

const onlyQuery = base.keys({
    query: recordNoRequire.required()
})

export const getRecord = onlyQuery

export const getRecords = onlyQuery

export const deleteRecord = onlyQuery
