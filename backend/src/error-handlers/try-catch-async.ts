// importing package
import { StatusCodes } from 'http-status-codes'

// importing utils
import errorResponseClass from './error-response/_error-response-class.js'


// Declaring a function called tryCatchAsync that takes another function (fn) as an argument.
const tryCatchAsync = (fn) => {


    // Returning  an async function that takes three parameters: req (the request object), res (the response object), and next (the next middleware function). This function is an express middleware that wraps the fn function in a try…catch block.
    return async (req, res, next) => {

        try {

            // Calling the fn function with the req, res, and next arguments and awaiting its completion. The fn function is expected to be an async function that handles some logic for the request and response.
            await fn(req, res, next)
        }


        catch (error) {

            // Creating a new instance of errorResponseClass with the error message, the 500 status code (which means internal server error), and the original error object as arguments. Then passing this instance to the next middleware function using the next function. This way, the error is handled by a global error handler that can send an appropriate response to the client.
            return next(new errorResponseClass(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error))

        }
    }

}


export default tryCatchAsync