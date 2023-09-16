
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use';
import config_obj from '@/config'



type type_of_payload = {
    state_name: string;
    state: any
}


export function useLogStateInDevEnv(payload: type_of_payload) {

    // Destructing
    const { state_name, state } = payload


    // Log when the component mounts
    useEffect(() => {

        if (config_obj.env.runtime_environment !== 'production') {

            console.log(`🪄 State - ${state_name} - mounted`)


            // Return a cleanup function to log when the component unmounts
            return () => {
                console.log(`🪄 State - ${state_name} - unmounted`)
            }

        }

    }, [])



    // Log state changes 
    useUpdateEffect(() => {

        if (config_obj.env.runtime_environment !== 'production') {

            console.groupCollapsed(`🪄 State - ${state_name} - updated`)
            console.log(JSON.stringify(state, null, 2));
            console.groupEnd();
        }

    }, [state])


}

