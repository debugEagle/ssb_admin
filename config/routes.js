const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
const Club = require('../app/controllers/club');
const Match = require('../app/controllers/match');


var prefix = Conf.url

var api = {
    info: prefix + '/business/info',
}


module.exports = function (app) {

    app.get('/addClub', info, Club.addClub)

    app.post('/upload', info, Match.upload)

    app.get('/matchSettingList', info, Match.list, Match.matchSettingList)
    app.get('/matchSettingDetail/:id', info, Match.detail, Match.matchSettingDetail)
    app.get('/addMatchSetting', info, Match.addMatchSetting)
    app.get('/addMatch', info, Match.list, Match.addMatch)


    app.get('/login', function(req, res) {

        res.render('login', {
            title: ''
        })
    })

    app.get('/', info, function(req, res) {
        const data = req.data
        if ( data && data.code == 0) {
              res.render('index', {
                  role: data.value.role,
              })
        } else {
            res.render('error1', {})
        }

    })

    app.get('/paper', info, function(req, res) {
        const data = req.data
        if (req.data.code == 0) {
              res.render('paper', {
                  title: '门票验证',
                  role: data.value.role,
            })
        } else {
            res.render('error1', {})
        }
    })

    app.get('/orders', info, function(req, res) {
        const data = req.data
        if (data.code == 0) {
              res.render('orders', {
                    title: '订单查询',
                    role: data.value.role,
              })
        } else {
            res.render('error1', {})
        }

    })

    app.get('/publish', info, function(req, res) {
          const data = req.data
          if (data.code == 0) {
                res.render('publish', {
                      title: '发布赛事',
                      role: data.value.role,
                })
          } else {
                res.render('error1', {})
          }

    })

    app.get('/error', info, function(req, res) {
        const data = req.data
        res.render('error1', {
          role: data.value.role,
        })
    })

}


// 获取用户信息
var info = function (req, res, next) {
    const Cookies = {};
    const url = api.info

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }

    const opt = {
          url:url,
          json:true,
          method:'post',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.data = response.body

        next()
    })
}
