const validator = require('validator')

class Validate{

    isEmpty = (value)=> {
        
        if(Array.isArray(value)){
            for (var v of value) {
                if(validator.isEmpty(v)) return true
            }
           return false
        }
        if(validator.isEmpty(value)) return true
        return false
    }
    
    copyArray  = (list) =>{
        // copia profunda de una array
        return JSON.parse(JSON.stringify(list));
    }
}
module.exports = new Validate