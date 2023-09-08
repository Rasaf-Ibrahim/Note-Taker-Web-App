/*__________________________________________

 ✅ import 
____________________________________________*/

import numeric_filters from "./_numeric-filters.js"
import { type_of_obj_with_any_values } from "../../../types/commonly-used-types.js"


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_queries_for_fetch_all_request = {

    req_query: any,
    do_not_query_these_fields?: string[]
    numeric_filterable_fields?: string[]

}



/*__________________________________________
 
 ✅ util
____________________________________________*/

export default function queries_for_fetch_all_request(payload: type_of_queries_for_fetch_all_request): type_of_obj_with_any_values {



    const {
        req_query,
        do_not_query_these_fields = [],
        numeric_filterable_fields = []
    } = payload



    /* 🥪 setting up queries 🥪*/

    const page = Number(req_query.page) || 1

    const limit = Number(req_query.limit) || 10

    const skip = (page - 1) * limit;

    let select = ''

    let filter: any = {}

    let sort = ''




    /* 🥪 filtering 🥪 */

    /* Known fields to exclude from filter criteria */
    const knownFields = ['page', 'limit', 'select', 'numericFilters', 'sort'];


    /* Loop through query parameters and add them to filter object if they're not known */
    for (let field in req_query) {

        if (!knownFields.includes(field) && !do_not_query_these_fields.includes(field)) {

            filter[field] = req_query[field]
        }
    }


    if (req_query.numericFilters) {
        const numeric_filters_obj = numeric_filters({
            numeric_filters_extracted_from_query: req_query.numericFilters,
            numeric_filterable_fields: [...numeric_filterable_fields]
        })

        filter = { ...filter, ...numeric_filters_obj }
    }



    /* 🥪 selecting field 🥪 */

    if (req_query.select) {
        let select_fields = req_query.select as string
        select = select_fields.split(',').join(' ')
    }



    /* 🥪 sorting 🥪 */

    if (req_query.sort) {
        const sort_field = req_query.sort as string;
        sort = sort_field.split(',').join(' ');
    } else {
        sort = '-createdAt'
    }



    /* 🥪 returning queries 🥪 */
    return {
        page,
        limit,
        skip,
        select,
        filter,
        sort
    }
}


