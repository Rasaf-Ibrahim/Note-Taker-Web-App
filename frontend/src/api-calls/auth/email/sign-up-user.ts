/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from "@/types/commonly-used-types"

// axios instance
import { axios_auth_instance } from "../_axios-auth-instance";

// react query hook
import { useMutation } from '@tanstack/react-query';

//  zustand store
import { auth_store, auth_store_actions } from "@/store/auth-store"

// react-toastify
import { toast } from "react-toastify";


/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_sign_up_user_hook = {
    full_name: string
    email: string
    password: string
    password_confirm: string
}



/*__________________________________________

 ✅ hook 
____________________________________________*/

export function useSignUpUser() {


    return useMutation<unknown, unknown, type_of_user_input_of_sign_up_user_hook, unknown>(


        (user_input) => {

            return axios_auth_instance.post('/email/signup', user_input)
        },

        {
            onSuccess: (data) => {

                auth_store_actions.update_user_info()

            },

            onError: (error: type_of_obj_with_any_values) => {
                // show error toast
                const error_message = error.response.data.message

                toast.error(error_message, {
                    toastId: 'error_message'
                })
            },
        }

    )
}

