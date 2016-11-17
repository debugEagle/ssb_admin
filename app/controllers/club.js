exports.addClub = function(req, res) {

          res.render('addClub', {
                title: '添加俱乐部',
                role: req.user.role,
                username: req.user.businessName,
          })

}
