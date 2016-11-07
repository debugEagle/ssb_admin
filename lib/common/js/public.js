function init() {

  tokenId = $.cookie('tokenId');
  prefix = 'https://api.91buyin.com'
  organizationId = ''

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

  $.ajax({
      url: prefix + '/business/info',
      headers: {
         "Content-Type": "application/json",
         "authorization": "Bearer " + tokenId,
      },
      async: false,
      crossDomain: true,
      type: 'post',
      dateType: 'json',
      success: function(data) {
          if (data.code != 0) {
              self.location = '/'
          } else {
              organizationId =  data.value.organizationId
              $('.username').html(data.value.businessName)
          }
      }
  })


  $('.logout').click(function () {
      $.cookie('tokenId', null);
      self.location = '/'
  })

  // $('.submenu').click(function () {
  //     if ($(this).hasClass('open'))
  //         $(this).removeClass('open')
  //     else
  //         $(this).addClass('open')
  // })



}
