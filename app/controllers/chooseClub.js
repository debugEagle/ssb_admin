exports.dailyChooseClub = function(req, res) {

          res.render('dailyMatch/chooseClub', {
                title: '选择俱乐部',
                role: req.user.role,
                username: req.user.businessName,
          })

}

exports.bigChooseClub = function(req, res) {

          res.render('bigMatch/chooseClub', {
                title: '选择俱乐部',
                role: req.user.role,
                username: req.user.businessName,
          })

}
