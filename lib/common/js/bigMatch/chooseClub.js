$(function () {

        init()

        $('select[name=continent]').change(function () {
            const continent =  $(this).children('option:selected').val()

            $.ajax({
                url:  `${prefix}/business/match/bigMatch/country?continent=${continent}`,
                async:true,
                crossDomain: true,
                type: 'get',
                dateType: 'json',
                success: function(data) {
                    $('select[name=country]').html('')
                    var rows = data.value.rows
                    var text = `<option value=0, selected='true'>请选择</option>`
                    rows.forEach(function (item) {
                        text += `<option value=${item.country_id}>${item.country}</option>`
                    })

                    $('select[name=country]').html(text)

                }
            })
        })

        $('select[name=country]').change(function () {
            const country_id =  $(this).children('option:selected').val()

            $.ajax({
                url:  `${prefix}/business/match/bigMatch/city?country_id=${country_id}`,
                async:true,
                crossDomain: true,
                type: 'get',
                dateType: 'json',
                success: function(data) {

                    $('select[name=city]').html('')
                    var rows = data.value.rows
                    var text = `<option value=0, selected='true'>请选择</option>`
                    rows.forEach(function (item) {
                        text += `<option value=${item.city_id}>${item.city}</option>`
                    })

                    $('select[name=city]').html(text)

                }
            })
        })

        $('select[name=city]').change(function () {
            const city_id =  $(this).children('option:selected').val()

            $.ajax({
                url:  `${prefix}/business/match/bigMatch/cityClub?city_id=${city_id}`,
                async:true,
                crossDomain: true,
                type: 'get',
                dateType: 'json',
                success: function(data) {

                    $('select[name=organization]').html('')
                    var rows = data.value.rows
                    var text = `<option value='0', selected='true'>请选择</option>`
                    rows.forEach(function (item) {
                        text += `<option value=${item.organization_id}>${item.name}</option>`
                    })

                    $('select[name=organization]').html(text)

                }
            })
        })

        $('.success').click(function () {
            const id = $('select[name=organization]').val()

            if (id == 0)
                return alert('请选择组织')

            self.location = `/bigMatchSerieList/${id}`
        })



    })
