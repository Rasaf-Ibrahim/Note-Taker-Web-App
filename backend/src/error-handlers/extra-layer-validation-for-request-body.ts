/*__________________________________________

 ✅ import
____________________________________________*/
// library
import { StatusCodes } from "http-status-codes";

// error response
import error_response from "./error-response/error-response.js";

// type
import { Request, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { error } from "console";




/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_extra_layer_validation_for_request_body = {

    req: Request

    next: NextFunction

    fields_to_validate: {
        name: string,
        type: ZodTypeAny
        custom_message?: string
    }[]
}




/*__________________________________________

 ✅ util
____________________________________________*/
export default function extra_layer_validation_for_request_body(payload: type_of_extra_layer_validation_for_request_body): {any_error: boolean} {

    const {
        req,
        next,
        fields_to_validate,
    } = payload

    let any_error = false
    const missing_fields: string[] = []
    const incorrect_type_fields: string[] = []


    for (const field of fields_to_validate) {


        /* 🥪 checking whether the field is in the request body or not 🥪 */
        const field_in_req_body = req.body[field.name]

        if (field_in_req_body === undefined) {
            missing_fields.push(field.name);
            continue;
        }

        
        /* 🥪 checking whether the type is matching or not 🥪 */
        const type_has_matched = field.type.safeParse(field_in_req_body)


        /* 🥪 if type hasn't matched 🥪 */
        if (!type_has_matched.success) {
            
            // error message
            let error_message;

            // if custom error message is available, use that
            if (field.custom_message) {
                error_message = field.custom_message 
            }
    
            // otherwise automate error message
            else {
              
                // as I am using Zod, type name starts with "Zod" (ZodArray, ZodString, etc.), so removing the "Zod" part from the type name
                const typeName = field.type._def.typeName.replace(/^Zod(.*)$/, '$1')

                error_message = `You should use ${typeName} instead of ${typeof field_in_req_body}`;
            }

            incorrect_type_fields.push(`${field.name}: ${error_message}`)
        
        }

    }

    

    if (missing_fields.length > 0) {

        any_error = true

         error_response({
            next:next,
            status_code: StatusCodes.BAD_REQUEST,
            message: `Missing required fields: ${missing_fields.join(', ')}`
        })
    }


    if (incorrect_type_fields.length > 0) {

        any_error = true

        // just show error message, don't return from here
        error_response({
            next:next,
            status_code: StatusCodes.BAD_REQUEST,
            message: `Fields with incorrect value: ${incorrect_type_fields.join('. ')}`
        })
    }


    return {
        any_error
    }

}
