$(function () {
    init()

    $('#end').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});

    $('.query').click(function () {

        const id = $('select[name=club]').val()
        const matchDay = $('#end').val()

        if (id == 0)
            return alert('请选择俱乐部')

        if (matchDay === '')
            return alert('请选择日期')

        $.ajax({
            url: prefix + '/business/match/dailyMatch/result',
            data: {
                id: id,
                matchDay: matchDay,
            },
            crossDomain: true,
            type: 'get',
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.result_table').html("")
                    $('.result_table').append("<tr><td colspan='4'>" + '网络不畅，请联系管理员' + "</td></tr>")
                    return false
                }

                if (Info.count === 0) {
                    $('.result_table').html("")
                    $('.result_table').append("<tr><td colspan='4'>" + '未找到相应内容' + "</td></tr>")
                    return false
                }

                $('.result_table').html("")

                for (var j = 0 , i = j + 1; j < Info.count; j++ , i++) {

                    const dailyMatch_id = Info.rows[j].dailyMatch_id
                    const matchName = Info.rows[j].dailyMatchSerie.name
                    const have_result = Info.rows[j].dailyMatchResult === null ? '否' : '是'
                    const result_id = Info.rows[j].dailyMatchResult === null ? '' : dailyMatch_id

                    const url = Info.rows[j].dailyMatchResult === null ? '/addResult?id=' + dailyMatch_id : '/resultDetail?id=' + result_id

                    var text = Info.rows[j].dailyMatchResult === null ? `<a href=${url}> <button type='button' class='btn sure'>添加</button> </a>` : `<a href=${url}> <button type='button' class='btn sure'>查看</button> </a>`

                    $('.result_table').append("<tr><td>" + dailyMatch_id
                                                + "</td><td>" + matchName
                                                + "</td><td>" + have_result
                                                + "</td><td>" + text + "</td></tr>"
                                              )
                }

            }
        })

    })
})
