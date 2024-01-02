const axios = require("axios");

const doRequest = async (method,url,body) =>{
    const config = {
        method: method.toLowerCase(),
        url: url,
        baseURL: process.env['BASE_URL'],
        headers: { 'Authorization': 'Bearer ' + 'jordy393'},
        validateStatus: function (status) {
          console.log(status)
          return status >= 200 && status < 400
        }
    }
    if (body) {
        config.body = body
    }
   const respon =  await axios(config)
   console.log(respon)
   return respon
}
module.exports = {
    doRequest
}