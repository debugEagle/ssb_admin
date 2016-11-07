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
      $('.settingForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            var setting = []
            data.forEach(function(item){
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
      $('.bonusesForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            var bonuses = []
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

      var formInfo={},matchSettingData={}
      var reg=/^(0|([1-9]\d*))$/;

      $('.dailyMatchInfo').find('input,select').each(function(){
          formInfo[this.name]=this.value
      })

      if (formInfo.name)
          matchSettingData.name = formInfo.name
      else
          return alert('请填写比赛结构名称')

      if (formInfo.blindTime) {
          if (reg.test(formInfo.blindTime))
              matchSettingData.blindTime = formInfo.blindTime
          else
              return alert('涨盲时间必须为数字')
      }

      if (formInfo.chip) {
          if (reg.test(formInfo.chip))
              matchSettingData.chip = formInfo.chip
          else
              return alert('初始筹码必须为数字')
      }

      matchSettingData.setting =$.cookie('setting')
      matchSettingData.bonuses =$.cookie('bonuses')


      if (organizationId)
          matchSettingData.organizationId = organizationId
      else
          return alert('找不到组织ID')

      $.ajax({
          url:  prefix + '/business/match/addMatchSetting',
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
              if (data.code == 0) {
                $.cookie('setting', '')
                $.cookie('bonuses', '')
                alert('新增成功')
                self.location = '/matchSettingList'
              }
              else {
                 return alert('新增失败')
              }


          }
      })
  })

  $('.back').click(function() {
      self.location = '/matchSettingList'
  })

});
