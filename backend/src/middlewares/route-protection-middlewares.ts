/*__________________________________________

 ✅ import
____________________________________________*/

// library
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

// types
import { Request, Response, NextFunction } from 'express'

// model
import user_model from '../models/user-model.js'

// utils
import tryCatchAsync from '../error-handlers/try-catch-async.js'
import error_response from '../error-handlers/error-response/error-response.js'
import config_obj from '../config/index.js'
import clear_cookie from '../utils/cookie/clear-cookie.js'
import send_cookie from '../utils/cookie/send-cookie.js'








/*__________________________________________

 ✅ sign_in_required middleware
____________________________________________*/

const sign_in_required = tryCatchAsync(async (req: any, res: Response, next: NextFunction) => {

    // 🥪 Check if there is a token in the cookie or not 
    let token

    if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if (!token) {

        // first make sure that browser still doesn't have "user_info" cookie, otherwise frontend route protection will be compromised!
        clear_cookie({
            res: res,
            cookie_name: 'user_info'
        })

        // then send json response and return
        return error_response({
            next: next,
            status_code: StatusCodes.UNAUTHORIZED,
            message: 'You are not logged in or the access token has expired! Please log in to get the access.'
        })
    }


    // 🥪 Decode the token 
    const decoded: any = await jwt.verify(token, config_obj.env.jwt_access_token_secret)



    // 🥪 Checking whether the user belonging to the token exists or not 
    const authorized_user = await user_model.findById(decoded.user_id)

    if (!authorized_user) {

        // Clearing invalid cookies from the user's browser
        clear_cookie({
            res: res,
            cookie_name: 'user_info'
        })

        clear_cookie({
            res: res,
            cookie_name: 'access_token'
        })

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'The user belonging to the token does no longer exist. Maybe the account has been deleted or suspended.'
        })

    }


    // 🥪 Check whether the user was inactive for 7 days or not, if seven days or more have passed, we will restrict the user and user will need to log in again 
    const current_time_unix_timestamp = Date.now()
    const seven_days_in_milliseconds = 7 * 24 * 60 * 60 * 1000
    const user_last_access_unix_timestamp = Number(authorized_user.last_access_unix_timestamp)

    const seven_days_or_more_have_passed = current_time_unix_timestamp - seven_days_in_milliseconds >= user_last_access_unix_timestamp


    if (seven_days_or_more_have_passed) {

        // Clearing invalid cookies from the user's browser
        clear_cookie({
            res: res,
            cookie_name: 'user_info'
        })

        clear_cookie({
            res: res,
            cookie_name: 'access_token'
        })

        return error_response({
            next: next,
            status_code: StatusCodes.FORBIDDEN,
            message: 'The user belonging to the token was not active for 7 or more days. The user needs to Sign in again.'
        })
    }




    /* 🥪 
        if everything is ok, that means the user is authorized and can access the protected route, but first we need to do the following things before calling next():

        1. Update the user's last access unix timestamp 
        2. Send the user a new access token
        3. Send another cookie with user info 
        4. Create req.user because we will need that in the next middleware or controller
        5. Call the next() to go to next middleware


    */



    // 🍔 Update the user's last access unix timestamp 
    const filter = { _id: authorized_user._id }
    const update = { last_access_unix_timestamp: Date.now() }
    const options = { new: true }

    const updated_user = await user_model.findOneAndUpdate(filter, update, options)


    // 🍔 To extend the lifetime of the access token, Send a new access token with httpOnly cookie 
    send_cookie({
        res: res,
        cookie_type: 'access_token',
        user_document: updated_user
    })

    // 🍔 Send updated user info as cookie, not httpOnly
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: updated_user
    })


    // 🍔 Create req.user because we will need that in the next middleware or controller
    req.user = updated_user


    // 🍔  Call the next() to go to next middleware
    next()

})






/*__________________________________________

 ✅ verified_email_required
____________________________________________*/

const verified_email_required = tryCatchAsync(async (req, res: Response, next: NextFunction) => {

    /* 🥪 checking whether the user's email is verified or not 🥪 */
    if (req.user.is_email_verified === false) {

        error_response({
            next: next,
            status_code: StatusCodes.FORBIDDEN,
            message: 'You must verify your email address before trying the access this route'
        })

    }


    // proceed to next middleware or route
    next()
})




/*__________________________________________

 ✅ no_sign_in_required middleware
____________________________________________*/




const no_sign_in_required = async (req: any, res: Response, next: NextFunction) => {


    /*  if there are no cookies or no 'access_token' cookie in the request, proceed to the next middleware or route handler */
    if (!req.cookies || !req.cookies.access_token) {
        return next()
    }

    /* retrieve the 'access_token' from the cookies */
    let token = req.cookies.access_token;

    try {
        /* attempt to decode the JWT token, this verifies the integrity of the token and extracts the payload */
        const decoded: any = await jwt.verify(token, config_obj.env.jwt_access_token_secret);

        /* attempt to find a user in the database with the 'user_id' that was decoded from the JWT token */
        const authorized_user = await user_model.findById(decoded.user_id);

        /* if no user is found with that 'user_id', proceed to the next middleware or route handler */
        if (!authorized_user) {
            return next();
        }

        else {

            /* if a user is found with that 'user_id', respond with an error message */
            return error_response({
                next: next,
                status_code: StatusCodes.UNAUTHORIZED,
                message: 'This feature is available only for not signed in user. It looks like you are already signed in. Please sign out if you wish to use this feature.'
            })
        }
    }

    catch (err) {
        /* if an error occurs (e.g., the token is invalid), it is assumed that the token is invalid token and the user is not signed, so proceed to the next middleware or route handler */

        return next()
    }
}




/*__________________________________________

 ✅ user_role_protection
____________________________________________*/

const user_role_protection = (...roles) => {

    return (req, res: Response, next: NextFunction) => {

        // getting the req.user from the last middleware
        if (!roles.includes(req.user.role)) {


            error_response({
                next: next,
                status_code: StatusCodes.FORBIDDEN,
                message: `You do not have permission to access this route. Only ${roles.join(' or ')} can access this route.`
            })
        }

        // proceed to next middleware or route
        next()
    }

}




/*__________________________________________

 ✅ export
____________________________________________*/

export {
    no_sign_in_required,
    sign_in_required,
    verified_email_required,
    user_role_protection
}