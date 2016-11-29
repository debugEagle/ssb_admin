$(function(){
  //初始化
  init()

  $("input[type=file]").change(function(){
    $(this).parents(".uploader").find(".filename").val($(this).val());
  })

  $("input[type=file]").each(function(){
    if($(this).val()==""){
      $(this).parents(".uploader").find(".filename").val("未选择任何文件");
    }
  })

  $('.subResultTable').click(function () {
      $('.subResultTable').attr('disabled', true)
      $('.resultForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            $('.subResultTable').attr('disabled', false)
            localStorage.result = JSON.stringify(data)
            $('.resultTable').html('')
            data.forEach(function(item){
                $('.resultTable').append(`<tr>
                                            <td>${item.rank}</td>
                                            <td>${item.name}</td>
                                            <td>${item.bonus}</td>
                                            <td>${item.country}</td>
                                            <td>${item.remark}</td>
                                          </tr> `)
            })
          }
      })
  })

  $('.success').click(function () {
      $('.success').attr('disabled', true)

      var id = $('input[name=id]').val()
      var name = $('input[name=name]').val()

      if (name === '') {
          $('.success').attr('disabled', false)
          alert('请输入大赛结果名称')
          return false
      }

      if (typeof(localStorage.result) == 'undefined' || '') {
          $('.success').attr('disabled', false)
          return  alert('请录入比赛结果')
      }

      var result = {
          items: JSON.parse(localStorage.result)
      }

      $.ajax({
          url:  prefix + '/business/match/bigMatch/reviseMatchResult',
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          data: {
              id: id,
              name: name,
              result: result,
          },
          async: true,
          crossDomain: true,
          type: 'post',
          dateType: 'json',
          success: function(data) {
              $('.success').attr('disabled', false)
              if (data.code == 0) {
                localStorage.removeItem('result')
                alert('修改成功')
                return true
              }
              else {
                 return alert('修改失败')
              }

          },
      })
  })

})
