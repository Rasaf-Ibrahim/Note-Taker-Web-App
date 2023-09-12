/*__________________________________________

 ✅ import
____________________________________________*/

//  express
import express from 'express'

// controllers
import { delete_account } from '../../controllers/auth/delete-account-controller.js'

// route protection
import {
    sign_in_required,
} from '../../middlewares/route-protection-middlewares.js'



/*__________________________________________

 ✅ all routes
____________________________________________*/

// 🥪 delete_account_routes
const delete_account_routes = express.Router()


//🥪 delete account
delete_account_routes
    .route('/delete-account')
    .post(
        sign_in_required,
        delete_account
    )


export default delete_account_routes