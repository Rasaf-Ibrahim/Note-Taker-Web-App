/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "../../config/index.js"


// packages
import axios from "axios"
import { StatusCodes } from "http-status-codes"


// types
import { Request, Response, NextFunction } from "express"
import { type_of_created_document } from "../../types/commonly-used-types.js"


// model
import user_model from "../../models/user-model.js"


// utils
import send_cookie from "../../utils/cookie/send-cookie.js"
import clear_cookie from "../../utils/cookie/clear-cookie.js"
import success_response from "../../utils/success-response/success-response.js"
import generate_unique_username from "../../utils/username/generate-unique-username.js"


// error-handlers
import error_response from "../../error-handlers/error-response/error-response.js"
import tryCatchAsync from "../../error-handlers/try-catch-async.js"




/*__________________________________________

 ✅ initiate_google_oauth_process
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/auth/oauth/google/initiate-oauth-process'

    route protection: no protection
*/


const initiate_google_oauth_process = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    function generate_url_which_would_initiate_google_oauth_process() {

        const client_id = config_obj.env.google_oauth_client_id

        const redirect_url = config_obj.env.google_oauth_redirect_url

        const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'

        const response_type = 'code'

        const access_type = 'offline'

        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope}&response_type=${response_type}&access_type=${access_type}`
    }


    const url_to_initiate_google_oauth_process = generate_url_which_would_initiate_google_oauth_process()


    res.redirect(url_to_initiate_google_oauth_process)
})



/*__________________________________________

 ✅ handle_google_oauth_redirect
____________________________________________*/

/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/auth/oauth/google/redirect'

    route protection: no protection

    "Special note: This endpoint will not be directly called by the frontend via fetch. Instead, after the user grants permission on Google's authentication page, Google will instruct the user's browser to redirect to this endpoint. The browser will then make a direct request to this endpoint, including the google provided authorization code as a query parameter in the URL."
*/



const handle_google_oauth_redirect = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const authorization_code_sent_by_google = req.query.code



    const response_from_google_for_requesting_access_token = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
            code: authorization_code_sent_by_google,
            client_id: config_obj.env.google_oauth_client_id,
            client_secret: config_obj.env.google_oauth_client_secret,
            redirect_uri: config_obj.env.google_oauth_redirect_url,
            grant_type: 'authorization_code',
        }
    })


    const access_token_from_google = response_from_google_for_requesting_access_token.data.access_token


    const response_from_google_for_requesting_user_info = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${access_token_from_google}`,
        },
    })


    const user_info_from_google = response_from_google_for_requesting_user_info.data


    let oauth_user_info = {
        auth_provider: 'google',
        google_id: user_info_from_google.sub,
        full_name: user_info_from_google.given_name,
        picture_link: user_info_from_google.picture,
        email: user_info_from_google.email,
    }


    // Set 'oauth_user_info' cookie
    send_cookie({
        res: res,
        cookie_type: 'oauth_user_info',
        oauth_user_info: oauth_user_info,
    })

    // Redirect
    return res.redirect(config_obj.env.oauth_confirmation_page_url)

})




/*__________________________________________

 ✅ initiate_github_oauth_process
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/auth/oauth/github/initiate-oauth-process'

    route protection: no protection
*/


const initiate_github_oauth_process = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    function generate_url_which_would_initiate_github_oauth_process() {

        const client_id = config_obj.env.github_oauth_client_id

        const redirect_url = config_obj.env.github_oauth_redirect_url

        const scope = 'user:email'

        return `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope}`
    }

    const url_to_initiate_github_oauth_process = generate_url_which_would_initiate_github_oauth_process()

    res.redirect(url_to_initiate_github_oauth_process)
})



/*__________________________________________

 ✅ handle_github_oauth_redirect
____________________________________________*/

/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/auth/oauth/github/redirect'

    route protection: no protection

    "Special note: This endpoint will not be directly called by the frontend via fetch. Instead, after the user grants permission on github's authentication page, github will instruct the user's browser to redirect to this endpoint. The browser will then make a direct request to this endpoint, including the github provided authorization code as a query parameter in the URL."
*/

