class CustomErrorHandler extends Error {
    constructor(statuscode, message) {
        super(message);
        this.status = statuscode;
    }
    static badRequest(message) {
        return new CustomErrorHandler(400, message);
    }
    static accessDenied(message = 'Access denied!') {
        return new CustomErrorHandler(403, message);
    }
    static alreadyExist(message = 'user already exist.') {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = 'email or password are invalid.') { 
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message = 'un-authorized user!') {
        return new CustomErrorHandler(401, message);
    }

    static notFound(message = 'not found!') {
        return new CustomErrorHandler(404, message);
    }

    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;
