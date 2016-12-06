$(function () {

        //初始化信息
        init()

        $('#start').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});
        $('#end').daterangepicker({ singleDatePicker: true }, function(start, end, label) {});

        $('input:radio[name=is_tour]').change(function () {
             var is_tour = $(this).val()
             if(is_tour === '1') {
                $('.tour').removeClass('hide')
             }
             else {
                $('.tour').addClass('hide')
             }
        })

        $('.success').click(function () {
            $('.success').attr('disabled', true)
            var formInfo={}

            $('.addBigMatchSerie').find('input,select,textarea').each(function(){
                formInfo[this.name]=this.value
            })

            formInfo.type = $('input[name=type]:checked').val()
            formInfo.is_tour = $('input[name=is_tour]:checked').val()
            formInfo.hot_level = $('input[name=hot_level]:checked').val()
            formInfo.need_show = $('input[name=need_show]:checked').val()
            formInfo.cooperated = $('input[name=cooperated]:checked').val()
            formInfo.is_hot = $('input[name=is_hot]:checked').val()

            if(formInfo.is_tour === 1 || formInfo.tour === 0) {
                $('.success').attr('disabled', false)
                return alert('请选择巡回赛')
            }

            if (formInfo.name === '') {
                $('.success').attr('disabled', false)
                return alert('请输入大赛系列名称')
            }

            if (formInfo.start_date === '') {
                $('.success').attr('disabled', false)
                return alert('请输入开始日期')
            }

            if (formInfo.end_date === '') {
                $('.success').attr('disabled', false)
                return alert('请输入结束日期')
            }

            var d1 = new Date(formInfo.start_date.replace(/\-/g, "\/"));
            var d2 = new Date(formInfo.end_date.replace(/\-/g, "\/"));

            if (d1 >=d2)
             {
              $('.success').attr('disabled', false)
              alert("开始时间不能大于或等于结束时间！")
              return false
             }


            $.ajax({
                url:  prefix + '/business/match/bigMatch/addBigMatchSerie',
                beforeSend: function(request) {
                        request.setRequestHeader("authorization", "Bearer " + tokenId)
                },
                data: {
                    formInfo: formInfo,
                },
                async:true,
                crossDomain: true,
                type: 'post',
                dateType: 'json',
                success: function(data) {
                    $('.success').attr('disabled', false)
                    if (data.code == 0) {
                      alert('新增成功')
                      self.location = '/bigChooseClub/1'
                    }
                    else {
                       return alert('新增失败')
                    }


                }
            })

        })


})
