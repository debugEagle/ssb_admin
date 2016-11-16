$(function(){
  
  init()

  $("input[type=file]").change(function(){
    $(this).parents(".uploader").find(".filename").val($(this).val());
  });
  $("input[type=file]").each(function(){
    if($(this).val()==""){
      $(this).parents(".uploader").find(".filename").val("未选择任何文件");
    }
  });

  $('.subSerieTable').click(function () {
      $('.serieForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            var items = []
            data.forEach(function(item){
                if (item.apptext) {
                  $('.serieTable').append("<tr><td>" + item.level +
                                            "</td><td>" + item.sb +
                                            "</td><td>" + item.bb +
                                            "</td><td>" + item.ante + "</td></tr>" +
                                            "<tr><td colspan='4'>" + item.apptext + "</td></tr>"
                                            )
                } else {
                  $('.serieTable').append("<tr><td>" + item.level +
                                            "</td><td>" + item.sb +
                                            "</td><td>" + item.bb +
                                            "</td><td>" + item.ante + "</td></tr>"

                                            )
                }


                items.push(item)

            })
            var items = JSON.stringify(items)
            $.cookie('items', items)
          }
      })
  })

  $('.subSetTable').click(function () {
      $('.setForm').ajaxSubmit({
          url: '/upload',
          type: 'post',
          dateType: 'json',
          success: function(data) {
            var bonuses = []
            data.forEach(function(item){
                $('.setTable').append("<tr><td>" + item.ranking +
                                          "</td><td>" + item.bonus +
                                          "</td><td>" + item.remark + "</td></tr>" )
                bonuses.push(item)
            })

            var bonuses = JSON.stringify(bonuses)
            $.cookie('bonuses', bonuses);

          }
      })
  })

  $('.btn-success').click(function () {
      var formInfo={},matchSettingData={}
      $('.dailyMatchInfo').find('input,select').each(function(){
          formInfo[this.name]=this.value
      })

      var items =$.cookie('items')
      items = JSON.parse(items)

      var bonuses =$.cookie('bonuses')
      bonuses = JSON.parse(bonuses)

      matchSettingData.blindTime = formInfo.blindTime
      matchSettingData.chip = formInfo.chip
      matchSettingData.items = items
      matchSettingData.bonuses = bonuses

      console.log(matchSettingData);



  })

});
