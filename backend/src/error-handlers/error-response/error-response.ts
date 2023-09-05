/*__________________________________________

 ✅ import
____________________________________________*/
import { NextFunction } from "express"
import errorResponseClass from "./_error-response-class.js"


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_error_response = {
    next: NextFunction
    status_code?: number
    message?: string
    error_object?: Error
}



/*__________________________________________

 ✅ util
____________________________________________*/

export default function error_response(payload: type_of_error_response) {

    const {
        next,
        status_code,
        message,
        error_object
    } = payload


    return next(new errorResponseClass(message, status_code, error_object))

}