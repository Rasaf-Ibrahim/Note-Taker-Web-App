// config
import config_obj from '@/config';

// hook
import { useQuery } from '@tanstack/react-query';

// axios
import axios from 'axios';



// 🍪 creating new axios instance
export const axios_server_health_check = axios.create({

    baseURL: `${config_obj.env.backend_base_url}/wake-up-the-server-if-sleeping`,

    headers: {
        'Content-Type': 'application/json'
    }

})


// 🍪 hook
export function useServerHealthCheck() {


    return useQuery({

        queryKey: ["server_health_check"],

        queryFn: async () => {

            const response = await axios_server_health_check.get(

                `/`,
            )

            return response.data
        },



        enabled: true,


        refetchInterval: 30000, // 30s



        refetchIntervalInBackground: true,



        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,





 
        retry: false,

        retryOnMount: false,



        //cacheTime

    })

}


