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

export function getTransactions(date: string): any {
    const query = `SELECT * FROM wp_cp_order_transaction WHERE createdAt > '${date}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err)
            return []
        } else {
            return results
        }
    })
}
