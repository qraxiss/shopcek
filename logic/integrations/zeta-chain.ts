import axios from 'axios'
import { config } from '../../config'

export const zetaChain = axios.create({
    baseURL: config.ZETA_CHAIN.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export async function sendEvent(data: { hash: string; sender: string }): Promise<{ data: { id: number; address: string; chain: 'ethereum' } }> {
    let response = (
        await zetaChain.post(`/campaigns/${config.ZETA_CHAIN.path}/events`, {
            chain: config.ZETA_CHAIN.chain,
            address: data.sender,
            partnerName: config.ZETA_CHAIN.name,
            partnerKey: config.ZETA_CHAIN.partnerKey,
            metadata: 'string'
        })
    ).data

    return response
}

export async function optIn(userId: string, walletAddress: string) {
    let response = (
        await zetaChain.post('/campaigns/opt-in', {
            userId,
            addresses: [
                {
                    chain: config.ZETA_CHAIN.chain,
                    address: walletAddress
                }
            ]
        })
    ).data

    return response
}

export async function participants(userId: string) {
    let response = (await zetaChain.get(`/participants/${userId}`)).data

    return response
}
