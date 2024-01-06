import axios from 'axios'
import { config } from '../../config'

export const zetaChain = axios.create({
    baseURL: `https://campaign-ts.xdefi.services/api/campaigns/${config.ZETA_CHAIN.path}/events`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export async function sendEvent(data: { hash: string; sender: string }): Promise<{ data: { id: number; address: string; chain: 'ethereum' } }> {
    let response = (
        await zetaChain.post('', {
            chain: 'ethereum',
            address: data.sender,
            partnerName: config.ZETA_CHAIN.name,
            partnerKey: config.ZETA_CHAIN.partnerKey,
            metadata: 'string'
        })
    ).data

    return response
}
