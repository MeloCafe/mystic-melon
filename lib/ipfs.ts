import { Web3Storage } from 'web3.storage'

const WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN
if (!WEB3_STORAGE_TOKEN) {
  throw new Error('No web3.storage token provided')
}

const PROPOSAL_BODY_PATH = 'body'

const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN })

/**
 * Generates an IPFS url for a given CID.
 */
export function getStorageUrl(cid: string): string {
  return `https://${cid}.ipfs.w3s.link/${PROPOSAL_BODY_PATH}`
}

/**
 * Generates a blob from the provided text and uploads it to IPFS, returning the hash.
 */
export async function uploadText(text: string) {
  const file = new File([text], PROPOSAL_BODY_PATH, { type: 'text/plain;charset=utf-8' })
  const cid = await client.put([file], {
    name: PROPOSAL_BODY_PATH,
    maxRetries: 3,
  })

  return {
    cid,
    url: getStorageUrl(cid),
  }
}
