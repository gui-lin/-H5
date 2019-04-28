import md5 from 'js-md5'
import config from '../config'

export default {
  getObj() {
    let reqObj, headObj = {}, bodyObj, attObj
    const dateObj = new Date()
    headObj.TRANS_ID = this.getTransId(dateObj)

    headObj.TIMESTAMP = dateObj.getTime()
    headObj.APP_ID = config.appId
    const s = 'appkey' + headObj.APP_ID + 'timestamp' + headObj.TIMESTAMP + 'transid' + headObj.TRANS_ID + config.appSecret
    console.log(s)
    var hash = md5.create()
    hash.update(s)
    // console.log(hash.hex())
    headObj.TOKEN = hash.hex()
    return headObj
  },
  addZero(t) {
    switch ((t + '').length) {
      case 1:
        return '0' + t
      case 2:
        return '' + t
    }
  },
  getMillisec(dateObj) {
    const t = dateObj.getMilliseconds()
    switch ((t + '').length) {
      case 1:
        return '00' + t
      case 2:
        return '0' + t
      case 3:
        return '' + t
    }
  },

  getSixNum() {
    return Math.floor(Math.random() * 1000000)
  },

  getTransId(t) {
    return '' + t.getFullYear() + this.addZero(t.getMonth() + 1) + this.addZero(t.getDate()) + this.addZero(t.getHours()) + this.addZero(t.getMinutes()) + this.addZero(t.getSeconds()) + this.getMillisec(t) + this.getSixNum()
  }
}
