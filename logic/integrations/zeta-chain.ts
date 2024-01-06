import axios from 'axios'
import { config } from '../../config'

export const zetaChain = axios.create({
    baseURL: `https://campaign-ts.xdefi.services/api/campaigns/${config.ZETA_CHAIN.path}/events`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export async function sendEvent(address: string): Promise<{ data: { id: number; address: string; chain: 'ethereum' } }> {
    return (
        await zetaChain.post('', {
            chain: 'ethereum',
            address: address,
            partnerName: config.ZETA_CHAIN.name,
            partnerKey: config.ZETA_CHAIN.partnerKey,
            metadata: 'string'
        })
    ).data
}
