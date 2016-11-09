$(function () {

        //初始化信息
        init()

        //查询订单
        order_query(tokenId)

        $('#start').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});
        $('#end').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});


})

function order_query(tokenId) {

    $('.query').click(function () {

        startTime = $('#start').val() + ' 00:00:00'
        endTime = $('#end').val() + ' 23:59:59'
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

        if (!startTime || !endTime)
            return alert('请输入开始时间和结束时间')

        var d1 = new Date(startTime.replace(/\-/g, "\/"));
        var d2 = new Date(endTime.replace(/\-/g, "\/"));

        if (startTime!="" && endTime!="" && d1 >=d2)
         {
          alert("开始时间不能大于或等于结束时间！");
          return false;
         }

        $.ajax({
            url: prefix + '/business/order/query',
            data: {
                startTime: startTime,
                endTime: endTime,
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

                //$('.info_label').html('总额：' + Info.amount + '元')

                total = Info.count

                if (Info.count > 8)
                      Info.count = 8

                $('.orders_table').html("")

                for (var j = 0 , i = j + 1; j < Info.count; j++ , i++) {

                    var have_clearing = Info.rows[j].orderDetail.order.have_clearing === 1 ? '是' : '否'

                    var used_time = formatDateTime(new Date(Info.rows[j].used_time))

                    var order = Info.rows[j].orderDetail.order
                    var matchName = order.bigMatch ? order.bigMatch.dailyMatchSerie.name : order.dailyMatch.dailyMatchSerie.name
                    var price = order.bigMatch ? order.bigMatch.unit_price : order.dailyMatch.unit_price

                    $('.orders_table').append("<tr><td class='order_num'>"
                                            + i + "</td><td>" + matchName
                                                + "</td><td>" + Info.rows[j].orderDetail.order.order_No
                                                + "</td><td>" + Info.rows[j].user.realname
                                                + "</td><td>" + Info.rows[j].user.mobile
                                                + "</td><td>" + price
                                                + "</td><td>" + used_time
                                                + "</td><td>" + have_clearing + "</td></tr>"
                                              )
                }

            }
        })

    })

    $('.first').click(function () {

        $.ajax({
            url: prefix + '/business/order/query',
            data: {
                startTime: startTime,
                endTime: endTime,
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

                var have_clearing = Info.rows[j].orderDetail.order.have_clearing === 1 ? '是' : '否'
                var used_time = formatDateTime(new Date(Info.rows[j].used_time))

                var order = Info.rows[j].orderDetail.order
                var matchName = order.bigMatch ? order.bigMatch.dailyMatchSerie.name : order.dailyMatch.dailyMatchSerie.name
                var price = order.bigMatch ? order.bigMatch.unit_price : order.dailyMatch.unit_price

                $('.orders_table').append("<tr><td class='order_num'>"
                                        + i + "</td><td>" + matchName
                                            + "</td><td>" + Info.rows[j].orderDetail.order.order_No
                                            + "</td><td>" + Info.rows[j].user.realname
                                            + "</td><td>" + Info.rows[j].user.mobile
                                            + "</td><td>" + price
                                            + "</td><td>" + used_time
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
            url: prefix + '/business/order/query',
            data: {
                startTime: startTime,
                endTime: endTime,
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

                var have_clearing = Info.rows[j].orderDetail.order.have_clearing === 1 ? '是' : '否'
                var used_time = formatDateTime(new Date(Info.rows[j].used_time))

                var order = Info.rows[j].orderDetail.order
                var matchName = order.bigMatch ? order.bigMatch.dailyMatchSerie.name : order.dailyMatch.dailyMatchSerie.name
                var price = order.bigMatch ? order.bigMatch.unit_price : order.dailyMatch.unit_price

                $('.orders_table').append("<tr><td class='order_num'>"
                                        + i + "</td><td>" + matchName
                                            + "</td><td>" + Info.rows[j].orderDetail.order.order_No
                                            + "</td><td>" + Info.rows[j].user.realname
                                            + "</td><td>" + Info.rows[j].user.mobile
                                            + "</td><td>" + price
                                            + "</td><td>" + used_time
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
            url: prefix + '/business/order/query',
            data: {
                startTime: startTime,
                endTime: endTime,
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

                var have_clearing = Info.rows[j].orderDetail.order.have_clearing === 1 ? '是' : '否'
                var used_time = formatDateTime(new Date(Info.rows[j].used_time))

                var order = Info.rows[j].orderDetail.order
                var matchName = order.bigMatch ? order.bigMatch.dailyMatchSerie.name : order.dailyMatch.dailyMatchSerie.name
                var price = order.bigMatch ? order.bigMatch.unit_price : order.dailyMatch.unit_price

                $('.orders_table').append("<tr><td class='order_num'>"
                                        + i + "</td><td>" + matchName
                                            + "</td><td>" + Info.rows[j].orderDetail.order.order_No
                                            + "</td><td>" + Info.rows[j].user.realname
                                            + "</td><td>" + Info.rows[j].user.mobile
                                            + "</td><td>" + price
                                            + "</td><td>" + used_time
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
            url: prefix + '/business/order/query',
            data: {
                startTime: startTime,
                endTime: endTime,
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

                var have_clearing = Info.rows[j].orderDetail.order.have_clearing === 1 ? '是' : '否'
                var used_time = formatDateTime(new Date(Info.rows[j].used_time))

                var order = Info.rows[j].orderDetail.order
                var matchName = order.bigMatch ? order.bigMatch.dailyMatchSerie.name : order.dailyMatch.dailyMatchSerie.name
                var price = order.bigMatch ? order.bigMatch.unit_price : order.dailyMatch.unit_price

                $('.orders_table').append("<tr><td class='order_num'>"
                                        + i + "</td><td>" + matchName
                                            + "</td><td>" + Info.rows[j].orderDetail.order.order_No
                                            + "</td><td>" + Info.rows[j].user.realname
                                            + "</td><td>" + Info.rows[j].user.mobile
                                            + "</td><td>" + price
                                            + "</td><td>" + used_time
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