const handle_github_oauth_redirect = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const authorization_code_sent_by_github = req.query.code

    const response_from_github_for_requesting_access_token = await axios.post('https://github.com/login/oauth/access_token', {
        code: authorization_code_sent_by_github,
        client_id: config_obj.env.github_oauth_client_id,
        client_secret: config_obj.env.github_oauth_client_secret,
        redirect_uri: config_obj.env.github_oauth_redirect_url,
    }, {
        headers: {
            Accept: 'application/json',
        }
    })


    const access_token_from_github = response_from_github_for_requesting_access_token.data.access_token;


    const response_from_github_for_requesting_user_info = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${access_token_from_github}`,
        },
    })


    const user_info_from_github = response_from_github_for_requesting_user_info.data;


    const response_from_github_for_requesting_emails = await axios.get('https://api.github.com/user/emails', {
        headers: {
            Authorization: `Bearer ${access_token_from_github}`,
        },
    })



    const primary_email_from_github = response_from_github_for_requesting_emails.data.find((email: { primary: boolean }) => email.primary)?.email


    let oauth_user_info = {
        auth_provider: 'github',

        github_id: user_info_from_github.id,

        // github user may not have name, if name is not available, taking his username from login property
        full_name: user_info_from_github.name ? user_info_from_github.name : user_info_from_github.login,

        picture_link: user_info_from_github.avatar_url,

        email: primary_email_from_github,

    }



    // Set 'oauth_user_info' cookie
    send_cookie({
        res: res,
        cookie_type: 'oauth_user_info',
        oauth_user_info: oauth_user_info,
    })

    // Redirect
    return res.redirect(config_obj.env.oauth_confirmation_page_url);
});








/*__________________________________________

 ✅ handle_oauth_sign_in_or_up
____________________________________________*/

/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/auth/oauth/sign-in-or-up'

    route protection: no protection
*/


const handle_oauth_sign_in_or_up = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    // 🥪 Check if there is a "oauth_user_info" cookie 
    let oauth_user_info

    if (req.cookies && req.cookies.oauth_user_info) {
        oauth_user_info = req.cookies.oauth_user_info
    }

    if (!oauth_user_info) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'Sign in or up process has failed. You need to try again.'
        })
    }


    // 🥪 Parse cookie value
    oauth_user_info = JSON.parse(oauth_user_info)




    // 🥪 Check if the user already exists in the database or not


    let user_document = await user_model.findOne({ email: oauth_user_info.email })



    /*  🥪 if the user exists but with a different provider */
    if (user_document && user_document.auth_provider !== oauth_user_info.auth_provider) {

        // 🍔 determine the name of the service used for the existing account
        let existing_provider

        if (user_document.auth_provider === 'email') {
            existing_provider = 'an email and a password';
        }

        else if (user_document.auth_provider === 'google') {
            existing_provider = 'Google';
        }

        else if (user_document.auth_provider === 'github') {
            existing_provider = 'GitHub';
        }


        // 🍔 Delete 'oauth_user_info' cookie
        clear_cookie({
            res: res,
            cookie_name: 'oauth_user_info'
        })


        // 🍔 sending error response
        return error_response({
            next: next,
            status_code: StatusCodes.CONFLICT,
            message: `An account already exists with ${oauth_user_info.email}. The account was created by using ${existing_provider}. You need to sign in with ${existing_provider}.`
        })

    }

    // 🥪 if the user exists and uses the same provider to log in, we need to send a success response with access token and user info 
    else if (user_document && user_document.auth_provider === oauth_user_info.auth_provider) {

        // 🍔 Update last_signed_in_unix_timestamp and last_access_unix_timestamp for existing user
        user_document.last_signed_in_unix_timestamp = String(Date.now())
        user_document.last_access_unix_timestamp = String(Date.now())
        await user_document.save()


        // 🍔 Send a new access token
        send_cookie({
            res: res,
            cookie_type: 'access_token',
            user_document: user_document
        })


        // 🍔 Send user info as cookie
        send_cookie({
            res: res,
            cookie_type: 'user_info',
            user_document: user_document
        })


        // 🍔 Delete 'oauth_user_info' cookie
        clear_cookie({
            res:res,
            cookie_name:'oauth_user_info'
        })



        // 🍔 send a success response with the user data and access token
        return success_response({
            res: res,

            status_code: StatusCodes.CREATED,

            message: 'User has been signed in successfully.',
        })


    }



    // 🥪 if the user doesn't already exist in the database, we need to create the user and send success response with access token and user info 
    else if (!user_document) {

        let created_document: type_of_created_document = await user_model.create({
            auth_provider: oauth_user_info.auth_provider,

            // google_id or github_id
            [`${oauth_user_info.auth_provider}_id`]: oauth_user_info[`${oauth_user_info.auth_provider}_id`],

            email: oauth_user_info.email,

            full_name: oauth_user_info.full_name,

            // making username unique and less than 20 characters
            username: await generate_unique_username({ full_name: oauth_user_info.full_name, user_model: user_model }),

            picture_link: oauth_user_info.picture_link,

            last_signed_in_unix_timestamp: Date.now(),

            last_access_unix_timestamp: Date.now(),

        })


        // 🍔 Send a new access token
        send_cookie({
            res: res,
            cookie_type: 'access_token',
            user_document: created_document
        })


        // 🍔 Send user info as cookie
        send_cookie({
            res: res,
            cookie_type: 'user_info',
            user_document: created_document
        })

        // 🍔 Delete 'oauth_user_info' cookie
        clear_cookie({
            res:res,
            cookie_name:'oauth_user_info'
        })


        // 🍔 send a success response with the user data and access token
        return success_response({
            res: res,

            status_code: StatusCodes.CREATED,

            message: 'User has been signed up successfully.',
        })



    }

})




export {
    initiate_google_oauth_process,
    handle_google_oauth_redirect,
    initiate_github_oauth_process,
    handle_github_oauth_redirect,
    handle_oauth_sign_in_or_up
}