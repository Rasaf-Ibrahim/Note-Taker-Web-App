/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_anything } from '@/types/commonly-used-types'

// zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// immer
import { produce } from 'immer'

// utils
import extract_cookie_value from '@/utils/get-cookie/get-cookie'
import log_store_in_dev_env from '@/utils/log/log-store-in-dev-env-util'

/*__________________________________________

 ✅ type 
____________________________________________*/

export type type_of_user_info = {
    auth_provider?: string
    _id?: string
    username?: string
    email?: string
    is_email_verified?: boolean
    full_name?: string
    picture_link?: string
    role?: string
    last_signed_in_unix_timestamp?: type_of_anything
    last_access_unix_timestamp?: type_of_anything
    email_verification_otp_expiration_unix_timestamp?: type_of_anything
    createdAt?: type_of_anything,
}


type type_of_user_state = {
    signed_out: boolean,
    just_signed_out: boolean,
    just_deleted_account: boolean,

    signed_in_or_up: boolean,
    signed_in_or_up_at_least_5s_ago: boolean,
    just_signed_up: boolean,
    just_signed_in: boolean,

    email_is_verified: boolean,
}


export type type_of_password_reset_info = {
    password_reset_otp_expiration_unix_timestamp: type_of_anything
    email: string
}


type type_of_auth_store = {
    user_info?: type_of_user_info
    user_state?: type_of_user_state
    password_reset_info?: type_of_password_reset_info
    last_sign_out_unix_timestamp?: type_of_anything
    last_account_delete_unix_timestamp?: type_of_anything
}



/*__________________________________________

 ✅ store 
____________________________________________*/
export const auth_store = create(

    persist(

        () => (

            // initial state 
            {

                

                user_info: {},

                user_state: {
                    signed_out: true,
                    just_signed_out: false,

                    just_deleted_account: false,

                    signed_in_or_up: false,
                    signed_in_or_up_at_least_5s_ago: false,
                    just_signed_up: false,
                    just_signed_in: false,

                    email_is_verified: false
                },

                password_reset_info: {
                    password_reset_otp_expiration_unix_timestamp: undefined,

                    email: undefined

                },

                last_sign_out_unix_timestamp: null,

                last_account_delete_unix_timestamp: null

            } as type_of_auth_store
        ),


        /* persisted state (local storage) */
        {
            name: "auth_store",

            
            skipHydration: true
        }
    )


)



/*__________________________________________

 ✅ actions 
____________________________________________*/


export const auth_store_actions = {


    // 🍪 update "user_info" property
    update_user_info: function () {

        const user_info_from_cookie = extract_cookie_value('user_info')

        if (user_info_from_cookie) {

            // extract only valid properties based on type_of_user_info
            const valid_user_info: type_of_user_info = {
                auth_provider: user_info_from_cookie.auth_provider,
                _id: user_info_from_cookie._id,
                username: user_info_from_cookie.username,
                email: user_info_from_cookie.email,
                is_email_verified: user_info_from_cookie.is_email_verified,
                full_name: user_info_from_cookie.full_name,
                picture_link: user_info_from_cookie.picture_link,
                role: user_info_from_cookie.role,
                last_signed_in_unix_timestamp: user_info_from_cookie.last_signed_in_unix_timestamp,
                last_access_unix_timestamp: user_info_from_cookie.last_access_unix_timestamp,
                email_verification_otp_expiration_unix_timestamp: user_info_from_cookie.email_verification_otp_expiration_unix_timestamp,
                createdAt: user_info_from_cookie.createdAt,
            }


            // update the state
            auth_store.setState(produce((draft) => {
                draft.user_info = valid_user_info
            }))

        }

        // when user hasn't signed in or up yet or deleted the cookie. setting the initial value
        else if (!user_info_from_cookie) {

          

            auth_store.setState(produce((draft) => {
                draft.user_info = {}
            }))
        }
    },



    // 🍪 update "password_reset_info" property
    update_password_reset_info: function () {

        const password_reset_info_from_cookie = extract_cookie_value('password_reset_info')


        if (password_reset_info_from_cookie) {

            const valid_password_reset_info: type_of_password_reset_info = {
                email: password_reset_info_from_cookie.email,

                password_reset_otp_expiration_unix_timestamp: password_reset_info_from_cookie.password_reset_otp_expiration_unix_timestamp
            }

            auth_store.setState(produce((draft) => {
                draft.password_reset_info = valid_password_reset_info
            }))

        }


        // do nothing   
        // else {}


    }
}


