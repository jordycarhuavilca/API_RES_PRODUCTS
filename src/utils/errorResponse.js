const constant = require("../utils/constant");

export function errorResponse(err){
    if (err.name === 'connectionError') {
        return constant.serverError
    }
}