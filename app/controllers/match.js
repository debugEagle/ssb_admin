const multer = require('multer');
const Promise =require('bluebird')
const request = Promise.promisify(require('request'))
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

var prefix = Conf.url

var api = {
    settingList: prefix + '/business/match/settingList',
    settingDetail: prefix + '/business/match/settingDetail',
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

// 比赛结构列表页
exports.matchSettingList = function(req, res) {
    const data = req.data.value

    const lists = req.settingList.value

    if (req.data.code == 0 && req.settingList.code == 0) {
          res.render('match/matchSettingList', {
                title: '添加俱乐部',
                role: data.role,
                lists: lists,
          })
    } else {
          res.render('error1', {})
    }
}

// 比赛结构表详情页
exports.matchSettingDetail = function (req, res, next) {
    const data = req.data.value

    const detail = req.settingDetail.value

    const setting = detail.setting ? JSON.parse(detail.setting) : ''
    const bonuses = detail.bonuses ? JSON.parse(detail.bonuses) : ''

    if (req.data.code == 0 && req.settingDetail.code == 0) {
          res.cookie('setting', detail.setting, {path: '/matchSettingDetail'})
          res.cookie('bonuses', detail.bonuses, {path: '/matchSettingDetail'})
          res.render('match/matchSettingDetail', {
                title: '比赛结构详情',
                role: data.role,
                detail: detail,
                setting: setting,
                bonuses: bonuses,
          })
    } else {
          res.render('error1', {})
    }
}

// 添加比赛结构表页
exports.addMatchSetting = function(req, res) {
    const data = req.data

    if (req.data.code == 0) {
          res.render('match/addMatchSetting', {
                title: '添加赛事结构信息',
                role: data.value.role,
          })
    } else {
          res.render('error1', {})
    }
}

// 添加比赛页
exports.addMatch = function(req, res) {
    const data = req.data

    const lists = req.settingList.value

    if (req.data.code == 0) {
          res.render('match/addMatch', {
                title: '发布赛事',
                role: data.value.role,
                lists: lists,
          })
    } else {
          res.render('error1', {})
    }
}

// 获取比赛结构列表
exports.list = function (req, res, next) {
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
exports.detail = function (req, res, next) {
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
