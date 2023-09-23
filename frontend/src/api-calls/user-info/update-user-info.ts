/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// react query
import { useMutation } from '@tanstack/react-query'

// axios instance
import { axios_user_instance } from './_axios-user-instance'

// zustand store
import { auth_store_actions } from '@/store/auth-store'

// react-toastify
import { toast } from "react-toastify"


/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_update_user_info_hook = {
    full_name?: string
    username?: string
    profile_picture?: File
}



/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useUpdateUserInfo() {

    return useMutation<unknown, unknown, type_of_user_input_of_update_user_info_hook, unknown>(

        (user_input) => {

            // new FormData object
            let form_data = new FormData()

            // append the "user_input" to the "form_data" object
            for (const key in user_input) {
                form_data.append(key, user_input[key])
            }

            // send the request 
            return axios_user_instance.patch('/update-one', form_data, {

                // override default "application/json" setup
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        },


        {
            onSuccess: (data) => {

                // update the store
                auth_store_actions.update_user_info()

                // show success toast
                toast.success('User info has successfully been updated', {
                    toastId: 'user_info_updated'
                })


            },

            onError: (error: type_of_obj_with_any_values) => {

                // show error toast
                const error_message = error.response.data.message

                toast.error(error_message, {
                    toastId: 'error_message'
                })
            }
        }

    )
}

