/*__________________________________________

 ✅ import 
____________________________________________*/

// hook
import { useQuery } from '@tanstack/react-query';

// axios instance
import { axios_user_instance } from './_axios-user-instance';



/*__________________________________________

 ✅ hook 
____________________________________________*/
export function useFetchUserInfo() {


    return useQuery({

        queryKey: ["user_info"],

        queryFn: async () => {

            try {
                const response = await axios_user_instance.get('/fetch-one')

                return response.data;
            }

            catch (error) {
                console.error("Error fetching user info:", error);
                throw error;
            }
        },


        // fetch when component mounts
        enabled: true,

        // refetch on specific situations
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,

        // no caching
        cacheTime: 0

    })

}


