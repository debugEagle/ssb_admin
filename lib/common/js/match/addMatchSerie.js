$(function () {
    init()

    $('.success').click(function () {
        $('.success').attr('disabled', true)
        var name = $('.matchName').val()

        if (!name) {
            $('.success').attr('disabled', false)
            return alert('请填写赛事系列名称')
        }

        var organization_id = getUrlParam('id')

        $.ajax({
            url:  prefix + '/business/match/serie/addMatchSerie',
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            data: {
                name: name,
                organization_id: organization_id,
            },
            async:true,
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {
                $('.success').attr('disabled', false)
                if (data.code == 0) {
                  $('.matchName').val('')
                  alert('新增成功')
                  self.location = '/dailyChooseClub?id=3'
                }
                else {
                   return alert('新增失败')
                }


            }
        })
    })
})
