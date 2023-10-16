/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "../../config/index.js"

// type
import { Response } from "express"



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_payload_of_clear_cookie = {
    res: Response,
    cookie_name: string
}



/*__________________________________________

 ✅ clear_cookie
____________________________________________*/

export default function clear_cookie(payload: type_of_payload_of_clear_cookie) {

    const { res, cookie_name } = payload

    // is production environment
    let is_production_environment = config_obj.env.runtime_environment === 'production';

    res.clearCookie(cookie_name, {

        ...(is_production_environment ? { domain: config_obj.env.cookie_domain } : {}),

        secure: is_production_environment ? true : false,

        sameSite: 'lax'
    })
}

