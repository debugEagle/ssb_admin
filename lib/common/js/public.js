function init() {

  var tokenId = $.cookie('tokenId');

  $.ajax({
      url: 'http://demo.jomton.com:3000/business/Validate',
      headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + tokenId,
       },
      crossDomain: true,
      type: 'post',
      dateType: 'json',
      success: function(data) {
          if (data.code != 0) {
              alert('请先登录')
              self.location = '/'
          }

      }
  })

  // $.ajax({
  //     url: 'http://demo.jomton.com:3000/business/info',
  //     headers: {
  //        "Content-Type": "application/json",
  //        "authorization": "Bearer " + tokenId,
  //     },
  //     crossDomain: true,
  //     type: 'post',
  //     dateType: 'json',
  //     success: function(data) {
  //
  //         $('.username').html(data.value.businessName)
  //
  //     }
  // })



  $('.logout').click(function () {

      $.ajax({
          url: 'http://demo.jomton.com:3000/business/logout',
          headers: {
             "Content-Type": "application/json",
             "authorization": "Bearer " + tokenId,
          },
          crossDomain: true,
          type: 'post',
          cache: false,
          dateType: 'json',
          success: function(data) {
              console.log(data);
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
