// importing cors library 
import cors from 'cors'

// importing types
import { Express } from 'express'
import config_obj from '../config/index.js'


function cors_middleware(app:Express) {

    app.use(
        cors({
            origin: [config_obj.env.cors_origin_url],
            credentials: true
        })
    )
}


 
export default cors_middleware