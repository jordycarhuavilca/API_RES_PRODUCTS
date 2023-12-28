class ConnectionError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'connectionError'
        this.statusCode = statusCode

    }
}

class ValidateError extends Error{
    constructor(msg,statusCode){
        super(msg,statusCode)
        this.message = msg
        this.name = 'validationError'
        this.statusCode = statusCode
    }
}

class NotFoundError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'notFoundError'
        this.statusCode = statusCode
    }
}

class InternalServerError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'InternalServerError'
        this.statusCode = statusCode
    }
}

class TransactionError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.message = msg
        this.name = 'transactionError'
        this.statusCode = statusCode
    }
}

module.exports = {
    ConnectionError,
    ValidateError,
    NotFoundError,
    InternalServerError,
    TransactionError
}