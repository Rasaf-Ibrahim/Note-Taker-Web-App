/*__________________________________________

 ✅ import
____________________________________________*/

import { type_of_obj_with_any_values } from "../../types/commonly-used-types.js"



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_payload = {
    req_body: type_of_obj_with_any_values
    fetched_document: type_of_obj_with_any_values
    properties_to_check: string[]
}

/*__________________________________________

 ✅ util
____________________________________________*/
export default function at_least_value_of_one_property_has_changed(payload:type_of_payload): boolean {
    
    // 🍪 Destructure 
    const { req_body, fetched_document, properties_to_check } = payload


    // 🍪 Loop through each property that we want to check.
    for (const property of properties_to_check) {
        
        //  Check if the property exists in the req_body.
        if (req_body.hasOwnProperty(property)) {
            
            // Compare the value of the property in req_body with its value in the fetched_document.
            if (req_body[property] !== fetched_document[property]) {
                console.log('req', req_body[property], 'doc',fetched_document[property] )
                
                // If any property has changed, return true.
                return true
            }
        }
    }
    
    // 🍪 If no properties have changed, return false.
    return false
}
