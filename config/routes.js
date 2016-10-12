module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('login', {
            title: ''
        })
    })

    app.get('/login', function(req, res) {
        res.render('login', {
            title: ''
        })
    })

    app.get('/index', function(req, res) {
        res.render('index', {
            title: ''
        })
    })

    app.get('/paper', function(req, res) {
        res.render('paper', {
            title: ''
        })
    })

    app.get('/orders', function(req, res) {
        res.render('orders', {
            title: ''
        })
    })
}
