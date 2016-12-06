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

  $('.subBigMatchTable').click(function () {
      $('.subBigMatchTable').attr('disabled', true)
      $('.bigMatchForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            $('.subBigMatchTable').attr('disabled', false)

            localStorage.bigMatchInfo = JSON.stringify(data)

            $('.bigMatchTable').html('')
            data.forEach(function(item){
                  switch (item.can_register) {
                    case '0':
                      item.can_register = '否'
                      break;
                    case '1':
                      item.can_register = '是'
                      break;
                    default:
                  }

                  switch (item.need_exchange) {
                    case '0':
                      item.need_exchange = '否'
                      break;
                    case '1':
                      item.need_exchange = '是'
                      break;
                    default:
                  }

                  switch (item.ispromoted) {
                    case '0':
                      item.ispromoted = '否'
                      break;
                    case '1':
                      item.ispromoted = '是'
                      break;
                    default:
                  }

                  switch (item.havematchsetting) {
                    case '0':
                      item.havematchsetting = '无'
                      break;
                    case '1':
                      item.havematchsetting = '有'
                      break;
                    default:
                  }

                  switch (item.havematchbonus) {
                    case '0':
                      item.havematchbonus = '无'
                      break;
                    case '1':
                      item.havematchbonus = '有'
                      break;
                    default:
                  }

                  $('.bigMatchTable').append(`<tr>
                                                <td>${item.match_day}</td>
                                                <td>${item.name}</td>
                                                <td>${item.real_buyin}</td>
                                                <td>${item.rake_buyin}</td>
                                                <td>${item.open_time}</td>
                                                <td>${item.close_reg_time}</td>
                                                <td>${item.can_register}</td>
                                                <td>${item.face_price}</td>
                                                <td>${item.need_exchange}</td>
                                                <td>${item.exchangerate_id}</td>
                                                <td>${item.ispromoted}</td>
                                                <td>${item.matchsetting_id}</td>
                                                <td>${item.havematchsetting}</td>
                                                <td>${item.havematchbonus}</td>
                                                <td>${item.remark}</td>
                                              </tr>`)




            })

          }

      })
  })


  $('.success').click(function () {
      $('.success').attr('disabled', true)

      var bigMatchInfo = JSON.parse(localStorage.bigMatchInfo)
      var id = $('input[name=id]').val()

      var length = bigMatchInfo.length
      var reg = new RegExp('^[0-9]*$')
      var regs = new RegExp('^[0-1]*$')
      var reg_c = new RegExp('^[0-3]*$')

      for (i = 0; i < length; i++) {
          if (!RQcheck(bigMatchInfo[i].match_day) || bigMatchInfo[i] === 'undefined') {
              $('.success').attr('disabled', false)
              return alert("请输入正确的日期")
          }

          if (bigMatchInfo[i].name === 'undefined') {
              $('.success').attr('disabled', false)
              return alert("赛事名称不能为空")
          }

          if (!reg.test(bigMatchInfo[i].real_buyin)) {
              $('.success').attr('disabled', false)
              return alert("买入金额必须为数字")
          }

          if (!reg.test(bigMatchInfo[i].rake_buyin)) {
              $('.success').attr('disabled', false)
              return alert("服务费必须为数字")
          }

          if (!checkTime(bigMatchInfo[i].open_time)) {
              $('.success').attr('disabled', false)
              return alert("开始时间格式不正确")
          }

          if (!checkTime(bigMatchInfo[i].close_reg_time)) {
              $('.success').attr('disabled', false)
              return alert("报名截止时间格式不正确")
          }

          if (!regs.test(bigMatchInfo[i].can_register)) {
              $('.success').attr('disabled', false)
              return alert("是否可以报名格式不正确")
          }

          if (!reg.test(bigMatchInfo[i].face_price)) {
              $('.success').attr('disabled', false)
              return alert("票面价格必须为数字")
          }

          if (!regs.test(bigMatchInfo[i].need_exchange)) {
              $('.success').attr('disabled', false)
              return alert("是否需要兑换人民币不能为空")
          }

          if (!reg.test(bigMatchInfo[i].exchangerate_id)) {
              $('.success').attr('disabled', false)
              return alert("货币类型必须为数字")
          }

          if (!regs.test(bigMatchInfo[i].ispromoted)) {
              $('.success').attr('disabled', false)
              return alert("是否晋级赛必须为数字")
          }

          if (!reg.test(bigMatchInfo[i].matchsetting_id)) {
              $('.success').attr('disabled', false)
              return alert("结构表ID必须为数字")
          }

          if (!regs.test(bigMatchInfo[i].havematchsetting)) {
              $('.success').attr('disabled', false)
              return alert("盲注结构表必须为数字")
          }

          if (!regs.test(bigMatchInfo[i].havematchbonus)) {
              $('.success').attr('disabled', false)
              return alert("奖金结构表必须为数字")
          }
      }


      $.ajax({
          url:  prefix + '/business/match/bigMatch/addBigMatch',
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          data: {
              id: id,
              bigMatchInfo: bigMatchInfo,
          },
          async:true,
          crossDomain: true,
          type: 'post',
          dateType: 'json',
          success: function(data) {
              $('.success').attr('disabled', false)
              if (data.code == 0) {
                localStorage.removeItem('lastname')
                alert('发布成功')
                self.location = '/bigChooseClub/1'
              }
              else {
                 return alert('发布失败')
              }


          }
      })
  })



});
