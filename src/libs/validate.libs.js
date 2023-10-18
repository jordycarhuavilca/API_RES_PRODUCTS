const validator = require('validator')

const isEmpty = (value)=> {
    
    if(Array.isArray(value)){
        for (var v of value) {
            if(validator.isEmpty(v)) return true
        }
       return false
    }
    if(validator.isEmpty(value)) return true
    return false
}
module.exports = isEmpty