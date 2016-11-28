$(function() {
    init()

    $('.success').click(function () {
        var id = $('input[name=id]').val()
        var bigMatchId = $('input[name=bigMatchId]').val()
        if (bigMatchId === '0')
            self.location = `/addBigMatch/${id}`
        else
            self.location = `/bigMatchDetail/${id}`
    })
})
