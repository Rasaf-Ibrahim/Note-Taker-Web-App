'use client'
/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react';

// types
import { type_of_anything } from '@/types/commonly-used-types'

// config
import config_obj from '@/config';

// hook
import { useState } from 'react';

// form hook
import useFormManagement from "@/utils/global-hooks/use-form-management"

// api hook
import { useSignUpUser, type_of_user_input_of_sign_up_user_hook } from "@/api-calls/auth/email/sign-up-user";

// type
import { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"

// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'

// icons
import EmailIcon from '@mui/icons-material/Email'
import GoogleIcon from '@mui/icons-material/Google'
import GithubIcon from '@mui/icons-material/GitHub'


// styled components
import { styled } from '@mui/material/styles'
import SIGN_IN_OR_UP_FORM_CONTAINER___STYLED from '@/components/styled/just-for-this-project/sign-in-or-up-form-container';


// components
import { Button, Typography, Divider, Box } from '@mui/material'

import LOGO___COMPONENT from '@/components/reusable/just-for-this-project/logo/logo'
import MUI_INPUT___COMPONENT from "@/components/reusable/for-any-project/form/mui-input"
import MUI_PASSWORD___COMPONENT from "@/components/reusable/for-any-project/form/mui-password"






/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SIGN_UP___COMPONENT() {


    return (

        <SIGN_IN_OR_UP_FORM_CONTAINER___STYLED>

            <FORM_TITLE_AND_LOGO___CHILD />

            <FORM_ALL_SIGN_UP_OPTIONS___CHILD />

            <FORM_FOOTER___CHILD />

        </SIGN_IN_OR_UP_FORM_CONTAINER___STYLED>

    )
}





/*__________________________________________

 ✅ Child Components of 
 <SIGN_UP___COMPONENT/>
____________________________________________*/


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
                Sign Up
            </Typography>

        </>

    )

}



/* 🥔 */
function FORM_ALL_SIGN_UP_OPTIONS___CHILD() {


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

                Sign up with Google
            </Button>


            <Button
                onClick={github_oauth}
                startIcon={<GithubIcon />}
                variant='contained'
                sx={{ justifyContent: 'flex-start' }}>

                Sign up with Github
            </Button>



            <Divider />


            <Button
                onClick={handleClick}
                startIcon={<EmailIcon />}
                variant='contained'
                sx={{ justifyContent: 'flex-start' }}>

                Sign up with Email
            </Button>


            {showDropdown &&

                <SIGN_UP_WITH_EMAIL___CHILD />

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
                flexDirection: 'column',
                gap: '1rem',

                textAlign: 'justify'
            })}>


            <Typography variant='body2'>

                By signing up, you agree to the

                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.terms_of_service}>
                    <LINK_TEXT___STYLED component='span'> Terms of Service </LINK_TEXT___STYLED>
                </ROUTER_NAVIGATION___COMPONENT>

                and

                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.privacy_policy}>
                    <LINK_TEXT___STYLED component='span'> Privacy Policy, </LINK_TEXT___STYLED>
                </ROUTER_NAVIGATION___COMPONENT>

                including

                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.cookie_use}>
                    <LINK_TEXT___STYLED component='span'> Cookie Use. </LINK_TEXT___STYLED>
                </ROUTER_NAVIGATION___COMPONENT>

            </Typography>


            <Box sx={(theme) => ({
                display: 'flex',
                gap: '0.5rem'
            })}>

                <Typography variant='body2'> Have an account already?</Typography>


                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_in}>

                    <LINK_TEXT___STYLED >
                        Sign In
                    </LINK_TEXT___STYLED>

                </ROUTER_NAVIGATION___COMPONENT>


            </Box>

        </Box>
    )

}



/*__________________________________________

 ✅ Child Components of
  <FORM_ALL_SIGN_UP_OPTIONS___CHILD/>
____________________________________________*/


function SIGN_UP_WITH_EMAIL___CHILD() {

    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {


        /* 🥔  full_name  🥔 */
        full_name: {

            component_type: 'input',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^[A-Za-z\s.-]{3,60}$/,

                error_message: "Please enter a valid name containing only English letters, spaces, dots, or hyphens, with a length between 3 and 60 characters."
            }

        },



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


        /* 🥔 password_confirm  🥔 */
        password_confirm: {

            component_type: 'password',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_this_field: 'password',

                error_message: "Confirm password must match with the password."
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




    // 🍪 hook related to API request 🍪
    const { mutate, status, data, error } = useSignUpUser();




    // 🍪 form state management (3/3 Steps) - handleSubmit 🍪
    const handleSubmit = (event) => {

        // 🥔🥔 stop refreshing the page on reload 🥔🥔
        event.preventDefault();



        /* 🥔🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔🥔 */
        if (validation_before_form_submission_func() === true) return



        // 🥔🥔 API request  🥔🥔
        const user_input: type_of_user_input_of_sign_up_user_hook = {
            full_name: formState.form_data.full_name.value,
            email: formState.form_data.email.value,
            password: formState.form_data.password.value,
            password_confirm: formState.form_data.password_confirm.value
        }

        mutate(user_input)


        /* 🥔🥔 form is submitted successfully  🥔🥔*/

        // checking for error from server before resetting the form  
        if (!error) {
            actions.reset_form()
        }


    }




    // ✅ TSX
    return (

        <>



            {/* 🥔🥔 Full Name 🥔🥔 */}
            <MUI_INPUT___COMPONENT

                label='Full Name'

                input_name='full_name'

                state={formState}

                actions={actions}

                validation_info={validation_info}

                // optional
                multiline={false}
                variant_value='outlined' //standard, filled, outlined

            />



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



            {/* 🥔🥔 Password Confirm🥔🥔 */}
            <MUI_PASSWORD___COMPONENT

                label='Confirm Password'

                input_name='password_confirm'

                state={formState}

                actions={actions}

                validation_info={validation_info}


                // optional
                variant_value='outlined'  //standard, filled, outlined

            />



            <Button
                type="button"
                onClick={handleSubmit}
                disabled={status && status === 'loading'}
                variant="contained"
            >
                Sign Up
            </Button>


        </>

    )


}



/*__________________________________________

 ✅ Styled Components for
  <FORM_FOOTER___CHILD/>
____________________________________________*/


/* 🥔 */
const LINK_TEXT___STYLED = styled((props: type_of_anything) =>

    <Typography  {...props} variant='body2' />

)(({ theme }) => `

    color: ${theme.palette.primary.main};
    :hover {
        color: ${theme.palette.primary.dark}
    }
    
`)
