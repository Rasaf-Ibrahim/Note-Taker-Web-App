'use client'

/*__________________________________________

 ✅ import 
____________________________________________*/

// config
import config_obj from "@/config"


// type
import { type_of_anything } from "@/types/commonly-used-types"
import { type_of_password_reset_info } from '@/store/auth-store'


// date-fns
import { format, fromUnixTime } from 'date-fns';


// hook
import { useState } from 'react'
import { useMount, useUpdateEffect } from 'react-use'


// api hook
import { useSendPasswordResetMail, type_of_user_input_of_send_password_reset_mail_hook } from '@/api-calls/auth/email/send-password-reset-mail'

import { useResetPassword, type_of_user_input_of_reset_password_hook } from "@/api-calls/auth/email/reset-password"



// form management hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"


// store
import { auth_store, auth_store_actions } from '@/store/auth-store'


// css in js
import { styled } from "@mui/material/styles";


// styled component
import AUTH_PAGE_CONTAINER___STYLED from '@/components/styled/just-for-this-project/auth-page-container'


// router component
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation"


// components
import { Box, Stack, Button, Typography } from '@mui/material'
import MUI_INPUT___COMPONENT from '@/components/reusable/for-any-project/form/mui-input'
import MUI_PASSWORD___COMPONENT from "@/components/reusable/for-any-project/form/mui-password"






/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function RESET_PASSWORD___COMPONENT() {


    // 🍪 get the state properties 
    const { password_reset_info } = auth_store(state => ({
        password_reset_info: state?.password_reset_info
    }))


    // 🍪 state to track whether the email is sent and url has not expired
    const [email_is_sent_and_otp_has_not_expired, set_email_is_sent_and_otp_has_not_expired] = useState(false)


    // 🍪 on  the initial load or page refresh, checking whether the email is sent and url has not expired
    useMount(() => {
        if (!password_reset_info?.password_reset_otp_expiration_unix_timestamp) return

        if (password_reset_info && password_reset_info.password_reset_otp_expiration_unix_timestamp > Date.now()) {
            set_email_is_sent_and_otp_has_not_expired(true)
        }
    })


    // 🍪 useSendPasswordResetMail 
    const {
        mutate: password_reset_email_sending_mutate,
        status: password_reset_email_sending_status,
        error: password_reset_email_sending_error
    } = useSendPasswordResetMail()


    // 🍪 useResetPassword
    const {
        isSuccess: is_success_password_reset,
        mutate: password_reset_mutate,
        status: password_reset_status,
        data: password_reset_data,
        error: password_reset_error
    } = useResetPassword()




    // ✅ TSX
    return (

        <AUTH_PAGE_CONTAINER___STYLED paddingTop='5rem'>

            {(() => {

                if (is_success_password_reset) {

                    return <PASSWORD_IS_RESET_SUCCESSFULLY___CHILD />

                }


                else if (email_is_sent_and_otp_has_not_expired || password_reset_email_sending_status === 'success') {

                    return (
                        <Stack spacing='4rem' alignItems='center'>

                            <EMAIL_IS_ALREADY_SENT___CHILD
                                password_reset_info={password_reset_info} />

                            <FILL_FORM_AND_RESET_PASSWORD___CHILD
                                mutate={password_reset_mutate}
                                status={password_reset_status}
                                error={password_reset_error}
                                password_reset_info={password_reset_info}
                            />
                        </Stack>
                    )

                }


                else {

                    return (
                        <>
                            <SEND_EMAIL___CHILD
                                mutate={password_reset_email_sending_mutate}
                                status={password_reset_email_sending_status}
                                error={password_reset_email_sending_error}
                            />
                        </>
                    )
                }

            })()}


        </AUTH_PAGE_CONTAINER___STYLED>

    )

}





/*__________________________________________

✅ Sections of
<SEND_EMAIL_VERIFICATION_MAIL___COMPONENT/>
____________________________________________*/


// 🍪
function SEND_EMAIL___CHILD({ mutate, status, error }) {



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

        }

    }


    // 🍪 form state management (2/2 Steps) - useFormManagement 🍪
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = useFormManagement(form_configuration)



    // 🍪 form state management (3/3 Steps) - handleSubmit 🍪
    const handleSubmit = async (event) => {

        // 🥔🥔 stop refreshing the page on reload 🥔🥔
        event.preventDefault();


        /* 🥔🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔🥔 */
        if (validation_before_form_submission_func() === true) return



        // 🥔🥔 API request  🥔🥔
        const user_input: type_of_user_input_of_send_password_reset_mail_hook = {
            email: formState.form_data.email.value
        }

        mutate(user_input)


        /* 🥔🥔 form is submitted successfully  🥔🥔*/

        // actions.reset_form()

    }


    // if there is an error, reset the form
    useUpdateEffect(() => {

        if (status === 'error') {
            actions.reset_form()
        }

    }, [status])



    // ✅ TSX
    return (



        <Stack spacing='1.5rem' alignItems='center'>


            <Typography variant="h6">
                Reset Password
            </Typography>



            <Box sx={{ marginBottom: '1rem' }}>

                {/* 🥔🥔 Email 🥔🥔 */}
                <MUI_INPUT___COMPONENT

                    label='Enter your email address'

                    input_name='email'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}

                    // optional
                    multiline={false}
                    variant_value='filled' //standard, filled, outlined

                />

            </Box>

            {status === 'error' &&

                <Typography variant='body2' color='error.main'>{error.response.data.message}</Typography>

            }

            <Button
                type="button"
                onClick={handleSubmit}
                disabled={status === 'loading' || status === 'success'}
                variant="contained"
                sx={{ maxWidth: 'fit-content' }}>
                Send
            </Button>


        </Stack>
    )


}



