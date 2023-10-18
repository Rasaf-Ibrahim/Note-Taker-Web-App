
/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { deleteImagesFromCloudinary } from 'express-cloudinary-image-handler'


// types
import { Request, Response, NextFunction } from 'express'
import { type_of_request_with_user_id } from '../types/type-of-request-with-user-id.js'


// model
import rte_note_model from '../models/rte-note-model.js'


// utils
import success_response from '../utils/success-response/success-response.js'
import { success_response_for_fetch_all_request } from '../utils/fetch-helpers/success-response-for-fetch-all-request.js'
import prepare_mongoose_query_params from '../utils/fetch-helpers/prepare-mongoose-query-params/prepare-mongoose-query-params.js'
import at_least_value_of_one_property_has_changed from '../utils/update-helpers/at-least-value-of-one-property-has-changed.js'


// error-handlers
import error_response from '../error-handlers/error-response/error-response.js'
import tryCatchAsync from '../error-handlers/try-catch-async.js'
import extra_layer_validation_for_request_body from '../error-handlers/extra-layer-validation-for-request-body.js'



/*__________________________________________

 ✅ create_a_rte_note_document
____________________________________________*/



/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/rte-note/create-one'

    access: sign_in_required, verified_email_required
*/


const create_a_rte_note_document = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {

    // 🍪 user_id
    const user_id = req.user._id


    // 🍪 create the rte note document
    const created_document = await rte_note_model.create({
        user_id: user_id,

        title: req.body.title,

        // optional fields
        ...(req.body?.description ? { description: req.body.description } : {}),

        ...(req.body?.public_id_of_cloudinary_images ? { public_id_of_cloudinary_images: req.body.public_id_of_cloudinary_images } : {})

    })


    // 🍪 success response
    return success_response({
        res: res,

        message: "A note document has successfully been created",

        created_document: created_document
    })

})




/*__________________________________________

 ✅ fetch_all_note_documents
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/rte-note/fetch-all'

    access: sign_in_required, verified_email_required
*/


const fetch_all_rte_note_documents_of_a_user = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🍪 get the user's id from the req.user
    const user_id = req.user._id


    // 🍪 queries 
    let {
        page, limit, skip, select, filter, sort
    } = prepare_mongoose_query_params({
        req_query: req.query,
        do_not_query_these_fields: ['user_id'] //we can't let a user to query another user's info!
    })


    // filtering by user
    filter = { ...filter, user_id: user_id }


    // 🍪 fetching documents 
    const fetched_documents = await rte_note_model
        .find(filter)
        .skip(skip)
        .limit(Number(limit))
        .select(select)
        .sort(sort)


    /* 🍪 success response 🍪*/
    return success_response_for_fetch_all_request({
        res: res,
        next: next,
        model: rte_note_model,
        limit: limit,
        skip: skip,
        page: page,
        filter: filter,
        fetched_documents: fetched_documents
    })

})




/*__________________________________________

 ✅ fetch_a_rte_note_document
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/rte-note/fetch-one/:id'

    access: sign_in_required, verified_email_required
*/


const fetch_a_rte_note_document = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🍪 provided id in the param
    const { id } = req.params


    // 🍪 check whether the document exists or not
    const fetched_document = await rte_note_model.findOne({ _id: id })

    if (!fetched_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No document exits with the provided id'
        })
    }



    // 🍪 success response 
    return success_response({
        res: res,
        message: 'Note has been fetched',
        fetched_document: fetched_document

    })

})



/*__________________________________________

 ✅ update_a_rte_note_document
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/rte-note/update-one/:id'

    access: sign_in_required, verified_email_required
*/


