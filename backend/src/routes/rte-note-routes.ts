/*__________________________________________

 ✅ All the Routes
____________________________________________*/

// express
import express from 'express'

//  controllers
import {
    create_a_rte_note_document,
    fetch_all_rte_note_documents_of_a_user,
    fetch_a_rte_note_document,
    update_a_rte_note_document,
    delete_rte_note_documents
} from '../controllers/rte-note-controllers.js'


// protection
import {
    sign_in_required,
    verified_email_required
} from '../middlewares/route-protection-middlewares.js'




/*__________________________________________

 ✅ All the Routes
____________________________________________*/

// rte_note_routes
const rte_note_routes = express.Router()


// Create a rte note document
rte_note_routes
    .route('/create-one')
    .post(
        sign_in_required,
        verified_email_required,
        create_a_rte_note_document
    )


rte_note_routes
    .route('/fetch-all-of-a-user')
    .get(
        sign_in_required,
        verified_email_required,
        fetch_all_rte_note_documents_of_a_user
    )


rte_note_routes
    .route('/fetch-one/:id')
    .get(
        sign_in_required,
        verified_email_required,
        fetch_a_rte_note_document
    )


rte_note_routes
    .route('/update-one/:id')
    .patch(
        sign_in_required,
        verified_email_required,
        update_a_rte_note_document
    )


rte_note_routes
    .route('/delete-one-or-multiple')
    .post(
        sign_in_required,
        verified_email_required,
        delete_rte_note_documents
    )



export default rte_note_routes