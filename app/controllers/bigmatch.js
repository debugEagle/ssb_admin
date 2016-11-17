const multer = require('multer');
const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

var prefix = Conf.url

var api = {
    tourList: prefix + '/business/match/bigMatch/tourList',
    tourDetail: prefix + '/business/match/detail',
    serieList: prefix + '/business/match/serie/serieList',
    serieDetail: prefix + '/business/match/serie/serieDetail',
    settingList: prefix + '/business/match/setting/settingList',
    settingDetail: prefix + '/business/match/setting/settingDetail',
}


// 巡回赛列表
exports.bigMatchTourList = function(req, res) {
    const lists = req.lists.value

          res.render('bigMatch/tourList', {
                title: '巡回赛列表',
                role: req.user.role,
                username: req.user.businessName,
                lists: lists,
          })

}

// 巡回赛详情
exports.bigMatchTourDetail = function(req, res) {
    const role = req.role
    const lists = req.lists.value

          res.render('bigMatch/tourDetail', {
                title: '巡回赛详情',
                role: req.user.role,
                username: req.user.businessName,
                lists: lists,
          })

}

// 获取巡回赛列表
exports.tourList = function (req, res, next) {
    const tokenId = req.cookies.tokenId
    const url = api.tourList

    const data = Unify.http(url , '', tokenId, 'get').then((data) => {
          req.lists = data

          next()

    }, (err) => {
        logger.warn(err.cause)
    })
}

// 获取巡回赛详情
exports.tourDetail = function (req, res, next) {
    const tokenId = req.cookies.tokenId
    const url = api.tourDetail

    const data = Unify.http(url , '', tokenId, 'get').then((data) => {
          req.lists = data

          next()

    }, (err) => {
        logger.warn(err.cause)
    })
}

// 获取大赛
exports.addTour = function (req, res, next) {
    const role = req.role

          res.render('bigMatch/addTour', {
                title: '添加巡回赛',
                role: role,
          })

}

// 添加赛事系列
exports.addMatchSerie = function(req, res) {
    const data = req.data

    if (req.data.code == 0) {
          res.render('match/addMatchSerie', {
                title: '添加赛事系列表',
                role: data.value.role,
          })
    } else {
          res.render('login', {})
    }
}

// 赛事系列列表页
exports.matchSerieList = function(req, res) {
    const data = req.data.value

    const lists = req.serieList.value

    if (req.data.code == 0 && req.serieList.code == 0) {
          res.render('match/matchSerieList', {
                title: '添加俱乐部',
                role: data.role,
                lists: lists,
          })
    } else {
          res.render('login', {})
    }
}

// 赛事结构列表页
exports.matchSettingList = function(req, res) {
    const data = req.data.value

    const lists = req.settingList.value

    if (req.data.code == 0 && req.settingList.code == 0) {
          res.render('match/matchSettingList', {
                title: '添加俱乐部',
                role: data.role,
                lists: lists,
          })
    } else {
          res.render('login', {})
    }
}


// 比赛结构表详情页
exports.matchSettingDetail = function (req, res, next) {
    const data = req.data.value

    const detail = req.settingDetail.value

    const setting = detail.setting ? JSON.parse(detail.setting) : ''
    const bonuses = detail.bonuses ? JSON.parse(detail.bonuses) : ''

    if (req.data.code == 0 && req.settingDetail.code == 0) {
          res.cookie('setting', detail.setting, {path: '/matchSettingDetail'})
          res.cookie('bonuses', detail.bonuses, {path: '/matchSettingDetail'})
          res.render('match/matchSettingDetail', {
                title: '比赛结构详情',
                role: data.role,
                detail: detail,
                setting: setting,
                bonuses: bonuses,
          })
    } else {
          res.render('login', {})
    }
}

// 赛事系列详情页
exports.matchSerieDetail = function (req, res, next) {
    const data = req.data.value

    const detail = req.serieDetail.value

    if (req.data.code == 0 && req.serieDetail.code == 0) {
          res.render('match/matchSerieDetail', {
                title: '赛事系列详情',
                role: data.role,
                detail: detail,
          })
    } else {
          res.render('login', {})
    }
}

// 添加比赛结构表页
exports.addMatchSetting = function(req, res) {
    const data = req.data

    if (req.data.code == 0) {
          res.render('match/addMatchSetting', {
                title: '添加赛事结构信息',
                role: data.value.role,
          })
    } else {
          res.render('login', {})
    }
}

// 获取赛事系列列表
exports.serieList = function (req, res, next) {
    const Cookies = {};
    const url = api.serieList

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
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.serieList = response.body

        next()
    })
}

// 获取比赛结构列表
exports.settingList = function (req, res, next) {
    const Cookies = {};
    const url = api.settingList

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
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.settingList = response.body

        next()
    })
}

// 获取比赛结构表详情
exports.serieDetail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.serieDetail + '?id=' + id

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
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.serieDetail = response.body

        next()
    })
}

// 获取比赛结构表详情
exports.settingDetail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.settingDetail + '?id=' + id

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
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.settingDetail = response.body

        next()
    })
}

// 获取赛事详情
exports.detail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.detail + '?id=' + id

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
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.detail = response.body

        next()
    })
}
