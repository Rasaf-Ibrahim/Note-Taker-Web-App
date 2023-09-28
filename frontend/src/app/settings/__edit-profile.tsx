/*__________________________________________

 ✅ import 
____________________________________________*/

'use client'

// types
import { type_of_anything } from "@/types/commonly-used-types"

// hook
import useFormManagement from "@/utils/global-hooks/use-form-management.ts"
import { useUpdateUserInfo, type_of_user_input_of_update_user_info_hook } from "@/api-calls/user-info/update-user-info"
import { useUpdateEffect } from "react-use";
import { useLogStateInDevEnv } from "@/utils/log/log-state-in-dev-env-hook";


// css in js
import { styled } from '@mui/material/styles';
import css_media_queries from '@/styles/css-utils/media-queries';

// types
import { type_of_form_configuration } from "@/utils/global-hooks/use-form-management.ts"

// store 
import { auth_store } from "@/store/auth-store"

// mui components
import { Box, Button, InputLabel, Typography } from "@mui/material";

// reusable components
import MUI_INPUT___COMPONENT from "@/components/reusable/for-any-project/form/mui-input"
import MUI_IMAGE___COMPONENT from '@/components/reusable/for-any-project/form/mui-image'




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function EDIT_PROFILE___COMPONENT() {


    // 🍪 get the state properties 
    const { user_info } = auth_store(state => ({
        user_info: state?.user_info
    }))


    // 🍪 hook related to API request 🍪
    const { mutate, isSuccess, isLoading } = useUpdateUserInfo()




    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {


        /* 🥔  full_name  🥔 */
        full_name: {

            component_type: 'input',

            value: user_info.full_name,

            is_required: false,

            validation: {

                is_validating: true,

                match_pattern: /^[A-Za-z\s.-]{3,60}$/,

                error_message: "Must be between 3 and 60 characters and can only contain alphabets, space, dot, and hyphen"
            }

        },


        /* 🥔  username  🥔 */
        username: {

            component_type: 'input',

            value: user_info.username,

            is_required: false,

            validation: {

                is_validating: true,

                match_pattern: /^[a-zA-Z0-9_]{3,20}$/,

                error_message: "Must contain only letters, numbers, and underscores, and be between 3 and 20 characters long."
            }

        },


        /* 🥔  picture_link  🥔 */
        picture_link: {

            component_type: 'image',

            value: '',

            additionally_tracking: {
                preview_link: ''
            },

            is_required: false,

            validation: {

                is_validating: true,

                'accepted_file_formats': ['png', 'jpg', 'jpeg'],

                'accepted_maximum_file_size': 512,  //kb

                error_message: function () {

                    return (

                        `Image must have one of these extensions: ${JSON.stringify(this.accepted_file_formats)}. 
                            
                        Image size must be lower than ${this.accepted_maximum_file_size}kb.`
                    )
                }

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




    useLogStateInDevEnv({ state_name: 'formState', state: formState })




    // 🍪 form state management (3/3 Steps) - handleSubmit 🍪
    const handleSubmit = (event) => {

        // 🥔 stop refreshing the page on reload 🥔
        event.preventDefault();

        /* 🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔 */
        if (validation_before_form_submission_func() === true) return


        // 🥔 API request  🥔
        const user_input: type_of_user_input_of_update_user_info_hook = {}

        if (formState.form_data.full_name.value !== user_info.full_name) {
            user_input.full_name = formState.form_data.full_name.value
        }

        if (formState.form_data.username.value !== user_info.username) {
            user_input.username = formState.form_data.username.value
        }


        if (formState.form_data.picture_link.value instanceof File) {
            user_input.profile_picture = formState.form_data.picture_link.value
        }


        mutate(user_input)
    }


    useUpdateEffect(() => {

        // only reset the form if the user input is successfully submit
        if (isSuccess) {

            actions.reset_form()
        }

    }, [isSuccess])










    // ✅ JSX

    return (

        <WRAPPER_OF_FORM___STYLED>

            <WRAPPER_OF_FORM_CONTENT___STYLED onSubmit={handleSubmit}>

                <Typography variant='h6' textAlign='center'>Update Profile Info</Typography>

                {/* 🥔 Full Name 🥔 */}
                <MUI_INPUT___COMPONENT

                    label='Full Name'

                    input_name='full_name'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    multiline={false}
                    variant_value='standard' //standard, filled, outlined

                />



                {/* 🥔  Username 🥔 */}
                <MUI_INPUT___COMPONENT

                    label='Username'

                    input_name='username'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}


                    // optional
                    multiline={false}
                    variant_value='standard' //standard, filled, outlined

                />




                {/* 🥔 Profile Picture 🥔 */}
                <Box sx={{ marginTop: '1.5rem' }}>

                    <MUI_IMAGE___COMPONENT

                        label={user_info.picture_link ? 'Change Profile Picture' : 'Upload Profile Picture'}

                        input_name='picture_link'

                        state={formState}

                        actions={actions}

                        validation_info={validation_info}

                    />

                </Box>


                <Button
                    type="submit"
                    disabled={isLoading}
                    variant='contained'>
                    Submit
                </Button>


            </WRAPPER_OF_FORM_CONTENT___STYLED>


        </WRAPPER_OF_FORM___STYLED>

    )

}






/*__________________________________________

 ✅ Styled Components for 
 <PROFILE___COMPONENT/>
____________________________________________*/

/* 🥔 */
const WRAPPER_OF_FORM___STYLED = styled((props: type_of_anything) =>

    <Box  {...props} />

)
    (({ theme }) => `
        margin-top:2rem; 
        margin-bottom: 2rem;

        display:flex;
        flex-direction:column;
        align-items: center;
    `)



/* 🥔 */
const WRAPPER_OF_FORM_CONTENT___STYLED = styled((props: type_of_anything) =>

    <Box  {...props} component='form' />
)
    (({ theme }) => `

        ${css_media_queries.name_xs_sm_md_lg('width', '18rem', '28rem', '38rem', '48rem')};

        ${/*when the width is increasing 2, we need to increase the padding the padding 1 because padding has right and left. */ ''}
        ${css_media_queries.name_xs_sm_md_lg('padding-right', '1rem', '2rem', '3rem', '4rem')};
        ${css_media_queries.name_xs_sm_md_lg('padding-left', '1rem', '2rem', '3rem', '4rem')};
        padding-top:1rem;
        padding-bottom:1rem;

        background-color: ${theme.palette.background.variation_1};


        ${/* Button's size is getting changed while toggling the email form if we use display:'grid' instead of display:'flex' & flex-direction:'column' */ ''}
        display: flex;
        flex-direction: column;
        justify-content: center; 
        gap: 1.6rem; 
    `)


