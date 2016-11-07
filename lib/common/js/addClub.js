$(function() {

    //初始化信息
    init()

    $('.add').click(function() {
        var name = $('.name').val()
        var account = $('.account').val()
        var password = $('.password').val()
        var organizationId = $('.organizationId').val()
        var role = $('.role').val()

        if (!name)
            return alert('请填写用户名')

        if (!account)
            return alert('请填写账号')

        if (!password ||  password.length < 6)
            return alert('密码不能少于6位')

        if (!organizationId)
            return alert('请填写组织ID')

        $.ajax({
            url: prefix + '/business/register',
            data: {
                name: name,
                account: account,
                password: password,
                organizationId: organizationId,
                role: role,
            },
            async:true,
            crossDomain: true,
            type: 'post',
            dateType: 'json',
            success: function(data) {

                  if (data.code == 0) {
                      $("input").attr("value","");
                      return alert('新增成功')
                  }
                  else if (data.code == 5003) {
                      $(".account").attr("value","");
                      return alert(data.msg)
                  }
                  else {
                      return alert('新增失败')
                  }
            }
        })

    })



})
