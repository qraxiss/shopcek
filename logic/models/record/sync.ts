import { mysqlConnection } from '../../integrations/mysql'
import { sendEvent } from '../../integrations/zeta-chain'

import { RecordModel } from '../../../database/models/record'

export async function getLastRecord() {
    return await RecordModel.findOne().sort({ _id: -1 })
}

export async function createRecord(hash: string) {
    return await RecordModel.create({ hash, status: 'sended' })
}

export async function sendEvents(events: { hash: string; sender: string }[]) {
    try {
        await Promise.all(
            events.map(async (event) => {
                return await sendEventWrapper(event)
            })
        )
    } catch (error) {
        console.error(error)
    }
}

export async function sendEventWrapper(event: { hash: string; sender: string }) {
    try {
        let data = await sendEvent(event)
        console.log(data)
        if (data.data) {
            await createRecord(event.hash)
        }
    } catch (error) {
        console.error(error)
    }
}

export async function sync() {
    while (true) {
        try {
            let process: boolean = false
            let lastRecord = await getLastRecord()

            if (lastRecord) {
                mysqlConnection.getTransactions(lastRecord.hash, async (data) => {
                    process = true
                    await sendEvents(data)
                    process = false
                })
            } else {
                mysqlConnection.getLastTransaction(async (data) => {
                    process = true
                    await sendEventWrapper(data)
                    process = false
                })
            }

            while (process) {
                await new Promise((resolve) => setTimeout(resolve, 100))
            }
        } catch (error) {
            console.error(error)
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
}
