'use script'

const Http = Unify.http
var prefix = Conf.url

var api = {
    tourList: prefix + '/business/match/bigMatch/tourList',
    tourDetail: prefix + '/business/match/detail',
    serieList: prefix + '/business/match/bigMatch/serieList',
    serieDetail: prefix + '/business/match/bigMatch/serieDetail',
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

exports.tourList = function (req, res, next) {

    const url = api.tourList

    Http.get(url , data = '', tokenId = '').then((data) => {

          if (data.code == 0) {
              req.lists = data.value
          } else {
              res.render('login', {})
          }

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}

// 巡回赛详情
exports.bigMatchTourDetail = function(req, res) {
    const lists = req.lists.value

    res.render('bigMatch/tourDetail', {
          title: '巡回赛详情',
          role: req.user.role,
          username: req.user.businessName,
          lists: lists,
    })

}

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

// 大赛系列
exports.bigMatchSerieList = function(req, res) {

    const lists = req.lists.rows
    const organization_id = req.lists.organization_id

    res.render('bigMatch/serieList', {
          title: '大赛系列列表',
          role: req.user.role,
          username: req.user.businessName,
          lists: lists,
          organization_id: organization_id,
    })

}

exports.serieList = function(req, res, next) {

    const url = api.serieList
    const data = {id : req.params.id}

    Http.get(url , data, tokenId = '').then((data) => {

          if (data.code == 0) {
              req.lists = data.value
          } else {
              res.render('login', {})
          }

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}

// 大赛系列列表页
exports.bigMatchSerieDetail = function(req, res) {

    const detail = req.detail

    res.render('bigMatch/serieDetail', {
          title: '大赛系列详情',
          role: req.user.role,
          username: req.user.businessName,
          detail: detail,
    })

}

exports.serieDetail = function(req, res, next) {

    const url = api.serieDetail
    const data = {id : req.params.id}

    Http.get(url , data, tokenId = '').then((data) => {

          if (data.code == 0) {
              req.detail = data.value
          }

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}

// 添加大赛系列
exports.addBigMatchSerie = function(req, res) {

    const lists = req.lists
    const id = req.params.id

    res.render('bigMatch/addSerie', {
          title: '添加大赛系列',
          role: req.user.role,
          username: req.user.businessName,
          lists: lists,
          organization_id: id,
    })

}
