/*__________________________________________

 ✅ import
____________________________________________*/

// express
import express from 'express'

// controllers
import {
    fetch_all_user_documents,
    fetch_a_user_document,
    update_a_user_document
} from '../controllers/user-controllers.js'

// protection
import {
    sign_in_required,
    verified_email_required,
    user_role_protection,

} from '../middlewares/route-protection-middlewares.js'




/*__________________________________________

 ✅ All the Routes
____________________________________________*/

// routes
const user_routes = express.Router()


// Fetch all the user documents
user_routes
    .route('/fetch-all')
    .get(
        sign_in_required,
        verified_email_required,
        user_role_protection('admin', 'moderator'),
        fetch_all_user_documents
    )


// Fetch all the user documents
user_routes
    .route('/fetch-one')
    .get(
        sign_in_required,
        fetch_a_user_document
    )


// Update a user document
user_routes
    .route('/update-one')
    .patch(
        sign_in_required,
        verified_email_required,
        update_a_user_document
    )



// export
export default user_routes