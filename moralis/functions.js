const subscriptionsAbi = [{"inputs":[{"internalType":"address","name":"_dai","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Subscribe","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"Sweep","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dai","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"token","type":"uint256"}],"name":"expired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"subscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"subscriptions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const chains = {
  ethereum: {
    id: 1,
    rpc: 'https://rpc.ankr.com/eth',
    explorer: 'https://etherscan.com', 
    subscriptions: '0x5C1E83d1Bb627A6EF8312eeB5d931ec20855F1BE',
    dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  },
  polygon: {
    id: 137,
    rpc: 'https://rpc.ankr.com/polygon',
    explorer: 'https://polygonscan.com', 
    subscriptions: '0x4d22D1101cE946eCDfd19Cf54d97D1597b5bA747',
    dai: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
  },
  opera: {
    id: 250,
    rpc: 'https://rpc.ankr.com/fantom',
    explorer: 'https://ftmscan.com', 
    subscriptions: '0xF7D7b0e44950c234Fd2C7a8f14e47C79b3eB67e9',
    dai: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E'
  }
}

const getNft = async user => {
  const account = user.get('ethAddress')
  for(const chain of Object.values(chains)) {
    web3 = new Moralis.Web3(new Moralis.Web3.providers.HttpProvider(chain.rpc))
    const subscriptions = new web3.eth.Contract(subscriptionsAbi, chain.subscriptions)
    const balance = await subscriptions.methods.balanceOf(account).call()  
    for(let i = 0; i < balance; i++) {
      const token = await subscriptions.methods.tokenOfOwnerByIndex(account, i).call()
      const expired = await subscriptions.methods.expired(token).call()
      const inception = await subscriptions.methods.subscriptions(token).call()
      const expiration = parseInt(inception) + (1 * 365 * 24 * 60 * 60)
      if(!expired) return { token, expired, expiration }
    }
  }

  return {
    token: 0,
    expired: false,
    expiration: 0
  }
}

const getSubscription = async user => {
  const FREE_PLAN = 3 // Drawings
  const PENDRAGON_PLAN = 1_000 // Drawings
  const nft = await getNft(user)
  const max = nft.token === 0 ? FREE_PLAN : PENDRAGON_PLAN

  const query = new Moralis.Query('Drawing')
  query.equalTo('owner', user)
  const results = await query.find({ useMasterKey: true })
  const used = results.length

  return { used, max, nft }
}

const exists = async id => {
  const query = new Moralis.Query('Drawing')
  query.equalTo('objectId', id)
  const results = await query.find({ useMasterKey: true })
  return results.length === 1
}

Moralis.Cloud.beforeSaveFile(async request => {
  const MAX_FILE_SIZE = 1 * 1_048_576 // 1 MB
  if(request.fileSize > MAX_FILE_SIZE) {
    const logger = Moralis.Cloud.getLogger()
    logger.info(`request.fileSize ${request.fileSize}`)
    throw 'File is too big'
  }
}, {
  requireUser: true
})

Moralis.Cloud.beforeSave('Drawing', async request => {
  const subscription = await getSubscription(request.user)
  if(subscription.used >= subscription.max) {
    const logger = Moralis.Cloud.getLogger()
    logger.info(`used ${subscription.used} max ${subscription.max}`)
    if(!(request.object.id && await exists(request.object.id))) {
      logger.info(`request.object.id ${request.object.id}`)
      throw 'Quota full'
    }
  }
}, {
  requireUser: true
})

Moralis.Cloud.define('subscription', async request => {
  return await getSubscription(request.user)
}, {
  requireUser: true
})
