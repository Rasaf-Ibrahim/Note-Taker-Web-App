'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_anything } from "@/types/commonly-used-types"
import { type_of_user_input_of_verify_email_hook } from "@/api-calls/auth/email/verify-email"
import { type_of_user_info } from '@/store/auth-store'
import { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"

// hook
import { useState } from 'react'
import { useMount } from 'react-use'


// api hook
import { useSendEmailVerificationMail } from '@/api-calls/auth/email/send-email-verification-mail'
import { useVerifyEmail } from "@/api-calls/auth/email/verify-email"


// form management hook
import useFormManagement from "@/utils/global-hooks/use-form-management"


// store
import { auth_store } from '@/store/auth-store'


// date-fns
import { format, fromUnixTime } from 'date-fns';


// css in js
import { styled } from "@mui/material/styles";


// styled-components
import AUTH_PAGE_CONTAINER___STYLED from '@/components/styled/just-for-this-project/auth-page-container'


// components
import { Box, Button, Typography, Stack } from '@mui/material'
import MUI_INPUT___COMPONENT from '@/components/reusable/for-any-project/form/mui-input'



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function VERIFY_EMAIL___COMPONENT() {

    // 🍪 get the state properties 
    const { user_info } = auth_store(state => ({
        user_info: state?.user_info
    }))


    // 🍪 state to track whether the email is sent and url has not expired
    const [email_is_sent_and_otp_has_not_expired, set_email_is_sent_and_otp_has_not_expired] = useState(false)


    // 🍪 on  the initial load or page refresh, checking whether the email is sent and url has not expired
    useMount(() => {
        if (!user_info.email_verification_otp_expiration_unix_timestamp) return

        if (user_info.email_verification_otp_expiration_unix_timestamp && user_info.email_verification_otp_expiration_unix_timestamp > Date.now()) {
            set_email_is_sent_and_otp_has_not_expired(true)
        }
    })


    // 🍪 useSendEmailVerificationMail
    const {
        mutate: mutate_send_email_verification_mail,
        status: status_send_email_verification_mail
    } = useSendEmailVerificationMail()


    // 🍪 useVerifyEmail
    const {
        mutate: mutate_verify_email,
        status: status_verify_email,
        error: error_verify_email
    } = useVerifyEmail()


    // 🍪 function to send email
    const send_email = () => {
        mutate_send_email_verification_mail()
    }





    // ✅ TSX
    return (

        <AUTH_PAGE_CONTAINER___STYLED paddingTop='6rem'>

            {(() => {

                if (email_is_sent_and_otp_has_not_expired || status_send_email_verification_mail === 'success') {

                    return (
                        <Stack spacing='4rem' alignItems='center'>

                            <EMAIL_IS_ALREADY_SENT___CHILD user_info={user_info} />

                            <FILL_FORM_AND_VERIFY_EMAIL
                                mutate={mutate_verify_email}
                                status={status_verify_email}
                                error={error_verify_email}
                                user_info={user_info}
                            />
                        </Stack>
                    )

                }


                else {

                    return (

                        <SEND_EMAIL___CHILD
                            user_info={user_info}
                            status={status_send_email_verification_mail} send_email={send_email}
                        />

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
function SEND_EMAIL___CHILD({ user_info, status, send_email }) {


    return (

        <Box>


            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                Verify Your Email Address
            </Typography>


            <Typography variant="body1" sx={{ marginBottom: '2rem', textAlign: 'justify', textAlignLast: 'center' }}>

                Your email address

                <Box component='span' sx={{ color: 'primary.main' }}> {user_info.email} </Box>

                is not verified. To activate your account, you must verify your email. Click the following button so that we can send you a verification email.

            </Typography>


            <Button onClick={send_email}
                variant="contained"
                color="primary"
                disabled={status === 'loading' || status === 'success'}>

                Send Verification Email
            </Button>


        </Box>

    )


}


// 🍪   
function EMAIL_IS_ALREADY_SENT___CHILD({ user_info }: { user_info: type_of_user_info }) {


    let date_and_time = fromUnixTime(user_info.email_verification_otp_expiration_unix_timestamp / 1000)

    let format_string = "'at' hh:mm a 'on' MMMM d, yyyy";

    let formatted_data_and_time = format(date_and_time, format_string);



    // ✅ TSX
    return (

        <Box sx={{ backgroundColor: 'background.variation_1', padding: '1rem' }}>


            <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                Verification Email is Sent
            </Typography>


            <Typography variant="body1" sx={{ marginBottom: '2rem', textAlign: 'justify', textAlignLast: 'center' }}>

                Verification email has been sent to

                <Box component='span' sx={{ color: 'primary.main' }}> {user_info.email}. </Box>

                If you don't see any email on your inbox, please check the spam folder as well.
            </Typography>


            <Typography variant='body1'>

                An OTP has been sent to your email. Please copy it and enter it into the form below. The OTP will expire

                <Box component='span' sx={{ color: 'primary.main' }}> {formatted_data_and_time} </Box>


            </Typography>




        </Box>
    )
}


// 🍪
function FILL_FORM_AND_VERIFY_EMAIL({ mutate, status, error, user_info }) {


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

        // 🥔 stop refreshing the page on reload 🥔
        event.preventDefault();


        /* 🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔 */
        if (validation_before_form_submission_func() === true) return



        // 🥔 API request  🥔
        const user_input: type_of_user_input_of_verify_email_hook = {
            user_email: user_info.email,
            email_verification_otp: formState.form_data.otp.value
        }

        mutate(user_input)


        /* 🥔 form is submitted successfully  🥔*/
        // actions.reset_form()

    }



    return (

        <Box sx={{ backgroundColor: 'background.variation_1', padding: '1rem' }}>


            <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
                Verify Email
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


                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'loading' || status === 'success'}
                    variant="contained"
                    sx={{ marginTop: '1rem' }}
                >
                    Verify Email
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





