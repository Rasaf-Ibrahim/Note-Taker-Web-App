'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// form management hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"

// api hook
import { useFetchNote } from '@/api-calls/note/fetch-a-note'
import { useUpdateNote, type_of_user_input_of_update_note_hook } from '@/api-calls/note/update-note-hook'

// theme hook
import { useTheme } from '@mui/material/styles';

// router hook
import useRouterQueryStringParams from "@/utils/route/router-query-string-parameters"

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


import useRichTextEditor from 'rich-text-editor-for-react/hook'



// types
import { Theme } from '@mui/material'


// styled components
import CONTAINER___STYLED from '@/components/styled/for-any-project/container'


// mui component
import { Box, Button, Typography, FormLabel, CircularProgress } from "@mui/material"


// reusable components
import MUI_INPUT___COMPONENT from '@/components/reusable/for-any-project/form/mui-input'
import LOADING_SPINNER___REUSABLE from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___REUSABLE from "@/components/reusable/for-any-project/error-text/error-text"
import MODAL___REUSABLE from '@/components/reusable/for-any-project/modal/modal'
import { useEffect } from 'react'





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function EDIT_NOTE___COMPONENT() {

    // 🍪 extract the token 
    const { id } = useRouterQueryStringParams()


    //  🍪 useFetchNote hook
    const { data, isFetching, isSuccess, isError, error } = useFetchNote(id)



    // ✅ TSX
    return (
        <>

            {

                (() => {

                    if (isFetching) {
                        return (

                            <LOADING_SPINNER___REUSABLE full_screen={false} margin="10rem" />
                        )
                    }


                    else if (isError) {

                        return (

                            <Box sx={{ marginTop: '5rem' }}>

                                <ERROR_TEXT___REUSABLE error_text={(error as any).response.data.message} />

                            </Box>
                        )
                    }


                    else if (isSuccess) {

                        return (

                            <UPDATE_NOTE___CHILD note_data={data.fetched_document} />

                        )
                    }

                })()

            }

        </>
    )
}







/*__________________________________________

 ✅ Child Components of
<EDIT_NOTE___COMPONENT/>
____________________________________________*/

function UPDATE_NOTE___CHILD({ note_data }) {


    // useRichTextEditor hook
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




    // theme
    const theme: Theme = useTheme()



    // useUpdateNote
    const { mutate, isLoading: is_loading_while_submitting_note } = useUpdateNote()




    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {

        /* 🥔 title  🥔 */
        title: {

            component_type: 'input',

            value: note_data.title,

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
        const user_input: type_of_user_input_of_update_note_hook = {

            note_id: note_data._id,

            note_data: {
                "title": formState.form_data.title.value,
                "description": output,
                "public_id_of_cloudinary_images": imageOperationsData.idsOfTheImages
            }

        }

        mutate(user_input)


    }, [imageOperationsData.outputUpdatedWithImageLink])




    // ✅ TSX
    return (

        <CONTAINER___STYLED

            elevation={{ light: { value: 0 }, dark: { value: 0 } }}

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

                    initialValue={note_data.description}

                    customizeUI={{
                        backgroundColor: theme.palette.background.variation_1,
                        primaryColor: theme.palette.primary.main,
                        stickyToolbarOnScroll: true
                    }}

                    cloudImageApiEndpoint={config_obj.env.rte_image_management_api_endpoint}

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
                    (imageOperationsData.isProcessing && (imageOperationsData.totalUploading > 0 || imageOperationsData.totalDeleting > 0))

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

                                    <span style={{ marginLeft: '0.35rem' }}>
                                        and Deleting  {imageOperationsData.totalDeleting} {imageOperationsData.totalDeleting < 2 ? 'image' : 'images'}
                                    </span>

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

    )
}




