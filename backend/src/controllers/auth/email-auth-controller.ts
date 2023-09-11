/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

// types
import { Request, Response, NextFunction } from 'express'
import { type_of_obj_with_any_values, type_of_created_document } from '../../types/commonly-used-types.js'
import { type_of_request_with_user_id } from '../../types/type-of-request-with-user-id.js'

// document types
import { type_of_a_user_document } from '../../types/document/user-document.js'


// model
import user_model from '../../models/user-model.js'



// utils
import { hash_password, compare_passwords } from '../../utils/hash-password/hash-password.js'
import send_mail from '../../utils/send-mail/send-mail.js'
import success_response from '../../utils/success-response/success-response.js'
import send_cookie from '../../utils/send-cookie/send-cookie.js'
import generate_unique_username from '../../utils/username/generate-unique-username.js'
import generate_otp from '../../utils/generate-otp/generate-otp.js'


// error-handlers
import extra_layer_validation_for_request_body from '../../error-handlers/extra-layer-validation-for-request-body.js'
import tryCatchAsync from '../../error-handlers/try-catch-async.js'
import error_response from '../../error-handlers/error-response/error-response.js'



/*__________________________________________

 ✅ signup_user
____________________________________________*/


/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/auth/email/signup'

    route protection: no_sign_in_required
*/


const signup_user = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    /* 🥪 extra layer validation for request body  🥪

      In the model, we are not validating full_name, so we are doing it in the controller. Check the model file to know the reason of not validating it in the model
    */
    const { any_error } = extra_layer_validation_for_request_body({

        req: req,
        next: next,

        fields_to_validate: [

            {
                name: 'full_name',

                type: z.string().refine(value => /^[A-Za-z\s.-]{3,60}$/.test(value)),

                custom_message: "Must be between 3 and 60 characters and can only contain alphabets, space, dot, and hyphen"

            }
        ]

    })

    if (any_error) return;



    // 🥪 Extract the name, email, and password from the request body
    let { full_name, email, password, password_confirm, role } = req.body;



    // 🥪 Create a new user in the database with the extracted data
    let created_document: type_of_created_document = await user_model.create({

        full_name: full_name?.trim(),
        username: await generate_unique_username({ full_name: full_name, user_model: user_model }),
        email,
        password,
        password_confirm,
        role,
        last_signed_in_unix_timestamp: Date.now(),
        last_access_unix_timestamp: Date.now()
    })




    // 🥪 Send a new access token
    send_cookie({
        res: res,
        cookie_type: 'access_token',
        user_document: created_document
    })


    // 🥪 Send user info as cookie
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: created_document
    })


    // 🥪 send a success response with the user data and access token
    return success_response({
        res: res,

        status_code: StatusCodes.CREATED,

        message: 'User has been signed up successfully.',
    })


})



/*__________________________________________

 ✅ signin_user
____________________________________________*/

/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/auth/email/signin'

    route protection: no_sign_in_required
*/


const signin_user = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // 🥪 check if the user has provided both the email and password
    const { any_error } = extra_layer_validation_for_request_body({

        req: req,
        next: next,

        fields_to_validate: [

            {
                name: 'email',
                type: z.string().email()
            },

            {
                name: 'password',
                type: z.string()
            }

        ]

    })


    if (any_error) return;



    // 🥪 request body
    const { email, password } = req.body;


    // 🥪 check if user exists 
    const user_document: type_of_obj_with_any_values = await user_model.findOne({ email }).select('+password')



    // 🥪 if there is a user document with that email but the user has signed up with oauth providers
    if (user_document && user_document.auth_provider !== 'email') {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "The provided email is associated with a sign-in method that doesn't use an email and password."
        })
    }



    // 🥪 check if the password is correct
    let correct_password

    if (user_document) {
        correct_password = await compare_passwords(password, user_document.password)
    }


    // 🥪 if either user doesn't exist or password doesn't match, send an error message

    if (!user_document || !correct_password) {

        return error_response({
            next: next,
            status_code: StatusCodes.UNAUTHORIZED,
            message: 'Incorrect Email or Password'
        })
    }



    // 🥪 update user document before sending success response 
    const updated_document: type_of_obj_with_any_values = await user_model.findOneAndUpdate(

        { _id: user_document._id },

        {
            last_signed_in_unix_timestamp: Date.now(),
            last_access_unix_timestamp: Date.now()
        },

        { new: true, runValidators: true }
    )



    // 🥪 Send a new access token
    send_cookie({
        res: res,
        cookie_type: 'access_token',
        user_document: updated_document
    })


    // 🥪 Send user info as cookie
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: updated_document
    })



    // 🥪 send a success response with the user data and access token
    return success_response({
        res: res,

        status_code: StatusCodes.OK,

        message: 'User has been successfully signed in.'
    })

})





