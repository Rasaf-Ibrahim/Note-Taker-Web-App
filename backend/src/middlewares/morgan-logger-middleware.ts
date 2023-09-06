// Importing morgan library
import morgan from 'morgan'

// importing types
import { Express } from 'express'
import config_obj from '../config/index.js'


const morgan_logger_middleware = (app: Express) => {

    // only  in the 'development' mode, we want to log 
    if (config_obj.env.runtime_environment === 'development') {

        app.use(morgan('tiny'))
    }

}


export default morgan_logger_middleware
