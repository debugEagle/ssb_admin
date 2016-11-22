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
            var result = []
            $('.resultTable').html('')
            data.forEach(function(item){
                $('.resultTable').append("<tr><td>" + item.rank +
                                          "</td><td>" + item.name +
                                          "</td><td>" + item.bonus +
                                          "</td><td>" + item.remark + "</td></tr>" )
                result.push(item)
            })

            var result = JSON.stringify(result)
            $.cookie('result', result)
          }
      })
  })

  $('.success').click(function () {
      $('.success').attr('disabled', true)

      var name = $('input[name=name]').val()
      var id = getUrlParam('id')
      var result = {
          items: JSON.parse($.cookie('result'))
      }

      if (typeof(result) == 'undefined' || '') {
          $('.success').attr('disabled', false)
          return  alert('请录入比赛结果')
      }
      $.ajax({
          url:  prefix + '/business/match/dailyMatch/addResult',
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
                $.cookie('result', '')
                alert('新增成功')
                self.location = '/dailyMatchResult'
              }
              else {
                 return alert('新增失败')
              }

          },
          error: function () {
              $('.success').attr('disabled', false)
          }
      })
  })

})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
