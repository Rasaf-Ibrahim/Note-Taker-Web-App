/*__________________________________________

 ✅ import 
____________________________________________*/

// hook
import { useQuery } from '@tanstack/react-query';

// axios instance
import { axios_note_instance } from './_axios-note-instance'

// note_store
import { note_store } from "@/store/note-store/note-store";

/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useFetchUserNotes() {


    // note store
    const { sort, limit, page } = note_store(state => ({
        sort: state?.note?.query_params?.sort,
        limit: state?.note?.query_params?.limit,
        page: state?.note?.query_params?.page
    }))



    return useQuery({


        queryKey: ["fetch_all_note_of_a_user"],

        queryFn: async () => {

            try {
                const response = await axios_note_instance.get(`/fetch-all-of-a-user/?limit=${limit}&page=${page}&sort=${sort}`)

                return response.data
            }

            catch (error) {
                console.error("Error fetching user info:", error);
                throw error;
            }
        },


        // don't fetch when component mounts, we will handle this manually
        enabled: false,

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


