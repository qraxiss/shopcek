import { mysqlConnection } from '../../integrations/mysql'
import { sendEvent, optIn } from '../../integrations/zeta-chain'

import { RecordLogic } from './crud'

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
        let eventData = await sendEvent(event)
        let optInData = await optIn(JSON.stringify(eventData.data.id), event.sender)

        console.log(eventData)
        if (eventData.data.id && optInData.data.opted) {
            await RecordLogic.createRecord({
                body: {
                    hash: event.hash,
                    wallet: event.sender,
                    userId: JSON.stringify(eventData.data.id),
                    optInId: JSON.stringify(optInData.data.id)
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export async function sync() {
    while (true) {
        try {
            let process: boolean = false
            let lastRecord = await RecordLogic.getLastRecord()

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
