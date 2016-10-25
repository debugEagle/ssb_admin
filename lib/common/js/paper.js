$(function () {

        init()

        prefix = 'https://api.91buyin.com'
        var tokenId = $.cookie('tokenId');

        $('.sub').click(function () {
            var serial = $('.serial').val()

            if (!serial)
                return alert("门票号不能为空！")

            $.ajax({
                url: prefix + '/business/verify',
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
                    if (data.code == 1) {
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + "服务器出现问题" + "</td>")
                        return false
                    }
                    if (data.code == 5001) {
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + data.msg + "</td>")
                        return false
                    }
                    if (data.code == 5002) {
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + data.msg + "</td>")
                        return false
                    }

                    var Info = data.value

                    if (Info.serial_Status == true) {
                        var serial_Status = '已使用'
                        var text = '<td>' + '无法操作' + '</td>'
                    } else {
                        var serial_Status = '未使用'
                        var text = '<td>' + "<button type='button' onclick='firm()' class='btn sure'>" + '确认使用' + '</button>' + '</td>'
                    }

                    if (!Info.user_Name)
                        Info.user_Name = '未设置'

                    var content = '<td>' + "<span class='serial_val'>" + serial + '</span>' + '</td>' +
                                  '<td>' + Info.match_Name +  '</td>' +
                                  '<td>' + Info.user_Name + '</td>' +
                                  '<td>' + Info.user_Mobile + '</td>' +
                                  '<td>' + Info.unit_Price + '</td>' +
                                  '<td>' + serial_Status + '</td>' + text

                    if (data.code == 0)
                        $('.gradeA').html(content)
                    else
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + "未知问题，请重新输入！" + "</td>")






                }
            })
        })
      })

function firm() {

  var serial = $('.serial_val').html()

  if (confirm("你确定提交吗？")) {

      $.ajax({
          url: prefix + '/business/use',
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
