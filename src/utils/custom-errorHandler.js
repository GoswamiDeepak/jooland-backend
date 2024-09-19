class CustomErrorHandler extends Error {
    constructor(statuscode, message) {
        super(message);
        this.status = statuscode;
        // this.message = message;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message) {
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message = 'un-authorized user!') {
        return new CustomErrorHandler(401, message);
    }

    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;
