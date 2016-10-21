'use strict'

const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
var data

var prefix = 'https://www.91buyin.com'

var api = {
    info: prefix + '/business/info',
}


module.exports = function (app) {

    app.get('/', function(req, res) {

        res.render('login', {
            title: ''
        })
    })

    app.get('/index', info, function(req, res) {

        if ( data && data.code == 0) {
              res.render('index', {
                  username: data.value.businessName,
                  role: data.value.role,
              })
        } else {
              res.render('index', {})
        }

    })

    app.get('/paper', info, function(req, res) {

        if (data.code == 0) {
              res.render('paper', {
                  title: '门票验证',
                  username: data.value.businessName,
                  role: data.value.role,
            })
        } else {
              res.render('paper', {})
        }
    })

    app.get('/orders', info, function(req, res) {

        if (data.code == 0) {
              res.render('orders', {
                    title: '订单查询',
                    username: data.value.businessName,
                    role: data.value.role,
              })
        } else {
              res.render('orders', {})
        }

    })

    app.get('/publish', info, function(req, res) {

          if (data.code == 0) {
                res.render('publish', {
                      title: '发布赛事',
                      username: data.value.businessName,
                      role: data.value.role,
                })
          } else {
                res.render('publish', {})
          }

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
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        data = response.body

        next()
    })


}