// 🍪
function EMAIL_IS_ALREADY_SENT___CHILD({ password_reset_info }: { password_reset_info: type_of_password_reset_info }) {

    const date_and_time = fromUnixTime(password_reset_info.password_reset_otp_expiration_unix_timestamp / 1000)

    const formatted_date_and_time = format(date_and_time, "'at' hh:mm a 'on' MMMM d, yyyy");


    return (

        <Box sx={{ backgroundColor: 'background.variation_1', padding: '1rem' }}>

            <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                Password Reset Email is Sent
            </Typography>


            <Typography variant="body1" sx={{ marginBottom: '2rem', textAlign: 'justify', textAlignLast: 'center' }}>

                Password reset email has been sent to

                <Box component='span' sx={{ color: 'primary.main' }}> {password_reset_info.email}. </Box>

                If you don't see any email on your inbox, please check the spam folder as well.
            </Typography>


            <Typography variant='body1'>

                An OTP has been sent to your email. Please copy it and enter it into the form below. The OTP will expire

                <Box component='span' sx={{ color: 'primary.main' }}> {formatted_date_and_time} </Box>


            </Typography>

        </Box>
    )
}






/*__________________________________________

✅ Sections of 
<SEND_EMAIL_VERIFICATION_MAIL___COMPONENT/>
____________________________________________*/


// 🍪
function FILL_FORM_AND_RESET_PASSWORD___CHILD({ mutate, status, error, password_reset_info }) {



    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {


        /* 🥔  otp  🥔 */
        otp: {

            component_type: 'input',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^\d{6}$/,

                error_message: "Invalid OTP"
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






    // 🍪 form state management (3/3 Steps) - handleSubmit 🍪
    const handleSubmit = async (event) => {

        // 🥔 stop refreshing the page on reload 🥔
        event.preventDefault();


        /* 🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔 */
        if (validation_before_form_submission_func() === true) return



        // 🥔 API request  🥔
        const user_input: type_of_user_input_of_reset_password_hook = {
            user_email: password_reset_info.email,
            password_reset_otp: formState.form_data.otp.value,
            new_password: formState.form_data.password.value
        }

        mutate(user_input)


        /* 🥔 form is submitted successfully  🥔*/
        // actions.reset_form()

    }



    return (

        <Box sx={{ backgroundColor: 'background.variation_1', padding: '1rem' }}>


            <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
                Reset Password
            </Typography>


            <WRAPPER_OF_FORM___STYLED>


                {/* 🥔🥔 OTP 🥔🥔 */}
                <MUI_INPUT___COMPONENT

                    label='OTP'

                    input_name='otp'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}

                    // optional
                    multiline={false}
                    variant_value='outlined' //standard, filled, outlined

                />


                {/* 🥔 Password 🥔 */}
                <MUI_PASSWORD___COMPONENT

                    label='Password'

                    input_name='password'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    variant_value='outlined'  //standard, filled, outlined
                />



                {/* 🥔 Password Confirm🥔 */}
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
                    disabled={status === 'loading' || status === 'success'}
                    variant="contained"
                    sx={{ marginTop: '1rem' }}
                >
                    Reset
                </Button>


                {status === 'error' &&

                    /* server error message */
                    <Box sx={{ marginTop: '1rem', display: 'grid', gap: '1.5rem' }}>

                        <Typography variant='body1' color='error.main'>

                            {error.response.data.message}

                        </Typography>



                    </Box>
                }


            </WRAPPER_OF_FORM___STYLED>

        </Box>
    )


}





// 🍪
function PASSWORD_IS_RESET_SUCCESSFULLY___CHILD() {


    return (

        <>

            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                Your Password has been Reset
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    marginBottom: '2rem',
                    textAlign: 'justify',
                    textAlignLast: 'center'
                }}
            >

                Congratulations! Your password has been reset. Sign in with the new password. Click the following button to visit the sign in page.
            </Typography>


            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_in}>

                <Button variant='contained'>
                    Sign in Page
                </Button>

            </ROUTER_NAVIGATION___COMPONENT>


        </>

    )
}







/*__________________________________________

✅ Styled Components for 
<FILL_FORM_AND_RESET_PASSWORD___CHILD/>
____________________________________________*/


const WRAPPER_OF_FORM___STYLED = styled((props: type_of_anything) =>

    <Box {...props} component='form' />

)(({ theme }) => `


    ${/* width */''}
    width: 18rem;


    ${/* flex */''}
    display: flex;
    flex-direction: column;

    text-align:center; 
    gap:1rem;

`)



