'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// hook
import { useState, useEffect } from "react"
import { useFetchUserBookmarkedNotes } from "@/api-calls/note/fetch-all-bookmarked-notes-of-a-user-hook"
import { useAddOrRemoveNoteBookmark } from "@/api-calls/note/add-to-bookmark-or-remove-from-bookmark-hook"


// router
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation"


// icons
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded'

// styled components
import WRAPPER_OF_NOTES___STYLED from "@/components/styled/just-for-this-project/wrapper-of-notes"
import WRAPPER_OF_NOTE_CARD___STYLED from "@/components/styled/just-for-this-project/wrapper-of-note-card"


// component
import { Box, Typography, Button, Stack, Pagination, IconButton, Tooltip, CircularProgress} from "@mui/material"

import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___COMPONENT from "@/components/reusable/for-any-project/error-text/error-text"

import NOTE_NAVIGATION_TABS___REUSABLE from "@/components/reusable/just-for-this-project/note-navigation-tabs"
import NO_TEXT_ICON_BUTTON___STYLED from "@/components/styled/just-for-this-project/no-text-icon-button"



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function BOOKMARKED_NOTES___COMPONENT() {

    // page state
    const [page_state, set_page_state] = useState(1)

    // useFetchUserBookmarks
    const {
        refetch,
        fetchStatus,
        isFetching,
        isSuccess,
        isError,
        error,
        data
    } = useFetchUserBookmarkedNotes(page_state)


    // Fetch on mount and refetch when page state changes
    useEffect(() => {

        refetch()

    }, [page_state])


    useEffect(() => {

        if (isError) {

            let error_message = (error as any).response.data.message

            let total_pages = error_message.match(/Total pages available: \d+/)?.[0].split(":")[1]?.trim();

            if (total_pages) {
                set_page_state(total_pages)
            }
        }

    }, [fetchStatus])




    // TSX
    return (

        <>
            
            <NOTE_NAVIGATION_TABS___REUSABLE/>


            {(() => {

                if (isFetching) {
                    return (

                        <LOADING_SPINNER___COMPONENT full_screen={false} margin="10rem" />
                    )
                }


                else if (isError && !(error as any).response.data.message.toLowerCase().includes('total pages')
                ) {

                    return (

                        <Box sx={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                            <ERROR_TEXT___COMPONENT error_text="Something is wrong"
                            />

                            <Button
                                variant="outlined"
                                onClick={() => refetch()}>
                                Retry
                            </Button>

                        </Box>
                    )
                }


                else if (isSuccess) {

                    return (

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

                            <NOTES___CHILD 
                                all_notes_data={data.fetched_documents}
                                refetch_the_bookmarked_notes={refetch}
                            />

                            {data.fetched_documents.length > 0 &&
                                <PAGINATION___CHILD
                                    pagination_info={data.info}
                                    page_state={page_state}
                                    set_page_state={set_page_state}
                                />
                            }

                        </Box>

                    )
                }

            })()}
            
        </>
    )
}



/*__________________________________________

 ✅ Child Component of 
 <BOOKMARKED_NOTES___COMPONENT/>
____________________________________________*/

function NOTES___CHILD({ all_notes_data, refetch_the_bookmarked_notes }) {

    return (


            <Stack justifyContent='center' spacing='2rem'>

                {all_notes_data.length === 0 ?

                    <NO_NOTES_AVAILABLE___CHILD />

                    :

                    <WRAPPER_OF_NOTES___STYLED>

                        {all_notes_data.map((note_data) => {

                            return (
                                <NOTE_CARD___CHILD
                                    key={note_data._id}
                                    note_data={note_data}
                                    refetch_the_bookmarked_notes={refetch_the_bookmarked_notes}
                                />
                            )
            
                        })}

                    </WRAPPER_OF_NOTES___STYLED>
                }

            </Stack>

    )
}


/*__________________________________________

 ✅ Child Component of 
 <BOOKMARKED_NOTES___COMPONENT/>
____________________________________________*/

function PAGINATION___CHILD({ page_state, set_page_state, pagination_info }) {


    const handleChange = (event, value) => {
        set_page_state(value)
    }


    // Pagination Info
    const total_pages = pagination_info.total_pages
    const total_notes = pagination_info.total_documents
    const showing_range_start = pagination_info.current_documents_range.start
    const showing_range_end = pagination_info.current_documents_range.end
    


    return (

        <Stack spacing='1rem' alignItems='center'sx={{textAlign:'center'}}>

            <Pagination
                onChange={handleChange}
                count={total_pages}
                page={Number(page_state)}
                variant="outlined"
            />

            <Typography variant='subtitle2' color='primary'>
                Showing { 
                    showing_range_start === showing_range_end ? 
                    `${showing_range_start}` : 
                    `${showing_range_start}–${showing_range_end}`
                } of {total_notes}
            </Typography>

        </Stack>

    )

}



/*__________________________________________

 ✅ Child component of 
 <NOTES___CHILD/>
____________________________________________*/

function NO_NOTES_AVAILABLE___CHILD() {

    return (
        <WRAPPER_OF_NOTES___STYLED>

            <Typography
                variant='body1'
                textAlign='center'
                sx={{ fontWeight: 600 }}>
                No Bookmarks Available
            </Typography>

        </WRAPPER_OF_NOTES___STYLED>
    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTES___CHILD/>
____________________________________________*/

function NOTE_CARD___CHILD({ note_data, refetch_the_bookmarked_notes }) {

    return (

        <WRAPPER_OF_NOTE_CARD___STYLED>

            {/* Note Title */}
            <Typography
                variant='body1'
                sx={{ fontWeight: 500 }}>

                {note_data.title}
            </Typography>


            {/* Buttons */}
            <Stack direction='row' spacing='1rem'>

                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.read_note(note_data._id)}>

                    <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Read'>
                        <VisibilityIcon sx={{fontSize:'1.5rem'}}/>
                    </NO_TEXT_ICON_BUTTON___STYLED>
    
                </ROUTER_NAVIGATION___COMPONENT>


                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.edit_note(note_data._id)}>

                    <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Edit'>
                        <EditRoundedIcon sx={{fontSize:'1.5rem'}}/>
                    </NO_TEXT_ICON_BUTTON___STYLED>
        
                </ROUTER_NAVIGATION___COMPONENT>


                <BOOKMARK___CHILD  note_data={note_data} refetch_the_bookmarked_notes={refetch_the_bookmarked_notes} />

            </Stack>

        </WRAPPER_OF_NOTE_CARD___STYLED>
    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTE___CHILD/>
____________________________________________*/

function BOOKMARK___CHILD({note_data, refetch_the_bookmarked_notes}) {

     // useAddOrRemoveNoteBookmark
     const { refetch, fetchStatus, status, isFetching} = useAddOrRemoveNoteBookmark(note_data._id)


     // Click to Remove from Bookmark 
     const handle_click_on_the_button = () => {
         refetch()
     }
 
 
     // Update the state
     useEffect(()=>{
 
         if(status==='success') {
 
            refetch_the_bookmarked_notes()
         }
     
     },[fetchStatus])


     return (


        <>

            {isFetching?

                <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Loading...'>
                    <CircularProgress size='1.5rem'/>
                </NO_TEXT_ICON_BUTTON___STYLED>
    
                :


                <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Remove Bookmark' onClick={handle_click_on_the_button}>
                    <BookmarkRemoveRoundedIcon sx={{fontSize:'1.5rem'}}/>
                </NO_TEXT_ICON_BUTTON___STYLED>


            }
        
        </>

     )

}







