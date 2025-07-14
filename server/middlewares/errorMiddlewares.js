class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


export const errormiddleware = (err, req, res, next)=>{
    err.message = err.message || 'internal server error';
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000){
        const statusCode = 400;
        const message = 'Duplicate entry';
        err = new ErrorHandler(message, statusCode);
    }

    if(err.name === "JsonWebTokenError"){
        const statusCode = 401;
        const message = 'Invalid token';
        err = new ErrorHandler(message, statusCode);
    }

    if(err.name === "TokenExpiredError"){
        const statusCode = 401;
        const message = 'Token expired';
        err = new ErrorHandler(message, statusCode);
    }

    if(err.name === "CasteError"){
        const statusCode = 400;
        const message = `Resoured not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, statusCode);
    }

    const errorMessage = err.errors? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
}

export default ErrorHandler;