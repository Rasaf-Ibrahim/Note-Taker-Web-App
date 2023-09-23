/*__________________________________________

 ✅ import 
____________________________________________*/

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

type type_of_user_input = {
    title: string;
    description: string;
}


/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useCreateNote() {


    // 🍪 navigate_programmatically hook
    const navigate_programmatically = useRouterProgrammaticNavigation()



    // 🍪 useMutation
    return useMutation<unknown, unknown, type_of_user_input, unknown>(


        (user_note) => {

            return axios_note_instance.post('/create-one', user_note)

        },

        {
            onSuccess: (data: any) => {

                // show success toast
                toast.success('The note has successfully been created.', {
                    toastId: 'note_created'
                })

                const note_id = data.data.created_document._id

                navigate_programmatically({ path: config_obj.page_path.read_note(note_id) })
            },


            onError: (error: any) => {
                // show error toast
                const error_message = error.response.data.message

                toast.error(error_message, {
                    toastId: 'error_message'
                })
            }
        }

    )
}




