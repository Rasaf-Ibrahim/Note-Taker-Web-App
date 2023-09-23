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
export const axios_user_instance = axios.create({

    baseURL: `${config_obj.env.backend_base_url}/api/v1/user`,

    headers: {
        'Content-Type': 'application/json'
    },

    withCredentials: true // cookie

})
