$(function () {

        init()

        var tokenId = $.cookie('tokenId');

        $('.sub').click(function () {
            var serial = $('.serial').val()

            if (!serial)
                return alert("门票号不能为空！")

            $.ajax({
                url: 'http://demo.jomton.com:3000/business/verify',
                data: {
                  serial: serial,
                },
                beforeSend: function(request) {
                        request.setRequestHeader("authorization", "Bearer " + tokenId);
                },
                crossDomain: true,
                type: 'post',
                dateType: 'json',
                success: function(data) {

                    //console.log(data);

                    var Info = data.value

                    if (Info.serial_Status == true) {
                        var serial_Status = '已使用'
                        var text = '<td>' + '无法操作' + '</td>'
                    } else {
                        var serial_Status = '未使用'
                        var text = '<td>' + "<button type='button' onclick='firm()' class='btn sure'>" + '确认使用' + '</button>' + '</td>'
                    }

                    var content = '<td>' + "<span class='serial_val'>" + serial + '</span>' + '</td>' +
                                  '<td>' + Info.match_Name +  '</td>' +
                                  '<td>' + Info.user_Name + '</td>' +
                                  '<td>' + Info.user_Mobile + '</td>' +
                                  '<td>' + Info.unit_Price + '</td>' +
                                  '<td>' + serial_Status + '</td>' + text

                    if (data.code != 0) {
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + "未找到该门票号，请重新输入！" + "</td>")
                    } else {
                        $('.gradeA').html(content)
                    }




                }
            })
        })
      })

function firm() {

  var serial = $('.serial_val').html()

  if (confirm("你确定提交吗？")) {

      $.ajax({
          url: 'http://demo.jomton.com:3000/business/use',
          data: {
            serial: serial,
          },
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          type: 'post',
          cache: false,
          dateType: 'json',
          success: function(data) {
              console.log(data);
              var content = "<td colspan='7' class='ticketInfo'>" + "提交成功" + "</td>"

              if (data.code != 0) {
                  $('.ticketInfo').html('出现错误，请联系管理员！')
              } else {
                  $('.gradeA').html(content)
              }

          }
      })
    }
}
