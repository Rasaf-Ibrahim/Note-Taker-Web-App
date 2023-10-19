'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from '@/config'

// types
import { Theme } from '@mui/material'

// hook
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

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


// styled components
import CONTAINER___STYLED from '@/components/styled/for-any-project/container'


// mui component
import { Box, Button, Typography, FormLabel, CircularProgress } from "@mui/material"


// reusable components
import LOADING_SPINNER___REUSABLE from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___REUSABLE from "@/components/reusable/for-any-project/error-text/error-text"
import MODAL___REUSABLE from '@/components/reusable/for-any-project/modal/modal'
import NOTE_TITLE___REUSABLE from '@/components/reusable/just-for-this-project/note-title'





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

 ✅ Child Component of
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
    const { mutate, isLoading: is_loading_while_submitting_the_note } = useUpdateNote()


    // note title state
    const [note_title_state, update_note_title_state] = useImmer({
        value: note_data.title,
        validation_error: false
    })



    // handleSubmit
    const handleSubmit = async (event) => {

        // stop refreshing the page on reload 
        event.preventDefault()

        // can't submit if note title input field is containing error,
        if (note_title_state.validation_error) return

        // execute image operations 
        executeImageOperations()
    }




    /* After output gets updated with image link */
    useEffect(() => {


        if (imageOperationsData.outputUpdatedWithImageLink === '') return


        // API request  
        const user_input: type_of_user_input_of_update_note_hook = {

            note_id: note_data._id,

            note_data: {
                "title": note_title_state.value,
                "description": output,
                "public_id_of_cloudinary_images": imageOperationsData.idsOfTheImages
            }

        }

        mutate(user_input)


    }, [imageOperationsData.outputUpdatedWithImageLink])




    // ✅ TSX
    return (

        <CONTAINER___STYLED

            elevation={{ light: { value: 1 }, dark: { value: 0 } }}

            background_color={{ light: 0, dark: 1 }}

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


            {/* note title */}
            <NOTE_TITLE___REUSABLE
                note_title_state={note_title_state}
                update_note_title_state={update_note_title_state}
            />


            {/* note description */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <FormLabel>
                    Note Description
                </FormLabel>

                <RichTextEditor

                    initialValue={note_data.description}

                    customizeUI={{
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.variation_1 : theme.palette.background.default,
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


            {/* Showing non closeable modal when async operation is going on */}
            <ASYNC_OPERATION_INDICATOR___CHILD
                imageOperationsData={imageOperationsData} is_loading_while_submitting_the_note={is_loading_while_submitting_the_note}
            />


        </CONTAINER___STYLED>

    )
}



/*__________________________________________

 ✅ Child Component of <UPDATE_NOTE___CHILD/>
____________________________________________*/

function ASYNC_OPERATION_INDICATOR___CHILD({ imageOperationsData, is_loading_while_submitting_the_note }) {

    return (

        <MODAL___REUSABLE
            modal_is_open={
                // image operation is going on
                (imageOperationsData.isProcessing && (imageOperationsData.totalUploading > 0 || imageOperationsData.totalDeleting > 0))

                ||

                // or output is getting updated with the imageLink
                imageOperationsData.updatingTheOutputWithImageLink

                ||

                // or submitting the form
                is_loading_while_submitting_the_note
            }

            modal_navbar_jsx={
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Note Submission
                </Typography>
            }

            modal_content_jsx={
                <Box sx={{

                    padding: '2rem',

                    width: { xs: '17rem', sm: '20rem', md: '25rem' },

                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}>

                    <CircularProgress size={20} />


                    <Typography variant='body1'>

                        {imageOperationsData.isProcessing &&

                            <>
                                Uploading {imageOperationsData.totalUploading} {imageOperationsData.totalUploading < 2 ? 'image' : 'images'}

                                <span style={{ marginLeft: '0.35rem' }}>
                                    and Deleting  {imageOperationsData.totalDeleting} {imageOperationsData.totalDeleting < 2 ? 'image' : 'images'}
                                </span>

                            </>

                        }

                        {imageOperationsData.updatingTheOutputWithImageLink && "Updating the rich text editor's generated output"}

                        {is_loading_while_submitting_the_note && "Submitting the note"}

                    </Typography>

                </Box>
            }

            user_can_close_the_modal={false}
        />
    )
}