/*__________________________________________

 ✅ send_email_verification_mail
____________________________________________*/



/*💡 Controller's Info 💡

    method: PATCH

    endpoint: '/api/v1/auth/email/send-email-verification-mail'

    route protection: sign_in_required
*/


const send_email_verification_mail = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🥪 user_id  
    const user_id = req.user._id

    // 🥪 find the user document in the database 
    const user_document: type_of_a_user_document = await user_model.findOne({ _id: user_id })


    // 🥪 if no user exist with that id 
    if (!user_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "The id from where the request has been mode does not exist anymore."
        })
    }


    // 🥪 if the user's email is already confirmed  
    else if (user_document?.is_email_verified) {

        // send a failure response to the client with a message
        return error_response({
            next: next,
            status_code: StatusCodes.EXPECTATION_FAILED,
            message: "Your email is already verified"
        })
    }


    // 🥪 check whether an email was already sent and OTP hasn't been expired yet
    if (user_document.email_verification_otp_expiration_unix_timestamp) {

        if (user_document.email_verification_otp_expiration_unix_timestamp > Date.now()) {

            return error_response({
                next: next,
                status_code: StatusCodes.NOT_FOUND,
                message: "An email with OTP has already been sent to your email, the OTP is still valid. Please check your email and use that OTP to verify your email."
            })

        }

    }


    // 🥪 generate a OTP  
    const email_verification_otp: number = generate_otp()


    // 🥪 send a email to the user 
    await send_mail({
        email: user_document.email,
        otp: email_verification_otp,
        option: 'email verification'
    })


    // 🥪 after sending the email, update user document
    const filter = { _id: user_document._id }

    const update = {
        email_verification_otp_expiration_unix_timestamp: Date.now() + 60 * 60 * 1000, /* 60m */

        sent_email_verification_otp: email_verification_otp
    }

    const options = { new: true, runValidators: true }

    const updated_document = await user_model.findOneAndUpdate(filter, update, options)


    // 🥪 Send user info as cookie
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: updated_document
    })


    // 🥪  send a success response to the client with a message
    return success_response({
        res: res,
        message: `Email is successfully sent to ${user_document.email}. If you don't see it in your inbox, please check your spam folder too.`
    })


})





/*__________________________________________

 ✅ send_password_reset_mail
____________________________________________*/

/*💡 Controller's Info 💡

    method: PATCH

    endpoint: '/api/v1/auth/email/send-password-reset-mail'

    route protection: no_sign_in_required
*/


