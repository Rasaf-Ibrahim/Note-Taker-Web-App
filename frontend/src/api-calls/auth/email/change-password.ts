/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// react query
import { useMutation } from '@tanstack/react-query';

// axios instance
import { axios_auth_instance } from "../_axios-auth-instance";

// toast
import { toast } from 'react-toastify';



/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_change_password_hook = {
    current_password: string
    new_password: string
}



/*__________________________________________

 ✅ hook 
____________________________________________*/

export function useChangePassword() {

    return useMutation<unknown, unknown, type_of_user_input_of_change_password_hook, unknown>(


        (user_data) => {
            return axios_auth_instance.patch('/email/change-password', user_data)
        },

        {
            onSuccess: (data) => {

                // show success toast
                toast.success('Password has successfully been updated', {
                    toastId: 'password_updated'
                })

            },

            onError: (error: type_of_obj_with_any_values) => {

                // do nothing
                // we will show the error on the UI, so no need to display any toast

            },
        }

    )
}

