/*__________________________________________

 ✅ import 
____________________________________________*/

import success_response from "../success-response/success-response.js"
import error_response from "../../error-handlers/error-response/error-response.js"



/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_success_response_for_fetch_all_request = {

    res: any
    next: any
    model: any
    limit: any
    page: any
    skip: any,
    filter: any,
    fetched_documents: any
}



/*__________________________________________

 ✅ util 
____________________________________________*/

export const success_response_for_fetch_all_request = async (payload: type_of_success_response_for_fetch_all_request) => {

    const {
        res,
        next,
        model,
        limit,
        page,
        skip,
        filter,
        fetched_documents
    } = payload



    /* 🥪 calculate extra info 🥪*/
    const total_documents = await model.countDocuments({ ...filter });
    const documents_per_page = limit;
    const total_pages = Math.ceil(total_documents / documents_per_page);
    const current_page = page;
    const current_documents_range = {
        start: total_documents > 0 ? skip + 1 : 0,
        end: Math.min(skip + documents_per_page, total_documents)
    }


    /* 🥪 check if the requested page exists when there is at least 1 document🥪 */
    if (page > total_pages && total_documents > 0) {
        return error_response({
            next: next,
            status_code: 404,
            message: `No page found with number: ${page}. There are total ${total_pages} pages and each page has ${documents_per_page} documents`
        });
    }


    /*🥪 success response 🥪*/
    return success_response({
        res: res,
        message: "Documents are successfully fetched.",
        fetched_documents: fetched_documents,
        info: {
            total_documents: total_documents,
            documents_per_page: limit,
            total_pages: total_pages,
            current_page: current_page,
            current_documents_range: current_documents_range
        }
    })

}