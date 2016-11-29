$(function(){
  //初始化
  init()

  $("input[type=file]").change(function(){
    $(this).parents(".uploader").find(".filename").val($(this).val());
  });
  $("input[type=file]").each(function(){
    if($(this).val()==""){
      $(this).parents(".uploader").find(".filename").val("未选择任何文件");
    }
  });

  $('.subResultTable').click(function () {
      $('.subResultTable').attr('disabled', true)
      $('.resultForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            $('.subResultTable').attr('disabled', false)
            localStorage.promotedResult = JSON.stringify(data)
            $('.resultTable').html('')
            data.forEach(function(item){
                $('.resultTable').append(`<tr>
                                            <td>${item.rank}</td>
                                            <td>${item.name}</td>
                                            <td>${item.bonus}</td>
                                            <td>${item.table}</td>
                                            <td>${item.seat}</td>
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
      var result = {
          items: JSON.parse(localStorage.promotedResult)
      }

      if (typeof(result) == 'undefined' || '') {
          $('.success').attr('disabled', false)
          return  alert('请录入比赛结果')
      }
      $.ajax({
          url:  prefix + '/business/match/bigMatch/addResult',
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
                localStorage.removeItem('promotedResult')
                alert('新增成功')
                return true
              }
              else {
                 return alert('新增失败')
              }

          },
      })
  })

})
