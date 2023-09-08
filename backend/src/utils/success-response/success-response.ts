/*__________________________________________

 ✅ import
____________________________________________*/
import { Response } from "express"
import { type_of_obj_with_any_values } from "../../types/commonly-used-types.js"


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_success_response = {
    res: Response
    status_code?: number
    message: string
    created_document?: type_of_obj_with_any_values
    fetched_document?: type_of_obj_with_any_values
    fetched_documents?: type_of_obj_with_any_values
    updated_document?: type_of_obj_with_any_values
    info?: type_of_obj_with_any_values
}



/*__________________________________________

 ✅ util
____________________________________________*/

export default function success_response(payload: type_of_success_response) {

    const {
        res,
        message,
        status_code = 200,
        created_document,
        fetched_document,
        fetched_documents,
        updated_document,
        info
    } = payload


    res.status(status_code).json({

        status: 'success',
        message: message,
        created_document: created_document,
        fetched_document: fetched_document,
        fetched_documents: fetched_documents,
        updated_document: updated_document,
        info: info
    })


}