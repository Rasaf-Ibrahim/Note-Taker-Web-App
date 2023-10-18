
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


// 🍪 type of note 

type type_of_note_query_param_limit = '5' | '10' | '15' | '20'

type type_of_note_query_param_sort = '-createdAt' | 'createdAt' | '-updatedAt' | 'updatedAt'

type type_of_note_query_params = {
    limit: type_of_note_query_param_limit
    page: string
    sort: type_of_note_query_param_sort
}

type type_of_note = {
    query_params: type_of_note_query_params
}



// 🍪 type of note store
type type_of_user_preference_store = {
    note: type_of_note
}



/*__________________________________________

 ✅ store 
____________________________________________*/
export const note_store = create(

    persist(

        () => (

            // initial state 
            {

                note: {

                    query_params: {
                        limit: '10',
                        page: '1',
                        sort: '-createdAt'
                    }

                }


            } as type_of_user_preference_store
        ),

        /* persisted state (local storage) */
        {
            name: "note_store",

            skipHydration: true
        }
    )

)





/*__________________________________________

 ✅ actions 
____________________________________________*/


export const note_store_actions = {


    // 🍪 update "note" property
    note: {

        update_query_param_page: function (page: string) {

            note_store.setState(produce((draft: type_of_user_preference_store) => {

                draft.note.query_params.page = page

            }))

        },


        update_query_param_limit: function (limit: type_of_note_query_param_limit) {

            note_store.setState(produce((draft: type_of_user_preference_store) => {

                draft.note.query_params.limit = limit
            }))

        },


        update_query_param_sort: function (sort: type_of_note_query_param_sort) {

            note_store.setState(produce((draft: type_of_user_preference_store) => {

                draft.note.query_params.sort = sort
            }))

        },


    }
}





/*__________________________________________

 ✅ subscription 
____________________________________________*/



// 🍪 updating the "note.query_params.page" property whenever "note.query_params.limit" changes

note_store.subscribe(

    (state, prevState) => {

        // ensuring limit has changed 
        if (state.note.query_params.limit === prevState.note.query_params.limit) return

        note_store_actions.note.update_query_param_page('1');

    }

)




// 🍪 Log store changes in development environment
note_store.subscribe(
    (state, prev_state) => {
        log_store_in_dev_env({
            store_name: 'note_store',
            current_state: state,
            prev_state: prev_state
        })
    }
)
