/*__________________________________________

 ✅ import 
____________________________________________*/

// react query
import { useMutation } from '@tanstack/react-query';

// axios instance
import { axios_note_instance } from './_axios-note-instance';

// toast
import { toast } from 'react-toastify'


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_user_input = {
    note_ids: string[]
}


/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useDeleteNotes() {


    // 🍪 useMutation
    return useMutation<unknown, unknown, type_of_user_input, unknown>(


        (user_note) => {

            return axios_note_instance.post('/delete-one-or-multiple', user_note)

        },

        {
            onSuccess: (data: any) => {

                // show success toast
                toast.success('Successfully deleted.', {
                    toastId: 'notes_deleted'
                })
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




