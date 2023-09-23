/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// config
import config_obj from '@/config';

// react query
import { useMutation } from '@tanstack/react-query';

// axios instance
import { axios_note_instance } from './_axios-note-instance';

// router hook
import useRouterProgrammaticNavigation from '@/utils/route/router-programmatic-navigation'

// toast
import { toast } from 'react-toastify'




/*__________________________________________

 ✅ types 
____________________________________________*/

export type type_of_user_input_of_update_note_hook = {
    note_id: string

    note_data: {
        title: string
        description?: string,
        public_id_of_cloudinary_images?: string[]
    }

}



/*__________________________________________

 ✅ hook 
____________________________________________*/

export function useUpdateNote() {


    // 🍪 navigate_programmatically hook
    const navigate_programmatically = useRouterProgrammaticNavigation()



    // 🍪 useMutation
    return useMutation<unknown, unknown, type_of_user_input_of_update_note_hook, unknown>(


        (user_input) => {
            return axios_note_instance.patch(`/update-one/${user_input.note_id}`, user_input.note_data)
        },

        {
            onSuccess: (data: any) => {

                // show success toast
                toast.success('Note has successfully been updated', {
                    toastId: 'updated_note'
                })

                const note_id = data.data.fetched_document._id

                navigate_programmatically({ path: config_obj.page_path.read_note(note_id) })

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

