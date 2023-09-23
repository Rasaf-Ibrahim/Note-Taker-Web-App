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
export const axios_auth_instance = axios.create({

    baseURL: `${config_obj.env.backend_base_url}/api/v1/auth`,

    headers: {
        'Content-Type': 'application/json'
    },

    withCredentials: true // cookie
})
