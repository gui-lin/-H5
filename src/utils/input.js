
exports.install = (Vue, options) => {
  Vue.prototype.$filterNote = (content, length) => {
    let len = 0
    let index = content.length
    let contentTrue = null
    for (let i = 0; i< content.length; i++) {
      if (content.charCodeAt(i) > 127 || content.charCodeAt(i) == 94) {
        len += 2
      } else {
        len ++
      }
      if (len >= length) {
        index = i
        contentTrue = content.substr(0, index).length
        break
      }
    }
    return { content: content.substr(0, index), maxLength: contentTrue }
  }

}

