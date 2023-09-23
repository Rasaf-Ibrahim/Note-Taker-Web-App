/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// react query
import { useMutation } from '@tanstack/react-query';

// axios instance
import { axios_auth_instance } from "../_axios-auth-instance";

//  zustand store
import { auth_store_actions } from '@/store/auth-store';


/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_verify_email_hook = {
    user_email: string
    email_verification_otp: string
}



/*__________________________________________

 ✅ hook 
____________________________________________*/

export function useVerifyEmail() {


    return useMutation<unknown, unknown, type_of_user_input_of_verify_email_hook, unknown>(


        (user_input) => {

            return axios_auth_instance.patch('/email/verify-email', user_input)

        },

        {
            onSuccess: (data) => {

                auth_store_actions.update_user_info()
            },

            onError: (error: type_of_obj_with_any_values) => {

                const error_message = error.response.data.message

                // do nothing
                // we will show the error on the UI, so no need to display any toast

            },
        }

    )
}

