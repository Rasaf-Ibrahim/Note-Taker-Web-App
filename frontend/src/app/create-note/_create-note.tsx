'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { Theme } from '@mui/material'

// config
import config_obj from "@/config"

// hook
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

// api hook
import { useCreateNote } from '@/api-calls/note/create-note-hook'

// theme hook
import { useTheme } from '@mui/material/styles';


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


// mui component
import { Box, Button, CircularProgress, FormLabel, Typography} from "@mui/material"

// styled components
import CONTAINER___STYLED from '@/components/styled/for-any-project/container'

// reusable components
import NOTE_NAVIGATION_TABS___REUSABLE from '@/components/reusable/just-for-this-project/note-navigation-tabs'
import MODAL___REUSABLE from '@/components/reusable/for-any-project/modal/modal'
import NOTE_TITLE___REUSABLE from '@/components/reusable/just-for-this-project/note-title'


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function CREATE_NOTE___COMPONENT() {


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


    // useCreateNote
    const { mutate, isLoading: is_loading_while_submitting_the_note } = useCreateNote()


    // note title state
    const [note_title_state, update_note_title_state] = useImmer({
        value: '',
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


    /* 🍪 after output gets updated with image link */
    useEffect(() => {

        if (imageOperationsData.outputUpdatedWithImageLink === '') return

        // API request  
        const user_input = {
            "title": note_title_state.value,
            "description": output,
            "public_id_of_cloudinary_images": imageOperationsData.idsOfTheImages
        }

        mutate(user_input)


        // reset form
        update_note_title_state((draft) => {
            draft.value = ''
        })
        utils.resetEditor()


    }, [imageOperationsData.outputUpdatedWithImageLink])



    // ✅ TSX
    return (

        <>
            <NOTE_NAVIGATION_TABS___REUSABLE />


            <CONTAINER___STYLED elevation={{ light: { value: 1 }, dark: { value: 0 } }}

                background_color={{ light: 0, dark: 1 }}

                sx={{
                    /* Layout */
                    marginX: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    marginBottom: { xs: '1rem', sm: '1.5rem', md: '2rem' },
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

                        customizeUI={{
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.variation_1 : theme.palette.background.default,
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

                        cloudImageApiEndpoint={config_obj.env.rte_image_management_api_endpoint}

                        fetchOutput={fetchOutput}

                        fetchUtils={fetchUtils}

                        fetchEditorStatus={fetchEditorStatus}

                        enableImageOperations={enableImageOperations}

                        fetchImageOperationsData={fetchImageOperationsData}


                        toolbarOptions={['word_count', 'clear_format', 'undo', 'redo', 'font', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'decrease_indent', 'increase_indent', 'direction', 'blockquote', 'code_block', 'link', 'image_cloud', 'format_media', 'embed_video', 'sub_script', 'super_script']}

                    />

                </Box>



                {/* submit button */}
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

        </>

    )
}



/*__________________________________________

 ✅ Child Component of <CREATE_NOTE___COMPONENT/>
____________________________________________*/

function ASYNC_OPERATION_INDICATOR___CHILD({ imageOperationsData, is_loading_while_submitting_the_note }) {

    return (

        <MODAL___REUSABLE
            modal_is_open={
                // image operation is going on
                (imageOperationsData.isProcessing && imageOperationsData.totalUploading > 0)

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
