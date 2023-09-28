'use client'

/*__________________________________________

 ✅ import
____________________________________________*/
// config
import config_obj from "@/config";

// types
import { type_of_anything } from "@/types/commonly-used-types"

// api hook
import { useChangePassword } from "@/api-calls/auth/email/change-password";

// form management hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"


// css in js
import { styled } from "@mui/material/styles";
import AUTH_PAGE_CONTAINER___STYLED from "@/components/styled/just-for-this-project/auth-page-container";



// components
import { Box, Button, Container, Typography } from '@mui/material';
import MUI_PASSWORD___COMPONENT from "@/components/reusable/for-any-project/form/mui-password"
import { useUpdateEffect } from "react-use";
import CONTAINER___STYLED from "@/components/styled/for-any-project/container";


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function CHANGE_PASSWORD___COMPONENT() {


    // 🍪 hook related to API request 🍪
    const { mutate, status, error } = useChangePassword()



    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {

        /* 🥔 current_password  🥔 */
        current_password: {

            component_type: 'password',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,

                error_message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
            }

        },


        /* 🥔 new_password  🥔 */
        new_password: {

            component_type: 'password',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,

                error_message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
            }

        },


        /* 🥔 new_password_confirm  🥔 */
        new_password_confirm: {

            component_type: 'password',

            value: '',

            is_required: true,

            validation: {

                is_validating: true,

                match_this_field: 'new_password',

                error_message: "This must match with the new password."
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
        const user_input = {
            current_password: formState.form_data.current_password.value,
            new_password: formState.form_data.new_password.value,

        }

        mutate(user_input)


        /* 🥔 form is submitted successfully  🥔*/


    }



    // 🍪 reset the form if the form is password has changed successfully
    useUpdateEffect(() => {

        if (status === 'success') {
            actions.reset_form()
        }

    }, [status])




    // ✅ TSX
    return (

        <AUTH_PAGE_CONTAINER___STYLED paddingTop='0rem'>


            <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
                Change Password
            </Typography>


            <WRAPPER_OF_FORM___STYLED>


                {/* 🥔 Current Password 🥔 */}
                <MUI_PASSWORD___COMPONENT

                    label='Current Password'

                    input_name='current_password'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    variant_value='filled'  //standard, filled, outlined
                />

                {/* 🥔 New Password 🥔 */}
                <MUI_PASSWORD___COMPONENT

                    label='New Password'

                    input_name='new_password'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    variant_value='filled'  //standard, filled, outlined
                />



                {/* 🥔 New Password Confirm🥔 */}
                <MUI_PASSWORD___COMPONENT

                    label='Confirm New Password'

                    input_name='new_password_confirm'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    variant_value='filled'  //standard, filled, outlined

                />



                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    variant="contained"
                    sx={{ marginTop: '1rem' }}
                >
                    Submit
                </Button>


                {status === 'error' &&

                    /* server error message */
                    <Box sx={{ marginTop: '1rem', display: 'grid', gap: '1.5rem' }}>

                        <Typography variant='body1' color='error.main'>

                            {(() => {

                                return (error as any).response.data.message


                            })()}

                        </Typography>



                    </Box>
                }


            </WRAPPER_OF_FORM___STYLED>

        </AUTH_PAGE_CONTAINER___STYLED>

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
    align-items: center;
    text-align:center; 
    gap:1rem;

`)


