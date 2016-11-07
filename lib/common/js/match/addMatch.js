$(function () {
  $('#start').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
      var myDate = new Date()
      var day = myDate.getDay()

      console.log(day)
  });
  $('#end').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});


  $('#datetimepicker1').datetimepicker({
      pickDate: false
    })
  $('#datetimepicker2').datetimepicker({
      pickDate: false
    })

  $('.success').click(function () {

      var formInfo={},matchSettingData={}
      var reg=/^(0|([1-9]\d*))$/;

      $('.addMatch').find('input,select').each(function(){
          formInfo[this.name]=this.value
      })


      if (formInfo.name)
          matchSettingData.name = formInfo.name
      else
          return alert('请填写赛事名称')

      if (!formInfo.start_day || !formInfo.end_day)
          return alert('请输入开始时间和结束时间')

      var d1 = new Date(formInfo.start_day.replace(/\-/g, "\/"));
      var d2 = new Date(formInfo.end_day.replace(/\-/g, "\/"));

      if (start_day!="" && end_day!="" && d1 >=d2)
       {
        alert("开始时间不能必须小于结束时间！");
        return false;
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

})
