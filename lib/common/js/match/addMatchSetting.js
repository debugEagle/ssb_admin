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


  $('.subSettingTable').click(function () {
      $('.subSettingTable').attr('disabled', true)
      $('.settingForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            var setting = []
            $('.settingTable').html('')
            data.forEach(function(item){
                $('.subSettingTable').attr('disabled', false)
                if (item.apptext) {
                  $('.settingTable').append("<tr><td>" + item.level +
                                            "</td><td>" + item.sb +
                                            "</td><td>" + item.bb +
                                            "</td><td>" + item.ante + "</td></tr>" +
                                            "<tr><td colspan='4'>" + item.apptext + "</td></tr>"
                                            )
                } else {
                  $('.settingTable').append("<tr><td>" + item.level +
                                            "</td><td>" + item.sb +
                                            "</td><td>" + item.bb +
                                            "</td><td>" + item.ante + "</td></tr>"

                                            )
                }


                setting.push(item)

            })
            var setting = JSON.stringify(setting)
            $.cookie('setting', setting)
          }
      })
  })

  $('.subBonusesTable').click(function () {
      $('.subBonusesTable').attr('disabled', true)
      $('.bonusesForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            $('.subBonusesTable').attr('disabled', false)
            var bonuses = []
            $('.bonusesTable').html('')
            data.forEach(function(item){
                $('.bonusesTable').append("<tr><td>" + item.ranking +
                                          "</td><td>" + item.bonus +
                                          "</td><td>" + item.remark + "</td></tr>" )
                bonuses.push(item)
            })

            var bonuses = JSON.stringify(bonuses)
            $.cookie('bonuses', bonuses);

          }
      })
  })

  $('.success').click(function () {
      $('.success').attr('disabled', true)
      var formInfo={},matchSettingData={}
      var reg=/^(0|([1-9]\d*))$/;

      $('.dailyMatchInfo').find('input,select,textarea').each(function(){
          formInfo[this.name]=this.value
      })

      if (formInfo.name)
          matchSettingData.name = formInfo.name
      else {
          $('.success').attr('disabled', false)
          return alert('请填写赛事结构名称')
      }


      if (formInfo.blindTime) {
          if (reg.test(formInfo.blindTime))
              matchSettingData.blindTime = formInfo.blindTime
          else {
              $('.success').attr('disabled', false)
              return alert('涨盲时间必须为数字')
          }

      }

      if (formInfo.chip) {
          if (reg.test(formInfo.chip))
              matchSettingData.chip = formInfo.chip
          else {
              $('.success').attr('disabled', false)
              return alert('初始筹码必须为数字')
          }

      }

      matchSettingData.bonuses =$.cookie('bonuses')
      matchSettingData.setting =$.cookie('setting')
      matchSettingData.remark = formInfo.remark

      var organizationId = getUrlParam('id')

      if (organizationId)
          matchSettingData.organizationId = organizationId
      else {
          $('.success').attr('disabled', false)
          return alert('找不到组织ID')
      }

      $.ajax({
          url:  prefix + '/business/match/setting/addMatchSetting',
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          data: {
              matchSettingData: matchSettingData,
          },
          async:true,
          crossDomain: true,
          type: 'post',
          dateType: 'json',
          success: function(data) {
              $('.success').attr('disabled', false)
              if (data.code == 0) {
                $.cookie('setting', '')
                $.cookie('bonuses', '')
                alert('新增成功')
                self.location = '/chooseclub?id=4'
              }
              else {
                 return alert('新增失败')
              }


          }
      })
  })

})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