const send_password_reset_mail = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // 🥪 check if the user has provided 'email' or not
    const { any_error } = extra_layer_validation_for_request_body({
        req: req,
        next: next,
        fields_to_validate: [{
            name: 'email',
            type: z.string().email()
        }]
    })


    if (any_error) return;


    // 🥪 get the email from the request body
    const { email } = req.body


    // 🥪 get the user document 
    const user_document: type_of_a_user_document = await user_model.findOne({ email: email })


    // 🥪 if there is no user document with that email, throw an error and exit the function
    if (!user_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'There is no user with the provided email.'
        })
    }


    // 🥪 if there is a user document but the user has signed up with oauth providers
    if (user_document && user_document.auth_provider !== 'email') {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "The provided email is associated with a sign-in method that doesn't use email and password."
        })
    }



    // 🥪 check whether an email was already sent and OTP hasn't been expired 
    if (user_document.password_reset_otp_expiration_unix_timestamp) {

        if (user_document.password_reset_otp_expiration_unix_timestamp > Date.now()) {

            return error_response({
                next: next,
                status_code: StatusCodes.NOT_FOUND,
                message: "A password reset OTP has already been sent to your email, and it's still valid. Please check your email and use that OTP to reset your password."
            })

        }

    }


    // 🥪 generate a OTP  
    const password_reset_otp: number = generate_otp()


    // 🥪 send a  email to the user 
    await send_mail({
        email: user_document.email,
        otp: password_reset_otp,
        option: 'password reset'
    })


    // 🥪 after sending the email, update user document
    const filter = { _id: user_document._id }

    const update = {
        password_reset_otp_expiration_unix_timestamp: Date.now() + 60 * 60 * 1000, /* 60m */

        sent_password_reset_otp: password_reset_otp
    }

    const options = { new: true, runValidators: true }

    const updated_document = await user_model.findOneAndUpdate(filter, update, options)



    // 🥪 Send password reset info as cookie
    send_cookie({
        res: res,
        cookie_type: 'password_reset_info',
        password_reset_info: {
            email: updated_document.email,

            password_reset_otp_expiration_unix_timestamp: updated_document.password_reset_otp_expiration_unix_timestamp
        }
    })



    // send a success response to the client with a message
    return success_response({
        res: res,
        message: `Email is successfully sent to ${user_document.email}. If you don't see it in your inbox, please check your spam folder too.`,
    })


})





/*__________________________________________

 ✅ verify_email
____________________________________________*/

/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/auth/email/verify-email'

    route protection: sign_in_required
*/


const verify_email = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🥪 check if the user has provided 'email_verification_otp' & 'user_email' or not
    const { any_error } = extra_layer_validation_for_request_body({
        req: req,
        next: next,
        fields_to_validate: [
            {
                name: 'email_verification_otp',
                type: z.string()
            },

            {
                name: 'user_email',
                type: z.string()
            }

        ]
    })


    if (any_error) return;


    /* 🥪 req.body */
    const { user_email, email_verification_otp } = req.body


    /* 🥪 check whether the user belonging to the email exist in the database or not */
    const user_document = await user_model.findOne({ email: user_email })

    if (!user_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No user exist in the database with the provided email'
        })
    }


    /* 🥪 check if the user's email is already verified 🥪 */
    if (user_document?.is_email_verified) {

        return error_response({
            next: next,
            status_code: StatusCodes.EXPECTATION_FAILED,
            message: "Your email is already verified"
        })
    }


    // 🥪 check whether the provided OTP is matching or not
    if (email_verification_otp !== user_document.sent_email_verification_otp) {
        return error_response({
            next: next,
            status_code: StatusCodes.CONFLICT,
            message: "OTP is not matching. Provide the right OTP."
        })
    }


    // 🥪 check whether the OTP has expired or not
    if (Number(user_document.email_verification_otp_expiration_unix_timestamp) < Date.now()) {

        return error_response({
            next: next,
            status_code: StatusCodes.BAD_REQUEST,
            message: "The OTP has expired. You need to request for a new one."
        })

    }


    // 🥪 if we are here, that means everything is ok, now we can make the email verified 
    const filter = { _id: user_document._id }
    const update = { is_email_verified: true }
    const options = { new: true, runValidators: true }

    const updated_document = await user_model.findOneAndUpdate(filter, update, options)


    // 🥪 Send user info as cookie
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: updated_document
    })


    return success_response({
        res: res,
        message: 'Email is successfully verified'
    })

})






/*__________________________________________

 ✅ reset_password
____________________________________________*/

/*💡 Controller's Info 💡

    method: PATCH

    endpoint: '/api/v1/auth/email/reset-password'

    route protection: no_sign_in_required
*/

