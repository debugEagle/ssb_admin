$(function () {
    init()

    $('.success').click(function () {
        $('.success').attr('disabled', true)
        var name = $('.tourName').val()

        if (!name) {
            $('.success').attr('disabled', false)
            return alert('请填写巡回赛名称')
        }


        $.ajax({
            url:  prefix + '/business/match/bigMatch/addTour',
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId)
            },
            data: {
                name: name,
            },
            async:true,
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {
                $('.success').attr('disabled', false)
                if (data.code == 0) {
                  $('.tourName').val('')
                  alert('新增成功')
                  self.location = '/bigMatchTourList'
                }
                else {
                   return alert('新增失败')
                }


            }
        })
    })

})
