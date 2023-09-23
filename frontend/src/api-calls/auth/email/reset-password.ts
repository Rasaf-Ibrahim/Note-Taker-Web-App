/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// react query
import { useMutation } from '@tanstack/react-query';

// axios instance
import { axios_auth_instance } from "../_axios-auth-instance";

// zustand store
import { auth_store_actions } from '@/store/auth-store'


/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_reset_password_hook = {
    user_email: string
    password_reset_otp: string
    new_password: string
}



/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useResetPassword() {

    return useMutation<unknown, unknown, type_of_user_input_of_reset_password_hook, unknown>(

        (user_input) => {

            return axios_auth_instance.patch('/email/reset-password', user_input)
        },

        {
            onSuccess: (data) => {

                setTimeout(() => {

                    auth_store_actions.update_password_reset_info()

                }, 0)

            },

            onError: (error: type_of_obj_with_any_values) => {

                // do nothing
                // we will show the error on the UI, so no need to display any toast

            },
        }

    )
}

