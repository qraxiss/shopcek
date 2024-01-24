import mysql from 'mysql'
import { config } from '../../config'

export class MySQLConnection {
    public connection: mysql.Connection
    public connected: boolean

    constructor() {
        this.connection = mysql.createConnection(config.REMOTE_MYSQL)
        this.connected = false

        this.connect()
        this.setupReconnect()
    }

    private connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err)
            } else {
                this.connected = true
                console.log('Connected to MySQL database successfully! ✅')
            }
        })
    }

    private setupReconnect() {
        // MySQL bağlantısı kaybedilirse, otomatik olarak yeniden bağlanacak
        this.connection.on('error', (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('MySQL connection lost. Reconnecting...')
                this.connected = false
                this.connect()
            } else {
                throw err
            }
        })
    }

    public getTransactions(startingHash: string, callback: (data: any[]) => void) {
        const query = `SELECT * FROM wp_cp_order_transaction
                    WHERE id >= (SELECT id + 1 FROM wp_cp_order_transaction WHERE hash = '${startingHash}') 
                    AND status = 'verified'`

        this.connection.query(query, async (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
            } else {
                const data = results.map((result: any) => ({
                    hash: result.hash,
                    sender: JSON.parse(result.addresses)?.sender || null,
                    id: result.id
                }))

                console.log(new Date(), '->', data.length !== 0 ? `hash: ${data[0].hash}` : 'No new transaction found!')
                if (data.length !== 0) {
                    await callback(data)
                }
            }
        })
    }

    public getLastTransaction(callback: (data: any) => void) {
        const query = `SELECT * FROM wp_cp_order_transaction WHERE status = 'verified' ORDER BY id DESC LIMIT 1`

        this.connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
                callback(null)
            } else {
                const data = {
                    hash: results[0].hash,
                    sender: JSON.parse(results[0].addresses)?.sender || null,
                    id: results[0].id
                }

                callback(data)
            }
        })
    }

    public endConnection() {
        this.connection.end()
        this.connected = false
    }
}

export const mysqlConnection = new MySQLConnection()
