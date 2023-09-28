'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from '@/config'

// hook
import { useEffect } from 'react'
import { useLogStateInDevEnv } from '@/utils/log/log-state-in-dev-env-hook'

// api hook
import { useCreateNote } from '@/api-calls/note/create-note-hook'

// next/dynamic
import dynamic from 'next/dynamic'

// RichTextEditor package
const RichTextEditor = dynamic(
    () => import('rich-text-editor-for-react'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
)

// import useRichTextEditor from 'rich-text-editor-for-react/hook'
import useRichTextEditor from 'rich-text-editor-for-react/hook'

// form management hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"

// theme
import { FormLabel, Stack, Theme, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';

// mui component
import { Box, Button, CircularProgress, Paper } from "@mui/material"

// styled components
import CONTAINER___STYLED from '@/components/styled/for-any-project/container'

// reusable components
import NOTE_NAVIGATION_TABS___REUSABLE from '@/components/reusable/just-for-this-project/note-navigation-tabs'
import MUI_INPUT___COMPONENT from '@/components/reusable/for-any-project/form/mui-input'
import MODAL___REUSABLE from '@/components/reusable/for-any-project/modal/modal'



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function CREATE_NOTE___COMPONENT() {


    // 🍪 useRichTextEditor hook
    const {
        output,
        fetchOutput,

        editorStatus,
        fetchEditorStatus,

        utils,
        fetchUtils,

        enableImageOperations,
        executeImageOperations,

        imageOperationsData,
        fetchImageOperationsData

    } = useRichTextEditor()




    // 🍪 theme
    const theme: Theme = useTheme()


    // 🍪 useCreateNote
    const { mutate, isLoading: isSubmittingNote } = useCreateNote()


    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {

        /* 🥔 title  🥔 */
        title: {

            component_type: 'input',

            value: '',

            is_required: true,

            validation: {
                is_validating: true,
                match_pattern: /^[^]{1,60}$/,
                error_message: "Title can't be longer than 60 characters."
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


    // 🍪 handleSubmit
    const handleSubmit = async (event) => {


        // 🥔 stop refreshing the page on reload 🥔
        event.preventDefault()

        /* 🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form 🥔 */
        if (validation_before_form_submission_func() === true) return

        // 🥔 execute image operations 🥔
        executeImageOperations()
    }


    /* 🍪 after output gets updated with image link */
    useEffect(() => {

        if (imageOperationsData.outputUpdatedWithImageLink === '') return

        // 🥔 API request  🥔
        const user_input = {
            "title": formState.form_data.title.value,
            "description": output,
            "public_id_of_cloudinary_images": imageOperationsData.idsOfTheImages
        }

        mutate(user_input)


        // 🥔 reset form  🥔
        actions.reset_form()
        utils.resetEditor()


    }, [imageOperationsData.outputUpdatedWithImageLink])



    // ✅ TSX
    return (

        <>
            <NOTE_NAVIGATION_TABS___REUSABLE />


            <CONTAINER___STYLED elevation={{ light: { value: 0 }, dark: { value: 0 } }}

                background_color={{ light: 1, dark: 1 }}

                sx={{
                    /* Layout */
                    margin: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },

                    borderRadius: 2,

                    /* Child Layout */
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',

                }}>


                {/*  note title  */}
                <MUI_INPUT___COMPONENT

                    label='Note Title'

                    input_name='title'

                    state={formState}

                    actions={actions}

                    validation_info={validation_info}

                    // optional
                    multiline={false}
                    variant_value='outlined' //standard, filled, outlined

                />


                {/* note description */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <FormLabel>
                        Note Description
                    </FormLabel>

                    <RichTextEditor

                        customizeUI={{
                            backgroundColor: theme.palette.background.variation_1,
                            primaryColor: theme.palette.primary.main,
                            stickyToolbarOnScroll: true,
                            defaultVisibleToolbarOptions: {
                                laptop: 10
                            }
                        }}

                        imageValidation={{
                            maximumFileSize: 1024,
                            acceptableFileFormats: ['png', 'jpg', 'jpeg']
                        }}

                        cloudImageApiEndpoint = {config_obj.env.rte_image_management_api_endpoint}

                        fetchOutput={fetchOutput}

                        fetchUtils={fetchUtils}

                        fetchEditorStatus={fetchEditorStatus}

                        enableImageOperations={enableImageOperations}

                        fetchImageOperationsData={fetchImageOperationsData}


                        toolbarOptions={['word_count', 'clear_format', 'undo', 'redo', 'font', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'decrease_indent', 'increase_indent', 'direction', 'blockquote', 'code_block', 'link', 'image_cloud', 'format_media', 'embed_video', 'sub_script', 'super_script']}

                    />

                </Box>



                {/* button */}
                <Button
                    variant='contained'
                    color='secondary'
                    size='medium'
                    onClick={(event) => handleSubmit(event)}
                    sx={{ display: 'block', alignSelf: 'center', width: '12rem' }}
                >
                    Submit
                </Button>



                {/* Showing non closeable modal when image operation is going on */}
                <MODAL___REUSABLE
                    modal_is_open={
                        // image operation is going on
                        (imageOperationsData.isProcessing && imageOperationsData.totalUploading > 0)

                        ||

                        // or output is getting updated with the imageLink
                        imageOperationsData.updatingTheOutputWithImageLink
                    }

                    modal_navbar_jsx={
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>

                            Image Operations

                        </Typography>
                    }

                    modal_content_jsx={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '2rem' }}>

                            <CircularProgress size={20} />

                            <Typography variant='body1'>

                                {imageOperationsData.isProcessing ?

                                    <>

                                        Uploading {imageOperationsData.totalUploading} {imageOperationsData.totalUploading < 2 ? 'image' : 'images'}

                                    </>

                                    :

                                    "Updating the rich text editor's generated output"

                                }

                            </Typography>

                        </Box>
                    }

                    user_can_close_the_modal={false}
                />


            </CONTAINER___STYLED>

        </>

    )
}

