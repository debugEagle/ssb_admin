'use script'

const Http = Unify.http
var prefix = Conf.url

var api = {
    share: prefix + '/business/share',
}

exports.shareMatch = function(req, res) {

    const content = req.content

    res.render('share', {
          title: '分享页面',
          content: content,
    })

}

exports.content = function(req, res, next) {

    const url = api.share
    const data = {id : req.params.id}

    Http.get(url , data, tokenId = '').then((data) => {
          if (data.code == 0)
              req.content = data.value

          next()

    }, (err) => {
        logger.warn(err.cause)
    })

}
