exports.vip = function(req, res) {

          res.render('casinoVip/vip', {
                //title: '添加俱乐部',
                role: req.user.role,
                username: req.user.businessName,
          })

}
