/*__________________________________________

 ✅ import
____________________________________________*/


// types
import { Request, Response, NextFunction } from 'express'

// utils
import success_response from '../utils/success-response/success-response.js';



/*__________________________________________

 ✅ root_request
____________________________________________*/





/*💡 Controller's Info 💡

    method: GET

    endpoint: '/'

    access: public
*/

const root_request = (req: Request, res) => {

    const domain = `${req.protocol}://${req.get('host')}`;

    success_response({
        res: res,
        message: `Welcome to ${domain}`
    })

}




/*__________________________________________

 ✅ wake_up_the_server_if_sleeping
____________________________________________*/





/*💡 Controller's Info 💡

    method: GET

    endpoint: '/wake-up-the-server-if-sleeping'

    access: public
*/

const wake_up_the_server_if_sleeping = (req: Request, res) => {

    success_response({
        res: res,
        message: 'Server is now up and running!'
    })
}



/*__________________________________________

 ✅ export
____________________________________________*/

export {
    root_request,
    wake_up_the_server_if_sleeping
}