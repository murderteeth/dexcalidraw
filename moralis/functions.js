const getQuota = async user => {
  const FREE_PLAN = 3 // Drawings
  const PENDRAGON_PLAN = 10_000 // Drawings
  const hasNft = false
  const max = hasNft ? PENDRAGON_PLAN : FREE_PLAN
  const query = new Moralis.Query('Drawing')
  query.equalTo('owner', user)
  const results = await query.find({ useMasterKey: true })
  const used = results.length
  return { used, max }
}

Moralis.Cloud.beforeSaveFile(async request => {
  const quota = await getQuota(request.user)
  const logger = Moralis.Cloud.getLogger()
  logger.info(`used ${quota.used} max ${quota.max}`)
  if(quota.used >= quota.max) {
    throw 'Quota full'
  }
}, {
  requireUser: true
})

Moralis.Cloud.beforeSave('Drawing', async request => {
  const quota = await getQuota(request.user)
  const logger = Moralis.Cloud.getLogger()
  logger.info(`used ${quota.used} max ${quota.max}`)
  if(quota.used >= quota.max) {
    throw 'Quota full'
  }
}, {
  requireUser: true
})

Moralis.Cloud.define('quota', async request => {
  return await getQuota(request.user)
}, {
  requireUser: true
})
