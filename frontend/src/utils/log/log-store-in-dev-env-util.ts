import config_obj from '@/config'

type type_of_payload = {
    store_name: string;
    current_state: Record<string, any>;
    prev_state: Record<string, any>;
}

export default function log_store_in_dev_env(payload: type_of_payload): void {

    // Destructing
    const { store_name, current_state, prev_state } = payload


    // Logging only in development environment
    if (config_obj.env.runtime_environment !== 'production') {

        // Identify changed properties and collect them in an array
        const changed_properties: string[] = []

        Object.keys(current_state).forEach(key => {
            if (prev_state[key] !== current_state[key]) {
                changed_properties.push(key)
            }
        })

        // Log the stringified version of the changed properties & Log the stringified version of the state
        console.groupCollapsed(`🔍 Zustand - ${store_name}`)

        console.log(`Properties changed:`, JSON.stringify(changed_properties, null, 2))

        console.log(`Current state:`, JSON.stringify(current_state, null, 2))

        console.groupEnd()

    }
}

