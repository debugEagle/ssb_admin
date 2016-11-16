exports.vip = function(req, res) {
    const data = req.data
    if (req.data.code == 0) {
          res.render('casinoVip/vip', {
                //title: '添加俱乐部',
                role: data.value.role,
          })
    } else {
          res.render('error1', {})
    }
}
