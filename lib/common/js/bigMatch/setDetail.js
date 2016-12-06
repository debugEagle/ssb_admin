$(function () {
    init()

    const can_register = $('input[name=can_register]').val()
    const state = $('input[name=state]').val()
    const isPromoted = $('input[name=isPromoted]').val()
    const matchSetting_id = $('input[name=matchSetting_id]').val()
    const haveMatchSetting = $('input[name=haveMatchSetting]').val()
    const haveMatchBonus = $('input[name=haveMatchBonus]').val()
    const haveMatchResult = $('input[name=haveMatchResult]').val()

    if (can_register === 'false')
        $('select[name=can_register]').val('0')
    else
        $('select[name=can_register]').val('1')

    switch (state) {
      case '0':
        $('select[name=state]').val('0')
        break
      case '1':
        $('select[name=state]').val('1')
        break
      case '2':
        $('select[name=state]').val('2')
        break
      case '3':
        $('select[name=state]').val('3')
        break
      default:

    }

    if (isPromoted === 'false')
        $('select[name=isPromoted]').val('0')
    else
        $('select[name=isPromoted]').val('1')

    $('select[name=matchSetting]').val(matchSetting_id)

    if (haveMatchSetting === 'false')
        $('select[name=haveMatchSetting]').val('0')
    else
        $('select[name=haveMatchSetting]').val('1')

    if (haveMatchBonus === 'false')
        $('select[name=haveMatchBonus]').val('0')
    else
        $('select[name=haveMatchBonus]').val('1')

    if (haveMatchResult === 'false')
        $('select[name=haveMatchResult]').val('0')
    else
        $('select[name=haveMatchResult]').val('1')


    $('.success').click(function () {
          const setInfo = {}
          setInfo.id = $('input[name=id]').val()
          setInfo.can_register = $('select[name=can_register]').val()
          setInfo.state = $('select[name=state]').val()
          setInfo.isPromoted = $('select[name=isPromoted]').val()
          setInfo.matchSetting_id = $('select[name=matchSetting]').val()
          setInfo.haveMatchSetting = $('select[name=haveMatchSetting]').val()
          setInfo.haveMatchBonus = $('select[name=haveMatchBonus]').val()
          setInfo.haveMatchResult = $('select[name=haveMatchResult]').val()
          setInfo.discountWay = $('select[name=discountWay]').val()
          setInfo.discountValue = $('input[name=discountValue]').val()

          $.ajax({
              url:  `${prefix}/business/match/bigMatch/reviseMatchSetting`,
              beforeSend: function(request) {
                      request.setRequestHeader("authorization", "Bearer " + tokenId);
              },
              data: {
                  setInfo: setInfo,
              },
              async:true,
              crossDomain: true,
              type: 'post',
              dateType: 'json',
              success: function(data) {
                  if (data.code == 0) {
                    alert('修改成功')
                    return true
                  }else {
                    alert('修改失败')
                    return true
                  }

              }
          })
    })

})
