import mysql from 'mysql'
import { config } from '../../config'

export const connection = mysql.createConnection(config.REMOTE_MYSQL)

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err)
    } else {
        console.log('Connected to MySQL database successfully! ✅')
    }
})

export function getTransactions(startingHash: string, callback: (data: any[]) => void) {
    const query = `SELECT * FROM wp_cp_order_transaction
        WHERE id >= (
            SELECT id + 1 FROM wp_cp_order_transaction WHERE hash = '${startingHash}'
        )`

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err)
            callback([])
        } else {
            const data = results.map((result: any) => ({
                hash: result.hash,
                sender: JSON.parse(result.addresses)?.sender || null
            }))

            callback(data)
        }
    })
}
