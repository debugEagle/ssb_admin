function init() {

  var tokenId = $.cookie('tokenId');
  var prefix = 'http://localhost:3000'

  $.ajax({
      url: prefix + '/business/Validate',
      headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + tokenId,
       },
      crossDomain: true,
      type: 'post',
      dateType: 'json',
      success: function(data) {
          if (data.code != 0) {
              self.location = '/'
          }

      }
  })


  $('.logout').click(function () {

      $.ajax({
          url: prefix + '/business/logout',
          headers: {
             "Content-Type": "application/json",
             "authorization": "Bearer " + tokenId,
          },
          crossDomain: true,
          type: 'post',
          cache: false,
          dateType: 'json',
          success: function(data) {

              if (data.code == 0) {
                  $.cookie('tokenId', null);
                  self.location = '/'
              } else {
                  return alert('退出失败')
              }

          }
      })
  })
}

function userInfo() {

}