const reset_password = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // 🥪 check whether the user has provided 'user_email' ,'password_reset_otp' & 'new_password' or not
    const { any_error } = extra_layer_validation_for_request_body({
        req: req,
        next: next,
        fields_to_validate: [

            {
                name: 'user_email',
                type: z.string()
            },

            {
                name: 'password_reset_otp',
                type: z.string()
            },

            {
                name: 'new_password',
                type: z.string()
            }

        ]
    })


    if (any_error) return;


    // 🥪 request body
    const { user_email, password_reset_otp, new_password } = req.body


    /* 🥪 check whether the user belonging to the email exist in the database or not */
    const user_document = await user_model.findOne({ email: user_email })

    if (!user_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No user exist in the database with the provided email'
        })
    }


    // 🥪 check whether the provided OTP is matching or not
    if (password_reset_otp !== user_document.sent_password_reset_otp) {
        return error_response({
            next: next,
            status_code: StatusCodes.CONFLICT,
            message: "OTP is not matching. Provide the right OTP."
        })
    }


    // 🥪 check whether the OTP has expired or not
    if (Number(user_document.password_reset_otp_expiration_unix_timestamp) < Date.now()) {

        return error_response({
            next: next,
            status_code: StatusCodes.BAD_REQUEST,
            message: "The OTP has expired. You need to request for a new one."
        })

    }

    // 🥪 updating the user document with the new password 
    const hashed_new_password = await hash_password(new_password)

    const filter = { _id: user_document._id }

    const update = {
        password: hashed_new_password,

        $unset: {
            password_reset_otp_expiration_unix_timestamp: "",
            sent_password_reset_otp: ""
        }
    }

    const options = { new: true, runValidators: true }


    await user_model.findOneAndUpdate(filter, update, options)


    // 🥪 Send password reset info as cookie
    send_cookie({
        res: res,
        cookie_type: 'password_reset_info',

        password_reset_info: {
            email: undefined,
            password_reset_otp_expiration_unix_timestamp: undefined
        }
    })

    // success response 
    return success_response({
        res: res,
        message: "Password is successfully reset"
    })


})





/*__________________________________________

 ✅ change_password
____________________________________________*/

/*💡 Controller's Info 💡

    method: PATCH

    endpoint: '/api/v1/auth/email/change-password'

    route protection: sign_in_required, verified_email_required
*/


const change_password = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🥪 check whether the user has provided 'current_password' & 'new_password' or not
    const { any_error } = extra_layer_validation_for_request_body({
        req: req,
        next: next,
        fields_to_validate: [
            {
                name: 'current_password',
                type: z.string()
            },

            {
                name: 'new_password',
                type: z.string()
            }

        ]
    })


    if (any_error) return;



    // 🥪 request body
    const { current_password, new_password } = req.body



    // 🥪 let's fetch the user document with the user id that has been passed from route protection middleware
    const user_id = req.user._id

    const user_document = await user_model.findOne({ _id: user_id }).select('+password')


    // 🥪 if the has signed up with an oauth providers
    if (user_document && user_document.auth_provider !== 'email') {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "This account is associated with a sign-in method that doesn't use an email and password."
        })
    }


    // 🥪 check if the password is correct
    let correct_password = await compare_passwords(current_password, user_document.password)

    if (!correct_password) {

        return error_response({
            next: next,
            status_code: StatusCodes.UNAUTHORIZED,
            message: 'Incorrect current password'
        })
    }


    // 🥪 if the current password and new password is same, send an error response
    if (current_password === new_password) {
        return error_response({
            next: next,
            status_code: StatusCodes.UNAUTHORIZED,
            message: 'The new password cannot be the same as the current password. Please choose a different new password.'
        })
    }



    /* 🥪 updating the user document with the new password */
    const hashed_new_password = await hash_password(new_password)

    const filter = { _id: user_id }
    const update = { password: hashed_new_password }
    const options = { new: true, runValidators: true }


    await user_model.findOneAndUpdate(filter, update, options)


    /* 🥪 success response */
    return success_response({
        res: res,
        message: "Password is successfully changed"
    })


})








export {
    signin_user,
    signup_user,
    send_email_verification_mail,
    verify_email,
    send_password_reset_mail,
    reset_password,
    change_password
}
