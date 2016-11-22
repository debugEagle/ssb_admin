$(function () {

        init()

        const id = getUrlParam('id')

        switch (id) {
          case '1':
            var url =  '/addMatch?id='
            $('.match').find('li').eq('0').addClass('active')
            break;
          case '2':
            var url =  '/matchList?id='
            $('.match').find('li').eq('1').addClass('active')
            break;
          case '3':
            var url =  '/matchSerieList?id='
            $('.match').find('li').eq('3').addClass('active')
            break;
          case '4':
            var url =  '/matchSettingList?id='
            $('.settingLabel').addClass('active')
            $('.dailyMatch').removeClass('open')
            break;
          default:

        }

        $('.success').click(function () {
            const clubId = $('select[name=club]').val()

            if (clubId == 0)
                return alert('请选择俱乐部')

            self.location = url + clubId

        })




    })

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
