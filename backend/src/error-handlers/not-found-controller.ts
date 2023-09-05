// libraries
import { StatusCodes } from 'http-status-codes'

// utils
import error_response from './error-response/error-response.js'

// types
import { Request, Response, NextFunction } from 'express'




const not_found_controller = (req: Request, res: Response, next: NextFunction) => {

    return next(

        error_response({
            next:next,
            status_code: StatusCodes.NOT_FOUND,
            message: `This '${req.originalUrl}' route doesn't exist on the server or you are requesting with the wrong HTTP method.`
        })

    )

}

export default not_found_controller
