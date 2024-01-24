import { mysqlConnection } from './logic/integrations/mysql'
let del = `DELETE FROM wp_options WHERE option_name LIKE '%_transient_%'`
// let get = `SELECT * FROM wp_options WHERE option_name LIKE '%_transient_%' LIMIT 1,30;`

export async function deleteRows(callback: (err: Error, res: any) => void, recursive: boolean = false) {
    mysqlConnection.connection.query(del, async (err: Error, res: any) => {
        callback(err, res)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (recursive) {
            deleteRows(callback, recursive)
        }
    })
}

export async function consoleLog(err: Error, res: any) {
    if (err) {
        console.error(err)
    }

    if (res) {
        console.log(`deleted rows: ${res.affectedRows}`)
    }
}

deleteRows(consoleLog, true)
