
const buttonClicked = function (self) {
  self.buttonClicked = true
  setTimeout(function () {
    self.buttonClicked = false
  }, 500)
}
export default buttonClicked
