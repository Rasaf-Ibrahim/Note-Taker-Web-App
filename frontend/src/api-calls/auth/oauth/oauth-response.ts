/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// config
import config_obj from '@/config';

// react query
import { useMutation } from '@tanstack/react-query'

// axios instance
import { axios_auth_instance } from "../_axios-auth-instance"

// zustand store
import { auth_store_actions } from '@/store/auth-store';




/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_oauth_response_hook = void



/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useOauthResponse() {


    return useMutation<unknown, unknown, type_of_user_input_of_oauth_response_hook, unknown>(

        () => {
            return axios_auth_instance.post('/oauth/sign-in-or-up')
        },

        {
            onSuccess: (data) => {

                // update the store
                auth_store_actions.update_user_info()


                // returning data is must, otherwise can't be access in the UI
                return data
            },


            onError: (error: type_of_obj_with_any_values) => {

                // no need to show error toast from here, we will show error in the UI. But show error in the console

                const error_message = error.response.data.message

                if (error_message && config_obj.env.runtime_environment !== 'production') {

                    console.log(error_message)
                }

            },
        }

    )
}

