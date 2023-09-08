

/*__________________________________________

 ✅ import 
____________________________________________*/

import { type_of_obj_with_any_values } from "../../../types/commonly-used-types.js"



/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_numeric_filters = {

    numeric_filters_extracted_from_query: any
    numeric_filterable_fields: string[]

}


/*__________________________________________

 ✅ util
____________________________________________*/

export default function numeric_filters(payload: type_of_numeric_filters): type_of_obj_with_any_values {

    const {
        numeric_filters_extracted_from_query,
        numeric_filterable_fields
    } = payload


    const filter_with_this_obj: type_of_obj_with_any_values = {}


    const operator_translation = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
    }


    const operator_regex = /\b(<|>|>=|=|<|<=)\b/g


    let translated_filters = numeric_filters_extracted_from_query.replace(operator_regex, (match) => `-${operator_translation[match]}-`)


    translated_filters.split(',').forEach((item) => {

        const [fieldName, operator, value] = item.split('-')

        if (numeric_filterable_fields.includes(fieldName)) {

            filter_with_this_obj[fieldName] = { [operator]: Number(value) }
        }
    })


    return filter_with_this_obj
}


