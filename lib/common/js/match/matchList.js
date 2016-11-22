$(function () {
    init()

    const id = getUrlParam('id')

    $.ajax({
        url:  prefix + '/business/match/list?id=' + id,
        beforeSend: function(request) {
                request.setRequestHeader("authorization", "Bearer " + tokenId);
        },
        async:true,
        crossDomain: true,
        type: 'get',
        dateType: 'json',
        success: function(data) {

            const list = data
            const day = getDay()
            const array = []
            const thisWeek = []
            const nextWeek = []
            var content = ''

            for (i = 0; i < 14; i++) {

              list.value.forEach(function(item) {

                if (day[i] === item.match_day) {
                    if (!array[i])
                        array[i] = [item]
                    else
                        array[i].push(item)
                }
              })

            }

            for (i = 0; i < 7; i++) {
                thisWeek[i] = array[i] ? array[i] : ''
            }

            for (i = 7,j = 0; i < 14; i++,j++) {
                nextWeek[j] = array[i] ? array[i] : ''
            }


            for (i = 0; i < 7; i++) {

                if (thisWeek[i].length > 1) {
                    thisWeek[i].forEach(function (item) {
                        content += "<a href=/matchDetail/" + item.dailyMatch_id + ">" + item.dailyMatchSerie.name + "<br>"
                    })
                } else {
                    if (thisWeek[i].length === 0) {
                        content += "<a href='#'>" + "无" + "<br>"
                    }
                    else {
                      content += "<a href=/matchDetail/" + thisWeek[i][0].dailyMatch_id + ">" + thisWeek[i][0].dailyMatchSerie.name + "<br>"
                    }

                }

                thisWeek[i] = content
                content = ''
            }

            for (i = 0; i < 7; i++) {

                if (nextWeek[i].length > 1) {
                    nextWeek[i].forEach(function (item) {
                        content += "<a href=/matchDetail/" + item.dailyMatch_id + ">" + item.dailyMatchSerie.name + "<br>"
                    })
                } else {
                    if (nextWeek[i].length === 0) {
                        content += "<a href='#'>" + "无" + "<br>"
                    }
                    else {
                      content += "<a href=/matchDetail/" + nextWeek[i][0].dailyMatch_id + ">" + nextWeek[i][0].dailyMatchSerie.name + "<br>"
                    }

                }

                nextWeek[i] = content
                content = ''
            }



            $('.thisWeek').html("<tr><td>本周</td><td>" + thisWeek[0] +
                                "</td><td>" + thisWeek[1] +
                                "</td><td>" + thisWeek[2] +
                                "</td><td>" + thisWeek[3] +
                                "</td><td>" + thisWeek[4] +
                                "</td><td>" + thisWeek[5] +
                                "</td><td>" + thisWeek[6] + "</td></tr>" +
                                "<tr><td>下周</td><td>" + nextWeek[0] +
                                "</td><td>" + nextWeek[1] +
                                "</td><td>" + nextWeek[2] +
                                "</td><td>" + nextWeek[3] +
                                "</td><td>" + nextWeek[4] +
                                "</td><td>" + nextWeek[5] +
                                "</td><td>" + nextWeek[6] + "</td></tr>" )

        }
    })
})

function getDay() {
    var myDate = new Date()
    var day = myDate.getDay()
    var array = []

    for (i = 0,j = 1; i < 14; i++,j++) {
        array[i] = getthisDay(-day + j)
    }

    return array
}

function getthisDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
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

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
