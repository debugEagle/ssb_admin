$(function () {

        init()

        $('.sub').click(function () {
            var serial = $('.serial').val()

            if (!serial)
                return alert("门票号不能为空！")

            $.ajax({
                url: prefix + '/business/ticket/verify',
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

                    Info.user_Name = Info.user_Name ? Info.user_Name : '未设置'
                    Info.cardno = Info.cardno ? Info.cardno : '未绑定'

                    var content = '<td>' + "<span class='serial_val'>" + serial + '</span>' + '</td>' +
                                  '<td>' + Info.match_Name +  '</td>' +
                                  '<td>' + "<span class='cardno'>" + Info.cardno + '</span>' +  '</td>' +
                                  '<td>' + Info.user_Name + '</td>' +
                                  '<td>' + Info.user_Mobile + '</td>' +
                                  '<td>' + Info.unit_Price + '</td>' +
                                  '<td>' + serial_Status + '</td>' + text

                    if (data.code == 0) {
                        $('.gradeA').html(content)
                        $('.userId').val(Info.user_id)
                    }
                    else
                        $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + "未知问题，请重新输入！" + "</td>")






                }
            })
        })


        $('.subCardno').click(function() {
            var userId = $('.userId').val()
            var card = $('.card').val()

            if (!userId)
                return alert('请确认存在验票结果')

            if (!card)
                return alert('请填写会员卡号')

            $.ajax({
                url: prefix + '/business/vip/add',
                data: {
                  userId: userId,
                  card: card,
                },
                beforeSend: function(request) {
                        request.setRequestHeader("authorization", "Bearer " + tokenId);
                },
                type: 'post',
                cache: false,
                dateType: 'json',
                success: function(data) {
                    console.log(data);
                    if (data.code == 0) {
                        $('.cardno').html(data.value)
                    } else {
                        alert(1)
                    }

                }
            })
        })

      })

function firm() {

  var serial = $('.serial_val').html()

  if (confirm("你确定提交吗？")) {

      $.ajax({
          url: prefix + '/business/ticket/use',
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
