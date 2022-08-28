Moralis.Cloud.define('test', (request) => {
  return request.params.test
})

Moralis.Cloud.beforeSaveFile((request) => {
  throw "Not Allowed"
})