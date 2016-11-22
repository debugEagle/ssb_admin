$(function () {

        init()

        var id = getUrlParam('id')
        $('.GoAddMatchSetting').attr('href','/addMatchSetting?id=' + id)
        $('.GoAddMatchSerie').attr('href','/addMatchSerie?id=' + id)

    })
