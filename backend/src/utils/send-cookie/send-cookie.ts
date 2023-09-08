/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "../../config/index.js"

// type
import { Response } from "express"

// utils
import generate_token from "../generate-token/generate-token.js"




/*__________________________________________

 ✅ types
____________________________________________*/


type type_of_user_info_cookie = {
    res: Response
    cookie_type: 'access_token' | 'user_info'
    user_document: any
    oauth_user_info?: never
    password_reset_info?: never
}


type type_of_common_props_of_oauth_user_info = {
    auth_provider: string,
    full_name: string,
    picture_link: string,
    email: string,
}

type type_of_google_oauth_user_info = type_of_common_props_of_oauth_user_info & {
    google_id: string,
    github_id?: never
}

type type_of_github_oauth_user_info = type_of_common_props_of_oauth_user_info & {
    github_id: string,
    google_id?: never
}

type type_of_oauth_user_info = type_of_google_oauth_user_info | type_of_github_oauth_user_info


type type_of_oauth_user_info_cookie = {
    res: Response,
    cookie_type: 'oauth_user_info',
    oauth_user_info: type_of_oauth_user_info
    user_document?: never
    password_reset_info?: never
}


type type_of_password_reset_info_cookie = {
    res: Response,
    cookie_type: 'password_reset_info',
    password_reset_info: {
        email: string,
        password_reset_otp_expiration_unix_timestamp: string
    }
    user_document?: any
    oauth_user_info?: never
}



type type_of_payload_of_send_cookie = type_of_user_info_cookie | type_of_oauth_user_info_cookie | type_of_password_reset_info_cookie



/*__________________________________________

 ✅ send_cookie
____________________________________________*/

export default function send_cookie(payload: type_of_payload_of_send_cookie) {

    // 🥪 payload
    const { res, cookie_type, user_document, oauth_user_info, password_reset_info } = payload


    // 🥪 is production environment
     let  is_production_environment = config_obj.env.runtime_environment === 'production'



    // 🥪 'access_token' cookie
    if (cookie_type === 'access_token') {

        // generate the access token
        const access_token = generate_token({ user_id: user_document._id, token_type: 'access' })


        // send the cookie
        res.cookie('access_token', access_token, {

            httpOnly: true,

            secure: is_production_environment ? true : false,

            sameSite: 'lax',

            maxAge: Number(config_obj.env.access_token_cookie_max_age),

            ...(is_production_environment ? { domain: config_obj.env.cookie_domain } : {})
        })

    }


    // 🥪 'user_info' cookie
    else if (cookie_type === 'user_info') {


        // before we send the user info in the cookie, we need to  exclude sensitive properties
        const {

            password,
            google_id,
            github_id,

            // putting other properties in the following variable
            ...user_document_without_sensitive_information

        } = user_document._doc


        // user info
        const user_info = {
            ...user_document_without_sensitive_information
        }


        // stringified  user info 
        const stringified_user_info = JSON.stringify(user_info)


        // send the cookie
        res.cookie('user_info', stringified_user_info, {

            httpOnly: false, //accessible by the frontend

            secure: is_production_environment ? true : false,

            sameSite: 'lax',

            maxAge: Number(config_obj.env.access_token_cookie_max_age),

            ...(is_production_environment ? { domain: config_obj.env.cookie_domain } : {})
        })
    }


    // 🥪 'oauth_user_info' cookie
    else if (cookie_type === 'oauth_user_info') {

        // stringified  user info 
        const stringified_oauth_user_info = JSON.stringify(oauth_user_info)


        // send the cookie
        res.cookie('oauth_user_info', stringified_oauth_user_info, {

            httpOnly: true,

            secure: is_production_environment ? true : false,

            sameSite: 'lax',

            ...(is_production_environment ? { domain: config_obj.env.cookie_domain } : {})

            // session cookie (no maxAge)
        })
    }


    // 🥪 'password_reset_info' cookie
    else if (cookie_type === 'password_reset_info') {


        // stringified  user info 
        const stringified_password_reset_info = JSON.stringify(password_reset_info);


        // send the cookie
        res.cookie('password_reset_info', stringified_password_reset_info, {

            httpOnly: false, //accessible by the frontend

            secure: is_production_environment ? true : false,

            sameSite: 'lax',

            maxAge: 20 * 60 * 1000, //20m

            ...(is_production_environment ? { domain: config_obj.env.cookie_domain } : {})
        })
    }

}


