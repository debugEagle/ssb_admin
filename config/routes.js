'use strict'

const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
const Share = require('../app/controllers/share')
const Club = require('../app/controllers/club')
const Match = require('../app/controllers/match')
const DailyMatch = require('../app/controllers/dailyMatch')
const BigMatch = require('../app/controllers/bigMatch')
const CasinoVip = require('../app/controllers/casinoVip')
const ChooseClub = require('../app/controllers/chooseClub')
const Http = Unify.http
const logger = log4js.getLogger('[routes-info]')


var prefix = Conf.url

var api = {
    info: prefix + '/business/info',
    share: prefix + '/business/share',
}


module.exports = function (app) {

    app.use('/share/:id', function (req, res, next) {
        const url = api.share
        const data = {id : req.params.id}
        var tokenId = ''

        Http.get(url , data, tokenId).then((data) => {
              if (data.code == 0) {
                const content = data.value

                res.render('share', {
                      title: '分享页面',
                      content: content,
                })
              }

        }, (err) => {
            logger.warn(err.cause)
        })
    })


    app.use((req, res, next) => {
        const tokenId = req.cookies.tokenId
        const url = api.info

        const data = Unify.http.get(url , '', tokenId).then((data) => {
              if (data.code == 0) {
                  req.user = data.value
              } else {
                  res.render('login', {})
              }

              next()

        }, (err) => {
            logger.warn(err.cause)
        })
    })


    app.get('/addClub', Club.addClub)

    app.post('/upload', Match.upload)

    //日赛
    app.get('/addMatch', Match.settingList,Match.serieList, Match.addMatch)
    app.get('/matchList', Match.matchList)
    app.get('/matchDetail/:id', Match.detail, Match.matchDetail)

    //日赛系列
    app.get('/addMatchSerie', Match.addMatchSerie)
    app.get('/matchSerieList', Match.serieList, Match.matchSerieList)
    app.get('/matchSerieDetail/:id', Match.serieDetail, Match.matchSerieDetail)

    //赛事结构
    app.get('/addMatchSetting', Match.addMatchSetting)
    app.get('/matchSettingList', Match.settingList, Match.matchSettingList)
    app.get('/matchSettingDetail/:id', Match.settingDetail, Match.matchSettingDetail)

    //大赛
    app.get('/addTour', BigMatch.addTour)
    app.get('/addBigMatch/:id', BigMatch.addBigMatch)
    app.get('/setDetail/:id',BigMatch.setInfo, BigMatch.setDetail)
    app.get('/addBigMatchSerie/:id', BigMatch.tourList, BigMatch.addBigMatchSerie)
    app.get('/bigMatchDetail/:id', BigMatch.detail, BigMatch.bigMatchDetail)
    app.get('/bigMatchTourList', BigMatch.tourList, BigMatch.bigMatchTourList)
    app.get('/bigMatchTourDetail', BigMatch.tourDetail, BigMatch.bigMatchTourDetail)
    app.get('/bigMatchSerieList/:id', BigMatch.serieList, BigMatch.bigMatchSerieList)
    app.get('/bigMatchSerieDetail/:id', BigMatch.serieDetail, BigMatch.bigMatchSerieDetail)


    //选择俱乐部
    app.get('/dailyChooseClub', ChooseClub.dailyChooseClub)
    app.get('/bigChooseClub/:id', ChooseClub.bigChooseClub)

    //赛事结果
    app.get('/dailyMatchResult', DailyMatch.result)
    app.get('/addResult', DailyMatch.addResult)
    app.get('/resultDetail', DailyMatch.getResult, DailyMatch.resultDetail)
    app.get('/addBigMatchResult/:id', BigMatch.isPromoted, BigMatch.addBigMatchResult)
    app.get('/bigMatchResultLists/:id', BigMatch.resultLists, BigMatch.bigMatchResultLists)
    app.get('/bigMatchResultDetail/:id', BigMatch.isPromoted, BigMatch.resultDetail, BigMatch.bigMatchResultDetail)


    app.get('/vip', CasinoVip.vip)

    app.get('/login', function(req, res) {

        res.render('login', {
            title: ''
        })
    })

    app.get('/', function(req, res) {

        res.render('index', {
            role: req.user.role,
            username: req.user.businessName
        })
    })

    app.get('/paper', function(req, res) {

        res.render('paper', {
            title: '门票验证',
            role: req.user.role,
            username: req.user.businessName
        })

    })

    app.get('/orders', function(req, res) {

        res.render('orders', {
              title: '订单查询',
              role: req.user.role,
              username: req.user.businessName
        })


    })

    app.get('/publish', function(req, res) {

          res.render('publish', {
                title: '发布赛事',
                role: req.user.role,
                username: req.user.businessName
          })


    })

    app.get('/error', function(req, res) {

        res.render('error1', {
            role: req.user.role,
            username: req.user.businessName
        })
    })

}
