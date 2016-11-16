$(function () {

    //var prefix = 'http://localhost:3000'
    var prefix = 'https://api.91buyin.com'

    $('.login').click(function () {
        var account = $('.username').val()
        var password = $('.password').val()

        if (!account || !password)
            return  alert("请输入用户名或密码！")

        $.ajax({
            url: prefix + '/business/login',
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

                self.location = '/'
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

        if (new_password.length < 6) {
            $(".old_password").attr("value","");
            $(".new_password").attr("value","");
            return alert('密码长度必须大于6位')
        }


        if (password === new_password) {
          $(".old_password").attr("value","");
          $(".new_password").attr("value","");
          return alert('新旧密码不能相同')
        }


        $.ajax({
            url: prefix + '/business/rest',
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
                      $("input").attr("value","")
                      return alert('密码修改成功')
                  } else {
                      $("input").attr("value","")
                      return alert('密码修改失败')
                  }


            }
        })


    })

})
