'use strict'

var Promise =require('bluebird')
var request = Promise.promisify(require('request'))

const unify = {}

unify.http = (url, data, tokenId, method) => {

      const headers = {
         "Content-Type": "application/json",
         "authorization": "Bearer " + tokenId,
      }

      const opts = {
            url: url,
            json: true,
            method: method,
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
