function init() {

  tokenId = $.cookie('tokenId')
  //prefix = 'http://localhost:3000'
  prefix = 'https://api.91buyin.com'

  $('.logout').click(function () {
      $.cookie('tokenId', null);
      self.location = '/login'
  })

  $('.back').click(function() {
      history.back()
  })


}
