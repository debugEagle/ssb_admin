function init() {

  tokenId = $.cookie('tokenId')
  //prefix = 'http://localhost:3000'
  prefix = 'https://api.91buyin.com'
  organizationId = ''

  // $.ajax({
  //     url: prefix + '/business/Validate',
  //     headers: {
  //         "Content-Type": "application/json",
  //         "authorization": "Bearer " + tokenId,
  //      },
  //     crossDomain: true,
  //     type: 'post',
  //     dateType: 'json',
  //     success: function(data) {
  //
  //         if (data.code != 0) {
  //             self.location = '/login'
  //         }
  //
  //     }
  // })

  // $.ajax({
  //     url: prefix + '/business/info',
  //     headers: {
  //        "Content-Type": "application/json",
  //        "authorization": "Bearer " + tokenId,
  //     },
  //     async: false,
  //     crossDomain: true,
  //     type: 'post',
  //     dateType: 'json',
  //     success: function(data) {
  //         if (data.code != 0) {
  //             self.location = '/login'
  //         } else {
  //             organizationId =  data.value.organizationId
  //             $('.username').html(data.value.businessName)
  //         }
  //     }
  // })


  $('.logout').click(function () {
      $.cookie('tokenId', null);
      self.location = '/login'
  })

  $('.back').click(function() {
      history.back()
  })

  // $('.submenu').click(function () {
  //     if ($(this).hasClass('open'))
  //         $(this).removeClass('open')
  //     else
  //         $(this).addClass('open')
  // })



}
