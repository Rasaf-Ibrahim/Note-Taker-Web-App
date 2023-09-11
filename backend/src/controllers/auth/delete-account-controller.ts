/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { Request, Response, NextFunction } from 'express'
import { type_of_request_with_user_id } from '../../types/type-of-request-with-user-id.js'

// packages
import { deleteImagesFromCloudinary } from 'express-cloudinary-image-handler'

// model
import user_model from '../../models/user-model.js'
import rte_note_model from '../../models/rte-note-model.js'

// utils
import tryCatchAsync from '../../error-handlers/try-catch-async.js'
import success_response from '../../utils/success-response/success-response.js'
import error_response from '../../error-handlers/error-response/error-response.js'





/*__________________________________________

 ✅ delete an account (user)
____________________________________________*/


/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/auth/delete-account'

    access: sign_in_required
*/

const delete_account = tryCatchAsync(async (req: type_of_request_with_user_id, res: Response, next: NextFunction) => {

    // 🫓 user_id
    const user_id = req.user._id


    // 🫓 Fetch all notes created by the user
    const notes = await rte_note_model.find({ user_id: user_id });


    // 🫓 Delete images from cloudinary of all the notes 
    for (const note of notes) {

        if (note.public_id_of_cloudinary_images.length > 0) {

            const delete_report = await deleteImagesFromCloudinary({
                publicIds: note.public_id_of_cloudinary_images
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


    // 🫓 Delete the notes created by the user
    await rte_note_model.deleteMany({ user_id: user_id })


    // 🫓 Delete the user document
    await user_model.deleteOne({ _id: user_id });


    // 🫓 Clear the access_token & user_info cookie
    res.clearCookie('access_token');
    res.clearCookie('user_info');


    // 🫓 Success response
    return success_response({
        res: res,
        message: 'Successfully deleted the account'
    })

})



export {
    delete_account
}