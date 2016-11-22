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
