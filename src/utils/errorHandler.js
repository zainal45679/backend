import logger from "./logger.js";
import { statusCode } from "./statusCode.js";

export const customError = (status, message) =>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};

export const notFoundError = (message = 'Page not found') =>{
    const err = new Error();
    err.status = statusCode.notFound;
    err.message = message;
    return err;
};

export const validationError = (message) =>{
    const err = new Error();
    err.status = statusCode.success;
    err.message = message;
    return err;
};

export const userNotFoundError = (message) =>{
    const err = new Error();
    err.status = statusCode.userNotFoundError;
    err.message = message;
    return err;
};

export const serverError = (error, message = "Internal server error") =>{
    logger.error(message, error);
    const err = new Error();
    err.status = statusCode.userNotFoundError;
    err.message = message;
    return err;
};

export const unautorizedError = (message = "Unauthorized / Token Expired") =>{
    const err = new Error();
    err.status = statusCode.unauthorized;
    err.message = message;
    return err;
};


