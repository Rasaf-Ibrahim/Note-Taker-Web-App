'use client'

/*__________________________________________

 ✅ import 
____________________________________________*/

// config
import config_obj from '@/config';

// hook
import { useMount } from 'react-use';
import useRouterProgrammaticNavigation from '../router-programmatic-navigation'

// store
import { auth_store, auth_store_actions } from '@/store/auth-store';

// react-toastify
import { toast } from "react-toastify";


type type_of_route_protection = {
    can_access:
    'not_signed_in_user' | 'signed_in_user_and_verification_status_unimportant' |
    'signed_in_but_not_verified_user' | 'signed_in_and_verified_user'
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function ROUTE_PROTECTION___COMPONENT(props: React.PropsWithChildren<type_of_route_protection>) {


    // 🍪 props
    const { can_access, children } = props

    // 🍪 navigate_programmatically hook
    const navigate_programmatically = useRouterProgrammaticNavigation()


    // 🍪 every time this component mounts, updating the "user_info" property of the "auth_store" 
    useMount(() => {

        auth_store_actions.update_user_info()

    })



    // 🍪 extracting 'user_state' property from "auth_store"
    const { user_state } = auth_store(state => ({
        user_state: state?.user_state,
    }))





    const handle_navigation_based_on_access_prop = {

        not_signed_in_user: function () {

            if (user_state.signed_in_or_up_at_least_5s_ago && user_state.email_is_verified) {

                toast.info('You are already signed in.', {
                    toastId: 'already_signed_in_or_up'
                })

                navigate_programmatically({ path: config_obj.page_path.home_after_login })

                return
            }


            else if (user_state.signed_in_or_up_at_least_5s_ago && !user_state.email_is_verified) {

                toast.info('You are already signed in but you need to verify your email.', {
                    toastId: 'already_signed_in_or_up_but_need_to_verify_email'
                })

                navigate_programmatically({ path: config_obj.page_path.verify_email })

                return
            }


           
            else if (user_state.just_signed_up && user_state.email_is_verified) {

                toast.success('🎉 You have signed up successfully.', {
                    toastId: 'signed_up'
                })

                navigate_programmatically({ path: config_obj.page_path.home_after_login })

                return
            }


            else if (user_state.just_signed_up && !user_state.email_is_verified) {

                toast.info('You have signed up successfully and now you need to verify your email.', {
                    toastId: 'signed_up_and_need_to_verify_email'
                })

                navigate_programmatically({ path: config_obj.page_path.verify_email })

                return
            }


            else if (user_state.just_signed_in && user_state.email_is_verified) {

                toast.success('🎉 You are signed in successfully', {
                    toastId: 'signed_in'
                })

                navigate_programmatically({ path: config_obj.page_path.home_after_login })

                return
            }


            else if (user_state.just_signed_in && !user_state.email_is_verified) {

                toast.info('You are signed in successfully and you need to verify your email', {
                    toastId: 'signed_in_but_need_to_verify_email'
                })

                navigate_programmatically({ path: config_obj.page_path.verify_email })

                return
            }
        },


        signed_in_user_and_verification_status_unimportant: function () {

            if (user_state.signed_out && !user_state.just_signed_out && !user_state.just_deleted_account) {

                toast.info('You need to sign in first', {
                    toastId: 'sign_in_first'
                })

                navigate_programmatically({ path: config_obj.page_path.sign_in })

                return
            }

          

            else if (user_state.signed_out && user_state.just_signed_out) {

                toast.success('You have signed out successfully.', {
                    toastId: 'signed_out'
                })

                navigate_programmatically({ path: config_obj.page_path.home_before_login })

                return
            }


            else if (user_state.signed_out && user_state.just_deleted_account) {

                toast.success('You have deleted your account successfully.', {
                    toastId: 'deleted_account'
                })

                navigate_programmatically({ path: config_obj.page_path.home_before_login })

                return
            }

        },


        signed_in_but_not_verified_user: function () {

            if (user_state.signed_in_or_up && user_state.email_is_verified) {

                toast.info('Your email is verified', {
                    toastId: 'email_is_verified'
                })

                navigate_programmatically({ path: config_obj.page_path.home_after_login })

                return
            }

            else if (user_state.signed_out) {

                toast.info('You need to sign in first', {
                    toastId: 'sign_in_first'
                })

                navigate_programmatically({ path: config_obj.page_path.sign_in })

                return
            }


        },

        signed_in_and_verified_user: function () {

            if (user_state.signed_in_or_up && !user_state.email_is_verified) {

                toast.info('You need to verify your email first', {
                    toastId: 'verify_email_first'
                })

                navigate_programmatically({ path: config_obj.page_path.verify_email })

                return
            }


            else if (user_state.signed_out) {

                toast.info('You need to sign in first', {
                    toastId: 'sign_in_first'
                })

                navigate_programmatically({ path: config_obj.page_path.sign_in })

                return
            }

        }
    }




    if (can_access === 'not_signed_in_user') {

        if (user_state.signed_out) {
            return children
        }

        else {

            handle_navigation_based_on_access_prop.not_signed_in_user()

        }
    }


    else if (can_access === 'signed_in_user_and_verification_status_unimportant') {

        if (user_state.signed_in_or_up) {

            return children
        }

        else {
            handle_navigation_based_on_access_prop.signed_in_user_and_verification_status_unimportant()
        }

    }


    else if (can_access === 'signed_in_but_not_verified_user') {

        if (user_state.signed_in_or_up && !user_state.email_is_verified) {

            return children
        }

        else {
            handle_navigation_based_on_access_prop.signed_in_but_not_verified_user()
        }

    }


    else if (can_access === 'signed_in_and_verified_user') {

        if (user_state.signed_in_or_up && user_state.email_is_verified) {

            return children
        }

        else {

            handle_navigation_based_on_access_prop.signed_in_and_verified_user()

        }

    }



}
