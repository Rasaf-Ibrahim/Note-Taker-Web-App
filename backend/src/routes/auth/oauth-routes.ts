/*__________________________________________

 ✅ import
____________________________________________*/

//  express
import express from 'express'

// controllers
import {
    initiate_google_oauth_process,
    handle_google_oauth_redirect,
    initiate_github_oauth_process,
    handle_github_oauth_redirect,
    handle_oauth_sign_in_or_up
} from '../../controllers/auth/oauth-controllers.js'


// route protection
import {
    no_sign_in_required
} from '../../middlewares/route-protection-middlewares.js'




/*__________________________________________

 ✅ all routes
____________________________________________*/

// 🥪 oauth routes
const oauth_routes = express.Router()


//🥪 initiate google oauth process 
oauth_routes
    .route('/google/initiate-oauth-process')
    .get(initiate_google_oauth_process)


//🥪 google redirect
oauth_routes
    .route('/google/redirect')
    .get(handle_google_oauth_redirect)


//🥪 initiate github oauth process 
oauth_routes
    .route('/github/initiate-oauth-process')
    .get(initiate_github_oauth_process)


//🥪 github redirect
oauth_routes
    .route('/github/redirect')
    .get(handle_github_oauth_redirect)


//🥪 sign in or up
oauth_routes
    .route('/sign-in-or-up')
    .post(
        no_sign_in_required,
        handle_oauth_sign_in_or_up
    )





export default oauth_routes