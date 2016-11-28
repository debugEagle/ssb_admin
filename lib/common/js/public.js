function init() {

  tokenId = $.cookie('tokenId')
  //prefix = 'http://localhost:3000'
  prefix = 'https://api.91buyin.com'

  $('.logout').click(function () {
      $.cookie('tokenId', null);
      self.location = '/login'
  })

  $('.back').click(function() {
      history.back()
  })


}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function RQcheck(RQ) {
    var date = RQ;
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

    if (result == null)
        return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);

}

function checkTime(time){

    var regTime = /^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
    var result = false;
    if (regTime.test(time)) {
        if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60) && (parseInt(RegExp.$3) < 60)) {
            result = true;
        }
    }

	  return result;
}
