exports.chooseClub = function(req, res) {

          res.render('chooseClub', {
                title: '选择俱乐部',
                role: req.user.role,
                username: req.user.businessName,
          })

}