const update_a_rte_note_document = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // 🍪 provided id in the param
    const { id } = req.params


    // 🍪 check whether the document exists or not
    const fetched_document = await rte_note_model.findOne({ _id: id })

    if (!fetched_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No document exits with the provided id'
        })
    }



    // 🍪 check whether the user is passing any value in the req body or not 
    if ((Object.keys(req.body).length === 0)) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "You haven't passed any new value"
        })
    }



    // 🍪  check whether the user has actually changed anything or not
    const changed = at_least_value_of_one_property_has_changed({
        req_body: req.body,
        fetched_document: fetched_document,
        properties_to_check: ['title', 'description']
    })

    if (!changed) {

        return error_response({
            next: next,
            status_code: StatusCodes.BAD_REQUEST,
            message: "You haven't changed any value"
        })

    }




    // 🍪 update the document
    const filter = { _id: id }
    const update = {
        title: req.body.hasOwnProperty('title') ? req.body.title : fetched_document.title,

        description: req.body.hasOwnProperty('description') ? req.body.description : fetched_document.description,

        public_id_of_cloudinary_images: req.body.hasOwnProperty('public_id_of_cloudinary_images') ? req.body.public_id_of_cloudinary_images : fetched_document.public_id_of_cloudinary_images,
    }
    const options = { new: true, runValidators: true }



    const updated_document = await rte_note_model.findOneAndUpdate(filter, update, options)



    // 🍪 success response 
    return success_response({
        res: res,
        message: 'Note has been updated',
        fetched_document: updated_document
    })

})




/*__________________________________________

 ✅ delete_rte_note_documents
____________________________________________*/


/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/rte-note/delete-one-or-multiple'

    access: sign_in_required, verified_email_required
*/


const delete_rte_note_documents = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    // 🍪 Validate the request body 
    const validation_result = extra_layer_validation_for_request_body({
        req: req,
        next: next,
        fields_to_validate: [
            {
                name: 'note_ids',
                type: z.array(z.string()),
                custom_message: 'note_ids should be an array of strings'
            }
        ]
    })


    // 🍪 If any error occurs during validation, return
    if (validation_result.any_error) return


    // 🍪 provided ids in the body
    const { note_ids } = req.body


    // 🍪 fetch all documents in a single query using $in operator
    const fetched_documents = await rte_note_model.find({ _id: { $in: note_ids } })


    // 🍪 check whether any documents exist or not
    if (fetched_documents.length === 0) {
        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No documents exist with the provided ids'
        })
    }


    // 🍪 get the user_id from the request
    const user_id = req.user._id;


    // 🍪 verify if the notes belong to the authenticated user
    const unauthorizedNotes = fetched_documents.filter(doc => doc.user_id.toString() !== user_id.toString());

    if (unauthorizedNotes.length > 0) {
        return error_response({
            next: next,
            status_code: StatusCodes.UNAUTHORIZED,
            message: 'You are not authorized to delete some of the selected documents'
        })
    }


    // 🍪 collect public IDs of images from fetched documents
    const public_ids_of_images = fetched_documents.map(doc => doc.public_id_of_cloudinary_images).flat()


    // 🍪 delete all the images from cloudinary
    const delete_report = await deleteImagesFromCloudinary({
        publicIds: public_ids_of_images
    })


    if (delete_report.isError) {
        return error_response({
            next: next,
            status_code: delete_report.errorInfo.statusCode,
            message: delete_report.errorInfo.message
        })
    }


    // 🍪 delete the documents
    await rte_note_model.deleteMany({ _id: { $in: note_ids } })


    // 🍪 success response
    return success_response({
        res: res,
        message: 'Notes have been deleted',
    })

})





/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/rte-note/bookmark/add-or-remove/:note_id'

    access: sign_in_required, verified_email_required
*/


const add_to_bookmark_or_remove_from_bookmark = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {

    // Extract "note_id" and "user_id" from request
    const {
        note_id
    } = req.params

    const user_id = req.user._id


    // Check if the document already exists
    const fetched_document = await rte_note_model.findOne({
        user_id,
        _id: note_id
    })


    // If the document doesn't exist
    if (!fetched_document) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No document exits with the provided user id and note id'
        })
    }

    // Updated document
    let updated_document

    // If the note is already bookmarked, unbookmark it. And if the note is not already bookmarked, bookmark it
    fetched_document.is_bookmarked = !fetched_document.is_bookmarked;
    updated_document = await fetched_document.save();


    // Success response
    return success_response({
        res,


        message: `Successfully ${updated_document.is_bookmarked === true ? 'bookmarked' : 'unbookmarked'} the note.`,
    })

})





export {
    create_a_rte_note_document,
    fetch_all_rte_note_documents_of_a_user,
    fetch_a_rte_note_document,
    update_a_rte_note_document,
    delete_rte_note_documents,
    add_to_bookmark_or_remove_from_bookmark
}