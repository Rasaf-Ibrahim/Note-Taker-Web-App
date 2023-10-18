/*__________________________________________

 ✅ import
____________________________________________*/

// morgan library
import morgan from 'morgan'

// types
import { Express } from 'express'
import config_obj from '../config/index.js'


/*__________________________________________

 ✅ morgan_logger_middleware
____________________________________________*/




export default function morgan_logger_middleware (app: Express) {
    // only  in the 'development' mode, we want to log 
    if (config_obj.env.runtime_environment === 'development') {

        app.use(morgan('tiny'))
    }

}

