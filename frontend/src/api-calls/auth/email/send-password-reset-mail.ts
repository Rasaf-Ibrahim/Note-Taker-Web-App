
/*__________________________________________

 ✅ import 
____________________________________________*/

// react query
import { useMutation } from '@tanstack/react-query';


// axios instance
import { axios_auth_instance } from "../_axios-auth-instance";

// zustand store
import { auth_store_actions } from '@/store/auth-store'


/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_send_password_reset_mail_hook = {
    email: string
}


/*__________________________________________

 ✅ Hook 
____________________________________________*/
export function useSendPasswordResetMail() {

    return useMutation<unknown, unknown, type_of_user_input_of_send_password_reset_mail_hook, unknown>(

        (user_input) => {

            return axios_auth_instance.patch('/email/send-password-reset-mail', user_input)
        },


        {
            onSuccess: (data) => {

                auth_store_actions.update_password_reset_info()
            },

            onError: (error) => {

                // no need to show toast here, we are showing error message on the UI

            },
        }

    )
}

