import { convert } from 'backend-helper-kit'
import fs from 'fs'
const data = [
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    }
]

convert(data).then(() => {
    for (const item of data) {
        try {
            fs.unlinkSync(`${item.typeOutputDirectory}/index.ts`)
        } catch (err: any) {
            if (err.code !== 'ENOENT') {
                throw err
            }
        }
    }
})