/*__________________________________________

 ✅ subscription 
____________________________________________*/

// 🍪 updating the "user_state" property whenever "user_info" or "last_sign_out_unix_timestamp" or "last_account_delete_unix_timestamp" changes
auth_store.subscribe(

    (state, prevState) => {


        //🥔 ensuring any of the following 3 properties have changed:"user_info, last_sign_out_unix_timestamp, last_account_delete_unix_timestamp"
        if (
            state.user_info === prevState.user_info &&

            state.last_sign_out_unix_timestamp === prevState.last_sign_out_unix_timestamp &&

            state.last_account_delete_unix_timestamp === prevState.last_account_delete_unix_timestamp
        ) return



        // 🥔 function for updating the 'user_state'
        function update_user_state_func() {

            // 🥔 destructing the properties
            const { user_info, last_sign_out_unix_timestamp, last_account_delete_unix_timestamp } = auth_store.getState()


            // 🥔 util - has_5s_elapsed_since_provided_timestamp
            function has_5s_elapsed_since_provided_timestamp(providedTimestamp): boolean {

                const currentTimestamp = Date.now();

                const differenceInMilliseconds = currentTimestamp - providedTimestamp;

                const differenceInSeconds = differenceInMilliseconds / 1000;

                return differenceInSeconds > 5
            }


            // 🥔 has 5s second passed till user has signed up or in or out?
            const user_signed_up_at_least_5s_ago = has_5s_elapsed_since_provided_timestamp(new Date(user_info?.createdAt).getTime())

            const user_signed_in_at_least_5s_ago = has_5s_elapsed_since_provided_timestamp(user_info?.last_signed_in_unix_timestamp)

            const user_signed_out_at_least_5s_ago = has_5s_elapsed_since_provided_timestamp(last_sign_out_unix_timestamp)


            const user_deleted_at_least_5s_ago = has_5s_elapsed_since_provided_timestamp(last_account_delete_unix_timestamp)


            // 🧅 updating the state
            auth_store.setState(produce((draft) => {

                const { user_state } = draft

                user_state.signed_out = (!user_info._id) ? true : false,

                    user_state.just_signed_out = (!user_info._id && !user_signed_out_at_least_5s_ago) ? true : false,

                    user_state.just_deleted_account = (!user_info._id && !user_deleted_at_least_5s_ago) ? true : false,

                    user_state.signed_in_or_up = (user_info._id) ? true : false,

                    user_state.signed_in_or_up_at_least_5s_ago = (user_info._id && user_signed_up_at_least_5s_ago && user_signed_in_at_least_5s_ago) ? true : false,

                    user_state.just_signed_up = (user_info._id && !user_signed_up_at_least_5s_ago) ? true : false,

                    user_state.just_signed_in = (user_info._id && user_signed_up_at_least_5s_ago && !user_signed_in_at_least_5s_ago) ? true : false,

                    user_state.email_is_verified = (user_info?.is_email_verified) ? true : false
            }))

        }



        // 🥔 immediately calling the "update_user_state_func" function to update the "user_state"
        update_user_state_func()


        // 🥔 setTimeout ensures that the user_state is re-evaluated and updated 5.5 seconds after the initial update because some of the conditions for updating the user_state are based on whether 5 seconds have passed since certain events (like user sign-in, sign-up, or sign-out)
        setTimeout(() => {
            update_user_state_func()
        }, 5500)



    }
)




// 🍪 Log store changes in development environment
auth_store.subscribe(
    (state, prev_state) => {
        log_store_in_dev_env({
            store_name: 'auth_store',
            current_state: state,
            prev_state: prev_state
        })
    }
)


