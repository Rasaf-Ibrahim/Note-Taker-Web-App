'use client'

// react
import React from 'react';

// types
import { type_of_anything } from '@/types/commonly-used-types'

// config
import config_obj from '@/config';

// hook
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';

// api hook
import { useSignInUser, type_of_user_input_of_sign_in_user_hook } from "@/api-calls/auth/email/sign-in-user"

// form hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management";

// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'

// css in js
import type * as CSS from 'csstype';
import { styled } from '@mui/material/styles';
import css_media_queries from '@/styles/css-utils/media-queries'

// icons
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import GithubIcon from '@mui/icons-material/GitHub'

// components
import { Button, Typography, Divider, Box, BoxProps } from '@mui/material'


import LOGO___COMPONENT from '@/components/reusable/just-for-this-project/logo/logo'
import MUI_INPUT___COMPONENT from "@/components/reusable/for-any-project/form/mui-input"
import MUI_PASSWORD___COMPONENT from "@/components/reusable/for-any-project/form/mui-password"
import SIGN_IN_OR_UP_FORM_CONTAINER___STYLED from '@/components/styled/just-for-this-project/sign-in-or-up-form-container';




/*__________________________________________

 ✅ Functional Component 
__________________________________________*/
export default function SIGN_IN___COMPONENT() {


    return (

        <SIGN_IN_OR_UP_FORM_CONTAINER___STYLED>

            <FORM_TITLE_AND_LOGO___CHILD />

            <FORM_ALL_LOGIN_OPTIONS___CHILD />

            <FORM_FOOTER___CHILD />

        </SIGN_IN_OR_UP_FORM_CONTAINER___STYLED>

    )
}




/*__________________________________________

 ✅ Child Components of
  <SIGN_IN___COMPONENT/>
__________________________________________*/


/* 🥔 */

function FORM_TITLE_AND_LOGO___CHILD() {

    return (

        <>

            <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center'
            })}>

                <LOGO___COMPONENT />

            </Box>

            <Typography sx={(theme) => ({
                marginTop: '2rem',
                marginBottom: '1rem',
                color: theme.palette.primary.light,
                fontFamily: "'Source Code Pro', monospace",
                textAlign: 'center'
            })}
                variant='h5'>
                Sign In
            </Typography>

        </>

    )

}


/* 🥔 */
function FORM_ALL_LOGIN_OPTIONS___CHILD() {


    // state to show and hide dropdown
    const [showDropdown, setShowDropdown] = useState(false)

    const handleClick = () => {

        setShowDropdown(!showDropdown)
    }



    const google_oauth = () => {
        window.open(
            `${config_obj.env.backend_base_url}/api/v1/auth/oauth/google/initiate-oauth-process`,
            "_self"

        )
    }


    const github_oauth = () => {
        window.open(
            `${config_obj.env.backend_base_url}/api/v1/auth/oauth/github/initiate-oauth-process`,
            "_self"

        )
    }



    return (

        <>

            <Button
                onClick={google_oauth}
                startIcon={<GoogleIcon />}
                variant='contained'
                sx={{ justifyContent: 'flex-start' }}>

                Sign in with Google
            </Button>


            <Button
                onClick={github_oauth}
                startIcon={<GithubIcon />}
                variant='contained'
                sx={{ justifyContent: 'flex-start' }}>

                Sign in with Github
            </Button>


            <Divider />


            <Button
                onClick={handleClick}
                startIcon={<EmailIcon />}
                variant='contained'
                sx={{ justifyContent: 'flex-start' }}>

                Sign in with Email
            </Button>


            {showDropdown &&

                <SIGN_IN_WITH_EMAIL___CHILD />

            }

        </>

    )

}


/* 🥔 */
function FORM_FOOTER___CHILD() {


    return (

        <Box
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
            })}>


            <Typography variant='body2'>
                Don't have an account?
            </Typography>


            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_up}>

                <LINK_TEXT___STYLED>
                    Sign Up
                </LINK_TEXT___STYLED>

            </ROUTER_NAVIGATION___COMPONENT>


        </Box>
    )

}




/*__________________________________________

 ✅ Child Components of
  <FORM_ALL_LOGIN_OPTIONS___CHILD/>
____________________________________________*/


/* 🥔 */
function SIGN_IN_WITH_EMAIL___CHILD() {


    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {

        /* 🥔  email  🥔 */
        email: {

            component_type: 'input',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/,

                error_message: "Provide a valid Email."
            }

        },




        /* 🥔 password  🥔 */
        password: {

            component_type: 'password',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,

                error_message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
            }

        },



    }


    // 🍪 form state management (2/2 Steps) - useFormManagement 🍪
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = useFormManagement(form_configuration)



    //useLogger('formState', formState)


    // 🍪 hook related to API request 🍪
    const { mutate, status, data, error } = useSignInUser()


    // 🍪 form state management (3/3 Steps) - handleSubmit 🍪
    const handleSubmit = async (event) => {

        // 🥔🥔 stop refreshing the page on reload 🥔🥔
        event.preventDefault();



        /* 🥔🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔🥔 */
        if (validation_before_form_submission_func() === true) return


        /* 🥔🥔 submit the form's all the inputted data 🥔🥔 */
        console.log('😃 submitting data', {
            ...formState.form_data
        })


        // 🥔🥔 API request  🥔🥔
        const user_input: type_of_user_input_of_sign_in_user_hook = {
            email: formState.form_data.email.value,
            password: formState.form_data.password.value
        }

        mutate(user_input)



        /* 🥔🥔 form is submitted successfully  🥔🥔*/

        // checking for error from server before resetting the form  
        if (!error) {
            actions.reset_form()
        }

    }


    /*__________________________________________
    
        ✅ JSX 
    ____________________________________________*/
    return (

        <>


            {/* 🥔🥔 Email 🥔🥔 */}
            <MUI_INPUT___COMPONENT

                label='Email'

                input_name='email'

                state={formState}

                actions={actions}

                validation_info={validation_info}

                // optional
                multiline={false}
                variant_value='outlined' //standard, filled, outlined

            />

            {/* 🥔🥔 Password 🥔🥔 */}
            <MUI_PASSWORD___COMPONENT

                label='Password'

                input_name='password'

                state={formState}

                actions={actions}

                validation_info={validation_info}


                // optional
                variant_value='outlined'  //standard, filled, outlined
            />



            <FORGOT_PASSWORD___CHILD />


            <Button
                type="button"
                onClick={handleSubmit}
                disabled={status && status === 'loading'}
                variant="contained">
                Sign in
            </Button>


        </>

    )


}




/*__________________________________________

 ✅ Child Components of
  <SIGN_IN_WITH_EMAIL___CHILD/>
____________________________________________*/

/* 🥔 */
function FORGOT_PASSWORD___CHILD() {

    return (


        <Typography sx={(theme) => ({
            color: theme.palette.primary.main,
            ":hover": {
                color: theme.palette.primary.dark
            },
            width: '100%',
            textAlign: 'left'
        })}
            variant='body2'>

            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.reset_password}>
                Forgot Password
            </ROUTER_NAVIGATION___COMPONENT>
        </Typography>



    )

}








/*__________________________________________

 ✅ Styled Components of 
 <FORM_FOOTER___CHILD/>
__________________________________________*/

/* 🥔 */
const LINK_TEXT___STYLED = styled((props: type_of_anything) =>

    <Typography  {...props} variant='body2' />

)(({ theme }) => `

    color: ${theme.palette.primary.main};
    :hover {
        color: ${theme.palette.primary.dark}
    }
    
`)

