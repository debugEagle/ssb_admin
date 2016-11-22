'use strict'

var Promise =require('bluebird')
var request = Promise.promisify(require('request'))

const unify = {}

unify.http = {}

unify.http.get = (url, params, tokenId) => {

      const headers = {
         "Content-Type": "application/json",
         "authorization": "Bearer " + tokenId,
      }

      if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
      }

      const opts = {
            url: encodeURI(url),
            method: 'GET',
            json: true,
            headers: headers,
            "rejectUnauthorized": false,
      }


      return new Promise((resolve,reject) => {
          request(opts).then((response) => {
              var data = response.body

              resolve(data)
          })
          .catch((err) => {
              reject(err)
          })
      })

}

unify.http.post = (url, data, tokenId) => {

      const headers = {
         "Content-Type": "application/json",
         "authorization": "Bearer " + tokenId,
      }

      const opts = {
            url: encodeURI(url),
            method: 'POST',
            json: true,
            body: JSON.stringify(data),
            headers: headers,
            "rejectUnauthorized": false,
      }


      return new Promise((resolve,reject) => {
          request(opts).then((response) => {
              var data = response.body

              resolve(data)
          })
          .catch((err) => {
              reject(err)
          })
      })

}


module.exports = unify
