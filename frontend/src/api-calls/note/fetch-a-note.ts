/*__________________________________________

 ✅ import 
____________________________________________*/

// hook
import { useQuery } from '@tanstack/react-query';

// axios instance
import { axios_note_instance } from './_axios-note-instance'


/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useFetchNote(note_id:string) {


    return useQuery({

        queryKey: ["fetch_a_note"],

        queryFn: async () => {

            try {
                const response = await axios_note_instance.get(`/fetch-one/${note_id}`)

                return response.data
            }

            catch (error) {
                console.error("Error fetching user info:", error);
                throw error;
            }
        },


        // fetch when component mounts
        enabled: true,

        // if fetching fails for some reason, we want to retry one more time
        retry: 1,

        // refetch on specific situations
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,

        // no caching
        cacheTime: 0

    })

}


