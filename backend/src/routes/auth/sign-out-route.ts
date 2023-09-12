/*__________________________________________

 ✅ import
____________________________________________*/

//  express
import express from 'express'

// controllers
import { sign_out_the_user } from '../../controllers/auth/sign-out-controller.js'

// route protection
import {
    sign_in_required,
} from '../../middlewares/route-protection-middlewares.js'



/*__________________________________________

 ✅ all routes
____________________________________________*/

// 🥪 email_auth_routes
const sign_out_routes = express.Router()


//🥪 logout
sign_out_routes
    .route('/sign-out')
    .post(
        sign_in_required,
        sign_out_the_user
    )


export default sign_out_routes