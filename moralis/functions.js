const getQuota = async user => {
  const FREE_PLAN = 3 // Drawings
  const PENDRAGON_PLAN = 1_000 // Drawings
  const hasNft = false
  const max = hasNft ? PENDRAGON_PLAN : FREE_PLAN
  const query = new Moralis.Query('Drawing')
  query.equalTo('owner', user)
  const results = await query.find({ useMasterKey: true })
  const used = results.length
  return { used, max }
}

const exists = async id => {
  const query = new Moralis.Query('Drawing')
  query.equalTo('objectId', id)
  const results = await query.find({ useMasterKey: true })
  return results.length === 1
}

Moralis.Cloud.beforeSaveFile(async request => {
  const MAX_FILE_SIZE = 2 * 1_048_576 // 2 MB
  const logger = Moralis.Cloud.getLogger()
  if(request.fileSize > MAX_FILE_SIZE) {
    logger.info(`request.fileSize ${request.fileSize}`)
    throw 'File is too big'
  }
}, {
  requireUser: true
})

Moralis.Cloud.beforeSave('Drawing', async request => {
  const quota = await getQuota(request.user)
  if(quota.used >= quota.max) {
    const logger = Moralis.Cloud.getLogger()
    logger.info(`used ${quota.used} max ${quota.max}`)
    if(!(request.object.id && await exists(request.object.id))) {
      logger.info(`request.object.id ${request.object.id}`)
      throw 'Quota full'
    }
  }
}, {
  requireUser: true
})

Moralis.Cloud.define('quota', async request => {
  return await getQuota(request.user)
}, {
  requireUser: true
})
