$(function(){
  //初始化
  init()

  $('.success').click(function () {

      $(".success").attr("disabled", true)

      var name = $('input[name=name]').val()
      var id = $('input[name=id]').val()
      console.log(id);
      return
      if (!name) {
          $(".success").attr("disabled", false)
          return alert('请填写赛事系列名称')
      }


      $.ajax({
          url:  prefix + '/business/match/serie/reviseMatchSerie',
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          data: {
              name: name,
              id: id,
          },
          async:true,
          crossDomain: true,
          type: 'post',
          dateType: 'json',
          success: function(data) {
              $(".success").attr("disabled", false)
              if (data.code == 0) {
                $('.matchName').val('')
                alert('修改成功')
                self.location = '/matchSerieList'
              }
              else {
                 return alert('新增失败')
              }


          }
      })
  })

  // $('.del').click(function () {
  //
  //     $(".del").attr("disabled", true)
  //
  //     var id = $('input[name=id]').val()
  //
  //
  //     $.ajax({
  //         url:  prefix + '/business/match/serie/delMatchSerie',
  //         beforeSend: function(request) {
  //                 request.setRequestHeader("authorization", "Bearer " + tokenId);
  //         },
  //         data: {
  //             id: id,
  //         },
  //         async:true,
  //         crossDomain: true,
  //         type: 'post',
  //         dateType: 'json',
  //         success: function(data) {
  //             $(".del").attr("disabled", false)
  //             if (data.code == 0) {
  //               alert('删除成功')
  //               self.location = '/matchSerieList'
  //             }
  //             else {
  //                return alert('删除失败')
  //             }
  //
  //
  //         }
  //     })
  // })


});
