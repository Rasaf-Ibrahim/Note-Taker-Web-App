/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import express from 'express'

// controllers
import {
    root_request,
    wake_up_the_server_if_sleeping
} from '../controllers/global-controllers.js'

//  routes
const global_routes = express.Router()


/*__________________________________________

 ✅ All the Routes
____________________________________________*/

// request the the root url
global_routes.get('/', root_request)

// wake up the server if sleeping
global_routes.get('/wake-up-the-server-if-sleeping', wake_up_the_server_if_sleeping)



/*__________________________________________

 ✅ export
____________________________________________*/
export default global_routes