'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// hook
import { useEffect } from "react"
import { useDeleteNotes } from "@/api-calls/note/delete-notes-hook"
import useRouterProgrammaticNavigation from "@/utils/route/router-programmatic-navigation"

// Mui Components
import { Box, Typography, Button, CircularProgress } from '@mui/material'

// Reusable Components
import MODAL___REUSABLE from "../for-any-project/modal/modal"
import MODAL_CLOSE_BUTTON___REUSABLE from "../for-any-project/modal/modal-close-button"



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function NOTE_DELETE_CONFIRMATION_MODAL___REUSABLE({
    modal_is_open,
    handle_modal_close,
    note_id
}) {


    // useDeleteNotes
    const { mutate, isLoading: isDeleting, isSuccess: isDeletedSuccessfully } = useDeleteNotes()


    // handle note deletion
    const handle_note_deletion = () => {

        const user_input = {
            note_ids: [note_id]
        }

        mutate(user_input)
    }


    // navigate programmatically
    const navigate_programmatically = useRouterProgrammaticNavigation()

    useEffect(() => {

        if (!isDeletedSuccessfully) return

        navigate_programmatically({ path: config_obj.page_path.all_notes })

    }, [isDeletedSuccessfully])



    return (
        <>
            <MODAL___REUSABLE

                modal_is_open={modal_is_open}

                modal_navbar_jsx={

                    <Typography variant='body1' sx={{ fontWeight: 600, textAlign: 'center' }}>
                        Delete Confirmation
                    </Typography>
                }

                modal_content_jsx={

                    <Box sx={{ padding: '2rem' }}>

                        <Typography>

                            Are you sure you want to delete the note?

                        </Typography>

                    </Box>

                }

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_footer_jsx={

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                        <MODAL_CLOSE_BUTTON___REUSABLE
                            handle_modal_close={handle_modal_close}
                            button_text="Cancel"
                        />

                        <Button
                            onClick={handle_note_deletion}
                            disabled={isDeleting}
                            variant="outlined"
                            size='small'
                            color='error'
                        >
                            {!isDeleting && 'Delete'}

                            {isDeleting && <CircularProgress size='1.5rem' />}
                        </Button>

                    </Box>

                }


            />

        </>
    )
}