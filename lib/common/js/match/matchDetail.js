$(function () {
    init()

    $('.success').click(function () {

        $(".success").attr("disabled", true)

        var state = $('select[name=state]').val()
        var id = $('.hide').val()
        if (state == 0) {
            $(".success").attr("disabled", false)
            return alert('请选择展示状态')
        }

        $.ajax({
            url:  prefix + '/business/match/state',
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            data: {
                id: id,
                state: state,
            },
            async:true,
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {
                $(".success").attr("disabled", false)
                if (data.code == 0) {
                  $('.matchName').val('')
                  alert('提交成功')
                  window.location.reload()
                }
                else {
                   return alert('提交失败')
                }


            }
        })
    })
})
