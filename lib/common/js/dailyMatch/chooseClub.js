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
