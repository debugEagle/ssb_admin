'use script'

const Http = Unify.http
const prefix = Conf.url

const api = {
    getResult: prefix + '/business/match/dailyMatch/getResult',
}

exports.result = function(req, res) {

    res.render('dailyMatch/result', {
          title: '日赛结果',
          role: req.user.role,
          username: req.user.businessName,
    })
}

exports.addResult = function(req, res) {

    res.render('dailyMatch/addResult', {
          title: '添加日赛结果',
          role: req.user.role,
          username: req.user.businessName,
    })
}

// 日赛结果详情
exports.resultDetail = function (req, res) {

    const detail = req.detail
    const result = detail.result ? JSON.parse(detail.result) : ''

    res.cookie('result', detail.result)
    res.render('dailyMatch/resultDetail', {
          title: '日赛结果详情',
          role: req.user.role,
          username: req.user.businessName,
          detail: detail,
          result: result,
    })
}

// 获取日赛结果
exports.getResult = function (req, res, next) {

    const tokenId = req.cookies.tokenId
    const url = api.getResult
    const data = {id : req.query.id}

    Http.get(url , data, tokenId).then((data) => {
          if (data.code == 0) {
              req.detail = data.value
          } else {
              res.render('login', {})
          }

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}
