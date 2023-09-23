/*__________________________________________

 ✅ import 
____________________________________________*/

// config
import config_obj from "@/config"

// axios
import axios from "axios"



/*__________________________________________

 ✅ axios instance
____________________________________________*/
export const axios_note_instance = axios.create({

    baseURL: `${config_obj.env.backend_base_url}/api/v1/rte-note`,

    headers: {
        'Content-Type': 'application/json',

        // Disable caching
        'Cache-Control': 'no-cache, no-store, must-revalidate', 
        'Pragma': 'no-cache', 
        'Expires': '0' 
    },

    withCredentials: true // cookie
})
