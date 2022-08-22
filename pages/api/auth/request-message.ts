import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from 'moralis'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { address, chain, network } = req.body
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  try {
    if(process.env.APP_DOMAIN === undefined) {
      throw 'process.env.APP_DOMAIN not set'
    } else if(process.env.NEXTAUTH_URL === undefined) {
      throw 'process.env.NEXTAUTH_URL not set'
    } else {
      const message = await Moralis.Auth.requestMessage({
        address,
        chain,
        network,
        domain: process.env.APP_DOMAIN,
        statement: 'Please sign this message to confirm your identity.',
        uri: process.env.NEXTAUTH_URL,
        timeout: 60
      })
      res.status(200).json(message)
    }
  } catch (error) {
    res.status(400).json({ error })
    console.error(error)
  }
}