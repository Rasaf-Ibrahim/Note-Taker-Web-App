
/*__________________________________________

 ✅ import 
____________________________________________*/

// zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// immer
import { produce } from 'immer'

// utils
import log_store_in_dev_env from '@/utils/log/log-store-in-dev-env-util'


/*__________________________________________

 ✅ types
____________________________________________*/


// 🍪 type of theme 

type type_of_primary_color = 'red' | 'amber' | 'light_green' | 'indigo' | 'cyan'

type type_of_theme = {
    dark_mode: boolean,
    primary_color: type_of_primary_color
}

// 🍪 type of theme store
type type_of_theme_store = {
    theme: type_of_theme
}



/*__________________________________________

 ✅ store 
____________________________________________*/
export const theme_store = create(

    persist(

        () => (

            // initial state 
            {

                theme: {
                    dark_mode: true,
                    primary_color: "cyan"
                }


            } as type_of_theme_store
        ),

        /* persisted state (local storage) */
        {
            name: "theme_store",
            skipHydration: true
        }
    )

)





/*__________________________________________

 ✅ actions 
____________________________________________*/


export const theme_store_actions = {


    // 🍪 update "theme" property
    theme: {


        switch_theme: () => {

            theme_store.setState(produce((draft: type_of_theme_store) => {

                draft.theme.dark_mode = !draft.theme.dark_mode

            }))
        },


        switch_to_dark_mode: () => {

            theme_store.setState(produce((draft: type_of_theme_store) => {

                draft.theme.dark_mode = true

            }))
        },


        switch_to_light_mode: () => {

            theme_store.setState(produce((draft: type_of_theme_store) => {

                draft.theme.dark_mode = false

            }))
        },


        update_primary_color: (color_name: type_of_primary_color) => {

            theme_store.setState(produce((draft: type_of_theme_store) => {

                draft.theme.primary_color = `${color_name}`

            }))

        }

    }

}





/*__________________________________________

 ✅ subscription 
____________________________________________*/

// 🍪 Log store changes in development environment
theme_store.subscribe(
    (state, prev_state) => {
        log_store_in_dev_env({
            store_name: 'theme_store',
            current_state: state,
            prev_state: prev_state
        })
    }
)
