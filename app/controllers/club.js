exports.addClub = function(req, res) {
    const data = req.data
    if (req.data.code == 0) {
          res.render('addClub', {
                title: '添加俱乐部',
                role: data.value.role,
          })
    } else {
         res.render('error1', {})
    }
}
