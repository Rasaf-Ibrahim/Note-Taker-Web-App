import config_obj from '@/config'

export default function log_in_dev_env(value: any): void {

    // Logging only in development environment
    if (config_obj.env.runtime_environment !== 'production') {

        // Log the stringified version 
        console.log(`✏️`, JSON.stringify(value, null, 2))

    }
}

