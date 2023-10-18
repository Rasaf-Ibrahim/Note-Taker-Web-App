/*__________________________________________

 ✅ import
____________________________________________*/

// cors library 
import cors from 'cors'

// types
import { Express } from 'express'
import config_obj from '../config/index.js'



/*__________________________________________

 ✅ cors_middleware
____________________________________________*/


export default function cors_middleware(app:Express) {

    app.use(
        cors({
            origin: [config_obj.env.cors_origin_url],
            credentials: true
        })
    )
}


 