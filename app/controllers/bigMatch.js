'use script'

const Http = Unify.http
var prefix = Conf.url

var api = {
    tourList: prefix + '/business/match/bigMatch/tourList',
    tourDetail: prefix + '/business/match/detail',
    serieList: prefix + '/business/match/bigMatch/serieList',
    serieDetail: prefix + '/business/match/bigMatch/serieDetail',
    detail: prefix + '/business/match/bigMatch/detail',
    setInfo: prefix + '/business/match/bigMatch/setInfo',
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

// 添加大赛
exports.addBigMatch = function(req, res) {

    const id = req.params.id

    res.render('bigMatch/addBigMatch', {
          title: '发布大赛',
          role: req.user.role,
          username: req.user.businessName,
          id: id,
    })

}

// 大赛详情
exports.bigMatchDetail = function(req, res) {

    const id = req.params.id
    const detail = req.detail.rows

    detail.forEach(function (item) {

        switch (item.can_register) {
          case true:
            item.can_register = '是'
            break;
          case false:
            item.can_register = '否'
            break;
          default:
        }
        switch (item.need_exchange) {
          case true:
            item.need_exchange = '是'
            break;
          case false:
            item.need_exchange = '否'
            break;
          default:
        }
        switch (item.isPromoted) {
          case true:
            item.isPromoted = '是'
            break;
          case false:
            item.isPromoted = '否'
            break;
          default:
        }
        switch (item.haveMatchSetting) {
          case true:
            item.haveMatchSetting = '有'
            break;
          case false:
            item.haveMatchSetting = '无'
            break;
          default:
        }
        switch (item.haveMatchBonus) {
          case true:
            item.haveMatchBonus = '有'
            break;
          case false:
            item.haveMatchBonus = '无'
            break;
          default:
        }
        switch (item.haveMatchResult) {
          case true:
            item.haveMatchResult = '有'
            break;
          case false:
            item.haveMatchResult = '无'
            break;
          default:
        }
    })

    res.render('bigMatch/detail', {
          title: '大赛详情',
          role: req.user.role,
          username: req.user.businessName,
          detail: detail,
          id: id,
    })

}

exports.detail = function(req, res, next) {

    const url = api.detail
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

// 大赛设置
exports.setDetail = function(req, res) {

    const id = req.params.id
    const setInfo = req.setInfo

    res.render('bigMatch/setDetail', {
          title: '大赛设置',
          role: req.user.role,
          username: req.user.businessName,
          id: id,
          setInfo: setInfo,
    })

}

exports.setInfo = function(req, res, next) {

    const url = api.setInfo
    const data = {id : req.params.id}

    Http.get(url , data, tokenId = '').then((data) => {

          if (data.code == 0) {
              req.setInfo = data.value
          }

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}
