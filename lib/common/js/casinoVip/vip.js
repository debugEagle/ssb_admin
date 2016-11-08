$(function() {
    init()

    $('.sub').click(function () {
        var cardno = $('.cardno').val()

        if (!cardno)
            return alert("会员号不能为空！")

        $.ajax({
            url: prefix + '/business/vip/query',
            data: {
              cardno: cardno,
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {
              console.log(data);
              if (data.code == 1) {
                  $('.gradeA').html("<td colspan='5' class='ticketInfo'>" + "服务器出现问题" + "</td>")
                  return false
              }
              if (data.code == 7001) {
                  $('.gradeA').html("<td colspan='5' class='ticketInfo'>" + data.msg + "</td>")
                  return false
              }

              var Info = data.value

              var content = '<td>' + Info.cardno + '</td>' +
                            '<td>' + Info.user.realName +  '</td>' +
                            '<td>' + Info.user.rickName +  '</td>' +
                            '<td>' + Info.user.mobile + '</td>' +
                            '<td>' + Info.user.idCard + '</td>'

              if (data.code == 0) {
                  $('.gradeA').html(content)
                  $('.cardno').val('')
              }
              else
                  $('.gradeA').html("<td colspan='7' class='ticketInfo'>" + "未知问题，请重新输入！" + "</td>")


            }
        })
    })


})
