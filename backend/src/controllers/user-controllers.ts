
/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from '../config/index.js'

// libraries
import { StatusCodes } from 'http-status-codes'
import { uploadImagesToCloudinary, deleteImagesFromCloudinary } from 'express-cloudinary-image-handler'


// types
import { Request, Response, NextFunction } from 'express'
import { type_of_request_with_user_id } from '../types/type-of-request-with-user-id.js';


// model
import user_model from '../models/user-model.js';

// utils
import queries_for_fetch_all_request from '../utils/fetch-helpers/queries-for-fetch-all-request/queries-for-fetch-all-request.js'
import send_cookie from '../utils/cookie/send-cookie.js'
import success_response from '../utils/success-response/success-response.js'
import { success_response_for_fetch_all_request } from '../utils/fetch-helpers/success-response-for-fetch-all-request.js'
import is_the_username_unique from '../utils/username/is_the_username_unique.js'


// error handlers
import error_response from '../error-handlers/error-response/error-response.js'
import tryCatchAsync from '../error-handlers/try-catch-async.js'





/*__________________________________________

 ✅ fetch_all_user_documents
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/user/fetch-all'

    access: admin (signed in & email verified)
*/


const fetch_all_user_documents = tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    /* 🥪 queries 🥪*/
    const {
        page, limit, skip, select, filter, sort
    } = queries_for_fetch_all_request({
        req_query: req.query,
        do_not_query_these_fields: []
    })


    /* 🥪 fetching documents 🥪*/
    const fetched_documents = await user_model
        .find(filter)
        .skip(skip)
        .limit(Number(limit))
        .select(select)
        .sort(sort);


    /* 🥪 success response 🥪*/
    return success_response_for_fetch_all_request({
        res: res,
        next: next,
        model: user_model,
        limit: limit,
        skip: skip,
        page: page,
        filter: filter,
        fetched_documents: fetched_documents
    })

})


/*__________________________________________

 ✅ fetch_a_user_document
____________________________________________*/


/*💡 Controller's Info 💡

    method: GET

    endpoint: '/api/v1/user/fetch-one'

    access: user (signed in)
*/


const fetch_a_user_document = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {


    const user_id = req.user._id


    const fetched_document = await user_model.findOne({ _id: user_id })

    if (!fetched_document) {

        error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No user exits with the provided id'
        })
    }


    return success_response({
        res: res,
        message: "Document is successfully fetched.",
        fetched_document: fetched_document
    })


})



/*__________________________________________

 ✅ update_a_user_document
____________________________________________*/


/*💡 Controller's Info 💡

    method: PATCH

    endpoint: '/api/v1/user/update-one'

    route protection: sign_in_required, verified_email_required
*/


const update_a_user_document = tryCatchAsync(async (req: any, res: Response, next: NextFunction) => {


    // 🥪 check whether the user exists or not  
    const user_id = req.user._id

    const user_document = await user_model.findOne({ _id: user_id })

    if (!user_document) {

        error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: 'No user exits with the provided id'
        })
    }



    // 🥪 check whether the user is passing any value in the req body or not 
    if ((Object.keys(req.body).length === 0) && (!req.files || Object.keys(req.files).length === 0)) {

        return error_response({
            next: next,
            status_code: StatusCodes.NOT_FOUND,
            message: "You haven't passed any new value"
        })
    }







    // 🥪 if username is passed in the req.body, check if the username is unique or not. 
    if (req.body.username) {

        const unique = await is_the_username_unique({
            username: req.body.username,
            user_model: user_model,
        })

        if (!unique) {
            return error_response({
                next: next,
                status_code: StatusCodes.CONFLICT,
                message: "The provided username is already taken. Please choose another."
            })
        }

    }



    // 🥪 if user wants to upload to update profile picture, we need to upload the new and delete the old profile picture 
    let uploaded_images_info = []

    if (req.files && req.files.profile_picture) {

        const upload_report = await uploadImagesToCloudinary({
            req: req,


            configuration: {

                formDataFieldName: 'profile_picture',

                allowedExtensions: ['png', 'jpg', 'jpeg'],

                maxFileSizeInKB: 512,

                cloudinaryFolderName: config_obj.env.cloudinary_folder_name
            }
        })

        if (upload_report.isError) {
            return error_response({
                next: next,
                status_code: upload_report.errorInfo.statusCode,
                message: upload_report.errorInfo.message
            })
        }

        else {
            uploaded_images_info = upload_report.imagesInfo
        }


        // 🍔 delete the old picture if available
        if (user_document.picture_public_id) {

            const delete_report = await deleteImagesFromCloudinary({
                publicIds: [user_document.picture_public_id]
            })


            if (delete_report.isError) {
                return error_response({
                    next: next,
                    status_code: delete_report.errorInfo.statusCode,
                    message: delete_report.errorInfo.message
                })
            }
        }
    }



    // 🥪 update whichever field was sent in the request body
    const filter = { _id: user_id }

    const update = {

        full_name: req.body.hasOwnProperty('full_name') ? req.body.full_name : user_document.full_name,

        username: req.body.hasOwnProperty('username') ? req.body.username : user_document.username,

        picture_link: uploaded_images_info.length !== 0 ? uploaded_images_info[0].imageSrc : user_document.picture_link,

        picture_public_id: uploaded_images_info.length !== 0 ? `${uploaded_images_info[0].imagePublicId}` : user_document.picture_public_id
    }

    const options = { new: true, runValidators: true };


    // 🥪 update the user's document
    const updated_user = await user_model.findOneAndUpdate(filter, update, options)



    // 🥪 Send user info as cookie
    send_cookie({
        res: res,
        cookie_type: 'user_info',
        user_document: updated_user
    })


    // 🥪 success response
    return success_response({
        res: res,
        message: "Document is successfully updated."
    })

})









export {
    fetch_all_user_documents,
    fetch_a_user_document,
    update_a_user_document
}
