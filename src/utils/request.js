const axios = require("axios");

const doRequest = async (method,url,data) =>{

    const config = {
        method: method.toLowerCase(),
        url: url,
        baseURL: process.env['BASE_URL'],
        headers: { 'Authorization': 'Bearer ' + 'jordy393'}
        // validateStatus: function (status) {
        //   console.log(status)
        //   return status >= 200 && status < 400
        // }
    }
    
    if (data) {
        config.data = data
    }

    const response = await axios(config)
    return response.data
    
}

module.exports = {
    doRequest
}