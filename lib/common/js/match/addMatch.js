$(function () {

  init()


  $('#datetimepicker1').datetimepicker({
      pickDate: false
    })
  $('#datetimepicker2').datetimepicker({
      pickDate: false
    })

  $('.success').click(function () {
      $(".success").attr("disabled", true)
      var today = new Date()
      var day = today.getDay()

      var formInfo={},matchSettingData={}
      var reg=/^(0|([1-9]\d*))$/;

      $('.addMatch').find('input,select,textarea').each(function(){
          formInfo[this.name]=this.value
      })

      var days =[]
      $('input[name=matchDays,]:checked').each(function(){
          days.push($(this).val())
      })

      if (days.length === 0) {
          $(".success").attr("disabled", false)
          return alert('请选择赛事日期')
      }

      if (day === 0)
          day = 7

      var matchDays = []
      var reg=/^(0|([1-9]\d*))$/
      for (i =0, j=days.length; i < j; i++) {
          matchDays[i] = getthisDay(parseInt(days[i]) + 7 - day)
      }

      formInfo.matchDays = matchDays

      if (!formInfo.startTime) {
          $(".success").attr("disabled", false)
          return alert('请输入开始时间')
      }


      if (!formInfo.endTime) {
          $(".success").attr("disabled", false)
          return alert('请输入截止时间')
      }


      if (!formInfo.price) {
          $(".success").attr("disabled", false)
          return alert('请输入单价')
      }

      if (!reg.test(formInfo.price)) {
          $(".success").attr("disabled", false)
          return alert('单价必须为数字')
      }

      if (formInfo.matchSetting == 0) {
          $(".success").attr("disabled", false)
          return alert('请选择比赛结构表')
      }


      $.ajax({
          url:  prefix + '/business/match/addMatch',
          beforeSend: function(request) {
                  request.setRequestHeader("authorization", "Bearer " + tokenId);
          },
          data: {
              formInfo: formInfo,
          },
          async:true,
          crossDomain: true,
          type: 'post',
          dateType: 'json',
          success: function(data) {
              if (data.code == 0) {
                alert('提交成功')
                self.location = '/'
                return true
              }
              else {
                 return alert('提交失败')
              }


          }
      })
  })

})


function getthisDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds); //关键
    var tyear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    if (tDate < 10) {
        tDate = "0" + tDate;
    }
    tMonth = tMonth + 1;
    if (tMonth < 10) {
        tMonth = "0" + tMonth;
    }
    return tyear + "-" + tMonth + "-" + tDate + "";
}
