/*__________________________________________

 ✅ import 
____________________________________________*/

import numeric_filters from "./_numeric-filters.js"
import { type_of_obj_with_any_values } from "../../../types/commonly-used-types.js"


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_payload = {

    req_query: any,
    do_not_query_these_fields?: string[]
    numeric_filterable_fields?: string[]
}



/*__________________________________________
 
 ✅ util
____________________________________________*/


export default function prepare_mongoose_query_params(payload: type_of_payload): type_of_obj_with_any_values {


    


    // 🥪 payload 
    const {
        req_query,
        do_not_query_these_fields = [],
        numeric_filterable_fields = []
    } = payload



    // 🥪 Initializing variables which we will return from this function
    let page =  0 

    let limit = 0

    let skip = 0

    let select = ''

    let filter: any = {}

    let sort = ''



    // 🥪 Query Params that are not for filtering
    const query_params_that_are_not_for_filtering = [
        'select',
        'sort',
        'page',
        'limit',
    ]


    // 🥪 Query Params that are for custom filtering
    const query_params_that_are_for_custom_filtering = [
        'numericFilters'
    ]



    // 🥪 Filtering
    for (let field in req_query) {

        if (!query_params_that_are_not_for_filtering.includes(field) &&
            !query_params_that_are_for_custom_filtering.includes(field) &&
            !do_not_query_these_fields.includes(field)) {

            filter[field] = req_query[field]
        }
    }


    // 🥪 Custom Filtering

    if (req_query.numericFilters) {

        const numeric_filters_obj = numeric_filters({
            numeric_filters_extracted_from_query: req_query.numericFilters,
            numeric_filterable_fields: [...numeric_filterable_fields]
        })

        filter = { ...filter, ...numeric_filters_obj }
    }


    // 🥪 Selecting

    if (req_query.select) {

        let select_fields = req_query.select as string

        select = select_fields.split(',').join(' ')
    }


    // 🥪 Sorting

    if (req_query.sort) {
        const sort_field = req_query.sort as string
        sort = sort_field.split(',').join(' ')
    }
    else {
        sort = '-createdAt'
    }



    // 🥪 Pagination

    page = Number(req_query.page) || 1



    limit = Number(req_query.limit) || 10


    skip = (page - 1) * limit



    // 🥪 return 
    return {
        page,
        limit,
        skip,
        select,
        filter,
        sort
    }
}


