$(function () {

    $('.login').click(function () {
        var account = $('.username').val()
        var password = $('.password').val()

        if (!account || !password)
            return  alert("请输入用户名或密码！")

        $.ajax({
            url: 'http://demo.jomton.com:3000/business/login',
            data: {
                account: account,
                password: password,
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {

              if (data.code == 0) {

                var tokenId = data.value

                $.cookie('tokenId', tokenId);

                self.location = '/index'
              } else {
                return  alert('用户名或密码错误！')
              }

            }
        })

    })

    $('.revise').click(function () {
        var name = $('.rev_username').val()
        var password = $('.old_password').val()
        var new_password = $('.new_password').val()

        if (!name || !password || !new_password)
            return alert('请输入用户名和密码')

        if (password === new_password)
            return alert('新旧密码不能相同')

        $.ajax({
            url: 'http://demo.jomton.com:3000/business/rest',
            data: {
                name: name,
                password: password,
                new_password: new_password,
            },
            type: 'post',
            cache: false,
            dateType: 'json',
            success: function(data) {
                  if (data.code == 0) {
                      $("input").attr("value","");
                      return alert('密码修改成功')
                  } else {
                      $("input").attr("value","");
                      return alert('密码修改失败')
                  }


            }
        })


    })

})
