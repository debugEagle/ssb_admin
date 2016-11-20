const multer = require('multer');
const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

var prefix = Conf.url

var api = {
    list: prefix + '/business/match/list',
    detail: prefix + '/business/match/detail',
    serieList: prefix + '/business/match/serie/serieList',
    serieDetail: prefix + '/business/match/serie/serieDetail',
    settingList: prefix + '/business/match/setting/settingList',
    settingDetail: prefix + '/business/match/setting/settingDetail',
}



// excel导入
exports.upload = function(req, res) {
   var exceltojson;
   load(req,res,function(err){
       if(err){
            res.json({error_code:1,err_desc:err});
            return;
       }
       /** Multer gives us file info in req.file object */
       if(!req.file){
           res.json({error_code:1,err_desc:"No file passed"});
           return;
       }
       /** Check the extension of the incoming file and
        *  use the appropriate module
        */
       if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx')
           exceltojson = xlsxtojson;
       else
           exceltojson = xlstojson;
       try {
           var userInfo = req.data
           exceltojson({
               input: req.file.path,
               output: null, //since we don't need output.json
               lowerCaseHeaders:true
           }, function(err,data){
               if(err)
                   return res.json({error_code:1,err_desc:err, data: null});
               res.json(data)
          });
       } catch (e) {
         res.json({error_code:1,err_desc:"Corupted excel file"});

       }
   })
}

// 添加赛事
exports.addMatch = function(req, res) {

    const settingLists = req.settingList.value
    const serieLists = req.serieList.value

          res.render('match/addMatch', {
                title: '发布赛事',
                role: req.user.role,
                username: req.user.businessName,
                settingLists: settingLists,
                serieLists: serieLists,
          })

}

// 赛事列表
exports.matchList = function(req, res) {

          res.render('match/matchList', {
                title: '赛事日历',
                role: req.user.role,
                username: req.user.businessName,
          })

}

// 赛事详情
exports.matchDetail = function (req, res, next) {

    const detail = req.detail.value

          res.render('match/matchDetail', {
                title: '赛事系列详情',
                role: req.user.role,
                username: req.user.businessName,
                detail: detail,
          })

}

// 赛事系列详情页
exports.matchSerieDetail = function (req, res) {

    const detail = req.serieDetail.value

          res.render('match/matchDetail', {
                title: '赛事系列详情',
                role: req.user.role,
                username: req.user.businessName,
                detail: detail,
          })

}

// 添加赛事系列
exports.addMatchSerie = function(req, res) {

          res.render('match/addMatchSerie', {
                title: '添加赛事系列表',
                role: req.user.role,
                username: req.user.businessName,
          })

}

// 赛事系列列表页
exports.matchSerieList = function(req, res) {

    const lists = req.serieList.value

          res.render('match/matchSerieList', {
                title: '添加俱乐部',
                role: req.user.role,
                username: req.user.businessName,
                lists: lists,
          })

}

// 赛事结构列表页
exports.matchSettingList = function(req, res) {

    const lists = req.settingList.value

          res.render('match/matchSettingList', {
                title: '添加俱乐部',
                role: req.user.role,
                username: req.user.businessName,
                lists: lists,
          })

}


// 比赛结构表详情页
exports.matchSettingDetail = function (req, res) {

    const detail = req.settingDetail.value
    const setting = detail.setting ? JSON.parse(detail.setting) : ''
    const bonuses = detail.bonuses ? JSON.parse(detail.bonuses) : ''

    res.setHeader('Set-Cookie', ['setting='+ setting, 'bonuses=' + bonuses])
    
    res.render('match/matchSettingDetail', {
          title: '比赛结构详情',
          role: req.user.role,
          username: req.user.businessName,
          detail: detail,
          setting: setting,
          bonuses: bonuses,
    })

}

// 赛事系列详情页
exports.matchSerieDetail = function (req, res) {

    const detail = req.serieDetail.value

          res.render('match/matchSerieDetail', {
                title: '赛事系列详情',
                role: req.user.role,
                username: req.user.businessName,
                detail: detail,
          })

}

// 添加比赛结构表页
exports.addMatchSetting = function(req, res) {

          res.render('match/addMatchSetting', {
                title: '添加赛事结构信息',
                role: req.user.role,
                username: req.user.businessName,
          })

}

// 获取赛事系列列表
exports.serieList = function (req, res, next) {
    const Cookies = {};
    const url = api.serieList

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }

    const opt = {
          url:url,
          json:true,
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.serieList = response.body

        next()
    })
}

// 获取比赛结构列表
exports.settingList = function (req, res, next) {
    const Cookies = {};
    const url = api.settingList

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }

    const opt = {
          url:url,
          json:true,
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.settingList = response.body

        next()
    })
}

// 获取比赛结构表详情
exports.serieDetail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.serieDetail + '?id=' + id

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }



    const opt = {
          url:url,
          json:true,
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.serieDetail = response.body

        next()
    })
}

// 获取比赛结构表详情
exports.settingDetail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.settingDetail + '?id=' + id

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }



    const opt = {
          url:url,
          json:true,
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.settingDetail = response.body

        next()
    })
}

// 获取赛事详情
exports.detail = function (req, res, next) {
    const Cookies = {};
    const id = req.params.id
    const url = api.detail + '?id=' + id

    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    const headers = {
       "Content-Type": "application/json",
       "authorization": "Bearer " + Cookies.tokenId,
    }

    const opt = {
          url:url,
          json:true,
          method:'get',
          headers:headers,
          "rejectUnauthorized": false,
    }

    request(opt).then(function (response) {

        req.detail = response.body

        next()
    })
}

function getDay() {
    var myDate = new Date()
    var day = myDate.getDay()
    var array = []

    for (i = 0,j = 1; i < 14; i++,j++) {
        array[i] = getthisDay(-day + j)
    }

    return array
}

function getthisDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //关键
    var tyear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    if (tDate < 10) {
        tDate = "0" + tDate;
    }
    tMonth = tMonth + 1;
    if (tMonth < 10) {
        tMonth = "0" + tMonth;
    }
    return tyear + "-" + tMonth + "-" + tDate + "";
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var load = multer({
                storage: storage,
                fileFilter : function(req, file, callback) {
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('错误的文件类型'));
                    }
                    callback(null, true);
                }
            }).single('file');
