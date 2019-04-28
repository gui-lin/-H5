
const env = process.env.NODE_ENV
// const env='test'
// const env='production'

const urlObj = {
  development: {
    baseHostUrl: 'http://122.13.1.150:8090', // 接口host
    baseDirUrl: '/OSN/api/dev', // 接口路径
    baseAddImage: '/crm/dev/rest/uploadFiles',
    basePreview: '/preview/dev/bucket-ytxtboss/workorder/'
  },
  test: {
    baseHostUrl: 'http://122.13.1.150:8090', // 接口host
    baseDirUrl: '/OSN/api/test', // 接口路径
    baseAddImage: '/crm/test/rest/uploadFiles',
    basePreview: '/preview/test/bucket-ytxtboss/workorder/'
  },
  production: {
    baseHostUrl: 'https://xcx.apsatcom.com', // 接口host
    baseDirUrl: '/OSN/api/prod', // 接口路径
    baseAddImage: '/crm/prod/rest/uploadFiles',
    basePreview: '/preview/prod/bucket-ytxtrj/workorder/'
  }
}
const baseHostUrl = urlObj[env].baseHostUrl
const baseDirUrl = urlObj[env].baseDirUrl
const baseAddImage = urlObj[env].baseAddImage
const basePreview = urlObj[env].basePreview
export default {
  baseHostUrl: baseHostUrl, // 接口host
  baseDirUrl: baseDirUrl, // 接口路径
  baseAddImage: baseAddImage, // 接口路径
  basePreview: basePreview, // 接口路径
  appId: 'ytxtweixin', // 能力平台appid 新的
  // appSecret: 'w8foVAVAmXrlWnp0pG75Xifj9iuAsimK' // 能力平台secret 生产
  appSecret: 'qD5zgbKMOHK5E3H5R3JiwSyN4qbdMkzd' // 能力平台secr et 生测试
  // appSecret: 'A61eHgo2f9sAnu6CXv6lfT9mWhEokXKB' // 能力平台secret 原来的
}
