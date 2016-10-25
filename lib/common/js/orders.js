$(function () {
        var tokenId = $.cookie('tokenId');
        var organizationId = ''
        prefix = 'https://api.91buyin.com'

        $.ajax({
            url: prefix + '/business/info',
            headers: {
               "Content-Type": "application/json",
               "authorization": "Bearer " + tokenId,
            },
            async:true,
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {

                  organizationId =  data.value.organizationId

                  //查询订单
                  order_query(tokenId, organizationId)
            }
        })

        //初始化信息
        init(tokenId)

        $('#start').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});
        $('#end').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});

        $.ajax({
            url: prefix + '/business/info',
            headers: {
               "Content-Type": "application/json",
               "authorization": "Bearer " + tokenId,
            },
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {
                  organizationId = data.value.organizationId

            }
        })
})

function order_query(tokenId, organizationId) {

    $('.query').click(function () {

        start_day = $('#start').val()
        end_day = $('#end').val()
        have_clearing = $('.select2-choice span').html()

        switch (have_clearing) {
          case '未结算':
              have_clearing = 0
              break;
          case '已结算':
              have_clearing = 1
              break;
          default:
              have_clearing = ''
              break;
        }

        if (!start_day || !end_day)
            return alert('请输入开始时间和结束时间')

        var d1 = new Date(start_day.replace(/\-/g, "\/"));
        var d2 = new Date(end_day.replace(/\-/g, "\/"));

        if (start_day!="" && end_day!="" && d1 >=d2)
         {
          alert("开始时间不能大于或等于结束时间！");
          return false;
         }


        $.ajax({
            url: prefix + '/business/query',
            data: {
                start_day: start_day,
                end_day: end_day,
                organizationId: organizationId,
                have_clearing: have_clearing
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.orders_table').html("")
                    $('.orders_table').append("<tr><td colspan='7'>" + '服务器出现问题，请联系管理员' + "</td></tr>")
                    return false
                }

                if (Info.count === 0) {
                    $('.orders_table').html("")
                    $('.orders_table').append("<tr><td colspan='7'>" + '未找到相应内容' + "</td></tr>")
                    return false
                }

                $('.info_label').html('总额：' + Info.amount + '元')

                total = Info.count

                if (Info.count > 8)
                      Info.count = 8

                $('.orders_table').html("")

                for (var j = 0 , i = j + 1; j < Info.count; j++ , i++) {

                    var have_clearing = Info.rows[j].payments[0].have_clearing === 1 ? '是' : '否'

                    var pay_datetime = formatDateTime(new Date(Info.rows[j].payments[0].pay_datetime))

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + Info.rows[j].matchName
                                                + "</td><td>" + Info.rows[j].order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + pay_datetime
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })

    })

    $('.first').click(function () {

        $.ajax({
            url: prefix + '/business/query',
            data: {
                start_day: start_day,
                end_day: end_day,
                organizationId: organizationId,
                have_clearing: have_clearing,
                limit: 0,
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.orderInfo').html('服务器出现问题，请联系管理员')
                    return false
                }

                if (Info.count === 0) {
                    $('.orderInfo').html('未找到相应内容')
                    return false
                }

                if (Info.count > 8)
                      Info.count = 8

                $('.orders_table').html("")

                for (var j = 0 , i = j + 1; j < Info.count; j++ , i++) {

                    var have_clearing = Info.rows[j].payments[0].have_clearing === 1 ? '是' : '否'

                    var pay_datetime = formatDateTime(new Date(Info.rows[j].payments[0].pay_datetime))

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + Info.rows[j].matchName
                                                + "</td><td>" + Info.rows[j].order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + pay_datetime
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })
    })
    $('.previous').click(function () {


        var num = $('.table').find('.order_num:last').html()

        if (num < 9)
            return false

        $.ajax({
            url: prefix + '/business/query',
            data: {
                start_day: start_day,
                end_day: end_day,
                organizationId: organizationId,
                have_clearing: have_clearing,
                limit: 0,
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.orderInfo').html('服务器出现问题，请联系管理员')
                    return false
                }

                if (Info.count === 0) {
                    $('.orderInfo').html('未找到相应内容')
                    return false
                }

                if (Info.count > 8)
                      Info.count = 8

                $('.orders_table').html("")

                for (var j = 0 , i = j + 1; j < Info.count; j++ , i++) {

                    var have_clearing = Info.rows[j].payments[0].have_clearing === 1 ? '是' : '否'

                    var pay_datetime = formatDateTime(new Date(Info.rows[j].payments[0].pay_datetime))

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + Info.rows[j].matchName
                                                + "</td><td>" + Info.rows[j].order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + pay_datetime
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })
    })

    $('.next').click(function () {

        var num = $('.table').find('.order_num:last').html()
        var snum = parseInt(num)

        if (snum === total)
            return false

        $.ajax({
            url: prefix + '/business/query',
            data: {
                start_day: start_day,
                end_day: end_day,
                organizationId: organizationId,
                have_clearing: have_clearing,
                offset: num,
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.orderInfo').html('服务器出现问题，请联系管理员')
                    return false
                }

                if (Info.count === 0) {
                    $('.orderInfo').html('未找到相应内容')
                    return false
                }

                if (snum + 8 > Info.count)
                    Info.count = Info.count - snum

                if (Info.count > 8)
                      Info.count = 8

                $('.orders_table').html("")

                for (var j = 0 , i = snum + 1; j < Info.count; j++ , i++) {

                    var have_clearing = Info.rows[j].payments[0].have_clearing === 1 ? '是' : '否'

                    var pay_datetime = formatDateTime(new Date(Info.rows[j].payments[0].pay_datetime))

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + Info.rows[j].matchName
                                                + "</td><td>" + Info.rows[j].order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + pay_datetime
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })
    })

    $('.last').click(function () {

         var firstNum  = parseInt(total/8) * 8
         var count =   total % 8

         if (count === 0)
              return false

        $.ajax({
            url: prefix + '/business/query',
            data: {
                start_day: start_day,
                end_day: end_day,
                organizationId: organizationId,
                have_clearing: have_clearing,
                offset: firstNum,
            },
            beforeSend: function(request) {
                    request.setRequestHeader("authorization", "Bearer " + tokenId);
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {

                var Info = data.value

                if (data.code != 0) {
                    $('.orderInfo').html('服务器出现问题，请联系管理员')
                    return false
                }

                if (Info.count === 0) {
                    $('.orderInfo').html('未找到相应内容')
                    return false
                }

                $('.orders_table').html("")

                for (var j = 0 , i = firstNum + 1; j < count; j++ , i++) {

                    var have_clearing = Info.rows[j].payments[0].have_clearing === 1 ? '是' : '否'

                    var pay_datetime = formatDateTime(new Date(Info.rows[j].payments[0].pay_datetime))

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + Info.rows[j].matchName
                                                + "</td><td>" + Info.rows[j].order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + pay_datetime
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })
    })
}

var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
};
