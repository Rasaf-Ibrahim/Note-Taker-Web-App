'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// hook
import { useEffect, useState } from "react"
import { useUpdateEffect } from "react-use"

// api hook
import { useFetchUserNotes } from "@/api-calls/note/fetch-all-note-of-a-user-hook"
import { useDeleteNotes } from '@/api-calls/note/delete-notes-hook'
import { useAddOrRemoveNoteBookmark } from "@/api-calls/note/add-to-bookmark-or-remove-from-bookmark-hook"

// theme hook
import { useTheme } from '@mui/material/styles'

// form hook
import useFormManagement, { type_of_form_configuration } from "@/utils/global-hooks/use-form-management"

// store
import { note_store, note_store_actions } from "@/store/note-store"

// utils
import log_in_dev_env from "@/utils/log/log-in-dev-env-util"

// route
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation"

// icon
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import BookmarkAddRoundedIcon  from "@mui/icons-material/BookmarkAddRounded"
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded"

// styled components
import MODAL_CONTENT_WRAPPER___STYLED from "@/components/styled/for-any-project/modal-content-wrapper"
import WRAPPER_OF_NOTES___STYLED from "@/components/styled/just-for-this-project/wrapper-of-notes"
import WRAPPER_OF_NOTE_CARD___STYLED from "@/components/styled/just-for-this-project/wrapper-of-note-card"
import NO_TEXT_ICON_BUTTON___STYLED from "@/components/styled/just-for-this-project/no-text-icon-button"

// mui components
import { Box, Stack, Typography, Button, Pagination, Tooltip, IconButton, CircularProgress } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid'

// reusable components
import NOTE_NAVIGATION_TABS___REUSABLE from "@/components/reusable/just-for-this-project/note-navigation-tabs"
import LOADING_SPINNER___REUSABLE from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___REUSABLE from "@/components/reusable/for-any-project/error-text/error-text"
import MODAL___REUSABLE from "@/components/reusable/for-any-project/modal/modal"
import MUI_RADIO___COMPONENT from "@/components/reusable/for-any-project/form/mui-radio"



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function ALL_NOTES___COMPONENT() {

    // useFetchUserNotes
    const { 
        refetch,
        fetchStatus,
        isFetching,
        isSuccess,
        isError,
        error,
        data
    } = useFetchUserNotes()


    // note store
    const { sort, limit, page } = note_store(state => ({
        sort: state?.note?.query_params?.sort,
        limit: state?.note?.query_params?.limit,
        page: state?.note?.query_params?.page
    }))


    // fetch on mount and when specific query params changes
    useEffect(() => {

        refetch()

    }, [sort, limit, page])

    

    useEffect(() => {

        if (isError) {

            let error_message = (error as any).response.data.message

            let total_pages = error_message.match(/Total pages available: \d+/)?.[0].split(":")[1]?.trim();

            if (total_pages) {
                note_store_actions.note.update_query_param_page(total_pages)
            }
        }

    }, [fetchStatus])



    // ✅ TSX
    return (
        <>

            <NOTE_NAVIGATION_TABS___REUSABLE />


            {

                (() => {

                    if (isFetching) {
                        return (
                            <LOADING_SPINNER___REUSABLE full_screen={false} margin="12rem" />
                        )
                    }


                    else if (isError && !(error as any).response.data.message.toLowerCase().includes('total pages')) {
                    

                        return (
                            <Box sx={{ marginTop: '5rem' }}>

                                <ERROR_TEXT___REUSABLE error_text='Something is wrong!' />

                            </Box>
                        )
                    }


                    else if (isSuccess) {

                        return (

                            <FETCHED_NOTES___CHILD note_data={data.fetched_documents} pagination_info={data.info} refetch={refetch} />

                        )
                    }

                })()

            }

        </>
    )
}



/*__________________________________________

 ✅ Child component of 
 <ALL_NOTES___COMPONENT/>
____________________________________________*/

function FETCHED_NOTES___CHILD({ note_data, pagination_info, refetch }) {

    // TSX
    return (

        <>
            {note_data.length === 0 ?

                <NO_NOTES_AVAILABLE___CHILD />

                :

                <DISPLAY_FETCHED_NOTES___CHILD note_data={note_data} pagination_info={pagination_info} refetch={refetch}/>
            }

        </>
    )
}



/*__________________________________________

 ✅ Child component of 
 <DISPLAY_FETCHED_NOTES___CHILD/>
____________________________________________*/

function NO_NOTES_AVAILABLE___CHILD() {

    return (
        <WRAPPER_OF_NOTES___STYLED>

            <Typography
                variant='body1'
                textAlign='center'
                sx={{ fontWeight: 600 }}>
                No Notes Available
            </Typography>


            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.create_note}>

                <Button
                    startIcon={<NoteAddIcon />}>
                    Create a New Note
                </Button>
            </ROUTER_NAVIGATION___COMPONENT>

        </WRAPPER_OF_NOTES___STYLED>
    )
}



/*__________________________________________

 ✅ Child component of 
 <FETCHED_NOTES___CHILD/>
____________________________________________*/

function DISPLAY_FETCHED_NOTES___CHILD({
    note_data,
    pagination_info,
    refetch
}) {

    return (

        <WRAPPER_OF_NOTES___STYLED>

            <FILTER_DELETE_BUTTON_AND_NOTES___CHILD note_data={note_data} refetch={refetch}/>


            {note_data.length > 0 &&

                <PAGINATION___CHILD pagination_info={pagination_info} />
            }


        </WRAPPER_OF_NOTES___STYLED>

    )
}



/*__________________________________________

 ✅ Child component of 
 <DISPLAY_FETCHED_NOTES___CHILD/>
____________________________________________*/

function FILTER_DELETE_BUTTON_AND_NOTES___CHILD({note_data, refetch}) {

    // state to handle active multi delete UI
    const [activate_bulk_delete_ui, set_activate_bulk_delete_ui] = useState(false)


    return (

        <WRAPPER_OF_FILTER_DELETE_AND_NOTES___STYLED>

            <WRAPPER_OF_FILTER_AND_DELETE___STYLED>

                <FILTER___CHILD />

                <BULK_DELETE_BUTTON___CHILD 
                    activate_bulk_delete_ui={activate_bulk_delete_ui}
                    set_activate_bulk_delete_ui={set_activate_bulk_delete_ui} 
                />

            </WRAPPER_OF_FILTER_AND_DELETE___STYLED>


            <NOTES___CHILD all_notes_data={note_data} activate_bulk_delete_ui={activate_bulk_delete_ui} refetch={refetch} />

        </WRAPPER_OF_FILTER_DELETE_AND_NOTES___STYLED>


    )
}



/*__________________________________________

 ✅ Child component of 
 <DISPLAY_FETCHED_NOTES___CHILD/>
____________________________________________*/
function PAGINATION___CHILD({ pagination_info }) {

    // note store
    const { page } = note_store(state => ({
        page: state?.note?.query_params?.page
    }))

    
    // update store
    const handleChange = (event, value) => {
        note_store_actions.note.update_query_param_page(value)
    }


    // Pagination Info
    const total_pages = pagination_info.total_pages
    const total_notes = pagination_info.total_documents
    const showing_range_start = pagination_info.current_documents_range.start
    const showing_range_end = pagination_info.current_documents_range.end
    


    return (

        <Stack spacing='1rem' alignItems='center'sx={{textAlign:'center'}}>

            <Pagination
                color="primary"
                onChange={handleChange}
                count={total_pages}
                page={Number(page)}
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
 <FILTER_DELETE_BUTTON_AND_NOTES___CHILD/>
____________________________________________*/
function FILTER___CHILD() {


    const [is_filter_modal_open, set_is_filter_modal_open] = useState(false)


    const handle_click_on_the_filter_button = () => {

        set_is_filter_modal_open(true)

    }

    const handle_modal_close = () => {
        set_is_filter_modal_open(false)
    }



    return (

        <>

            <Button
                onClick={handle_click_on_the_filter_button}
                startIcon={<FilterAltIcon sx={{ fontSize: '1.5rem' }} />}>
                Filter & Sort
            </Button>



            <MODAL___REUSABLE

                modal_is_open={is_filter_modal_open}

                modal_navbar_jsx={
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        Filter & Sort
                    </Typography>
                }

                modal_content_jsx={<FILTER_MODAL_CONTENT___CHILD is_filter_modal_open={is_filter_modal_open} />}

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_footer_jsx={

                    <Button
                        onClick={handle_modal_close}
                        size='small'
                        variant="outlined">
                        Apply
                    </Button>
                }

            />


        </>

    )

}


/*__________________________________________

 ✅ Child component of 
 <DISPLAY_FETCHED_NOTES___CHILD/>
____________________________________________*/
function BULK_DELETE_BUTTON___CHILD({ activate_bulk_delete_ui, set_activate_bulk_delete_ui }) {

    return (

        <Button
            onClick={() => set_activate_bulk_delete_ui(!activate_bulk_delete_ui)}
            startIcon={
                !activate_bulk_delete_ui ?
                    <DeleteIcon sx={{ fontSize: '1.5rem' }} />
                    :
                    <ClearIcon sx={{ fontSize: '1.5rem' }} />
            }
        >
            {
                !activate_bulk_delete_ui ?
                    'Activate Bulk Delete' :
                    'Deactivate Bulk Delete'
            }
        </Button>
    )
}


/*__________________________________________

 ✅ Child component of 
 <FILTER_DELETE_BUTTON_AND_NOTES___CHILD/>
____________________________________________*/
function NOTES___CHILD({ all_notes_data, activate_bulk_delete_ui, refetch }) {


    return (

        <Stack justifyContent='center' spacing='2rem'>


            {!activate_bulk_delete_ui ?

                all_notes_data.map((note_data) => {

                    return (
                        <NOTE_CARD___CHILD
                            key={note_data._id}
                            note_data={note_data}
                        />
                    )

                })

                :

                <NOTE_BULK_DELETE___CHILD all_notes_data={all_notes_data} refetch={refetch} />

            }


        </Stack>

    )

}



/*__________________________________________

 ✅ Child components of 
 <FILTER___CHILD/>
____________________________________________*/
function FILTER_MODAL_CONTENT___CHILD({ is_filter_modal_open }) {


    // note store
    const { sort, limit } = note_store(state => ({
        sort: state?.note?.query_params?.sort,
        limit: state?.note?.query_params?.limit
    }))


    // form state management (1/3 Steps) - form_configuration 
    const form_configuration: type_of_form_configuration = {


        /* limit  */
        'limit': {

            component_type: 'radio',

            value: limit,

            is_required: true

        },


        /* sort  */
        'sort': {

            component_type: 'radio',

            value: sort,

            is_required: true

        },


    }


    // form state management (2/2 Steps) - useFormManagement 
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = useFormManagement(form_configuration)



    // on close of the filter modal, we will attempt to update the "note_store_actions.note.query_param" state.
    useUpdateEffect(() => {

        if (is_filter_modal_open) return

        note_store_actions.note.update_query_param_limit(formState?.form_data?.limit?.value)

        note_store_actions.note.update_query_param_sort(formState?.form_data?.sort?.value)

    
    }, [is_filter_modal_open])




    // TSX
    return (

        <MODAL_CONTENT_WRAPPER___STYLED>


            {/*  notes per page  */}
            <MUI_RADIO___COMPONENT

                label='Notes Per Page'

                input_name='limit'

                radio_array={[

                    { value: '5', label: '5' },

                    { value: '10', label: '10' },

                    { value: '15', label: '15' },

                    { value: '20', label: '20' }
                ]}


                state={formState}

                actions={actions}

                validation_info={validation_info}

                // optional props
                all_radio_buttons_in_a_row={true}
                radio_size_in_rem='1.5rem'
                label_placement='end' //top, bottom, start, end
                color='primary' // primary, secondary, error, info, success, warning

            />


            {/*  sort  */}
            <MUI_RADIO___COMPONENT

                label='Sort'

                input_name='sort'

                radio_array={[

                    { value: '-createdAt', label: 'Newest First' },

                    { value: 'createdAt', label: 'Oldest First' },

                    { value: '-updatedAt', label: 'Recently Modified' },

                    { value: 'updatedAt', label: 'Least Recently Modified' }
                ]}


                state={formState}

                actions={actions}

                validation_info={validation_info}

                // optional props
                all_radio_buttons_in_a_row={false}
                radio_size_in_rem='1.5rem'
                label_placement='end' //top, bottom, start, end
                color='primary' // primary, secondary, error, info, success, warning

            />


        </MODAL_CONTENT_WRAPPER___STYLED>

    )

}



/*__________________________________________

 ✅ Child component of 
 <NOTES___CHILD/>
____________________________________________*/

function NOTE_CARD___CHILD({ note_data }) {

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


                <BOOKMARK___CHILD note_data={note_data}/>

            </Stack>

        </WRAPPER_OF_NOTE_CARD___STYLED>
    )
}



/*__________________________________________

 ✅ Child component of 
 <NOTES___CHILD/>
____________________________________________*/
function NOTE_BULK_DELETE___CHILD({ all_notes_data, refetch }) {

    // useDeleteNotes
    const { mutate, isLoading: isDeleting, isSuccess: isDeletedSuccessfully } = useDeleteNotes()


    // generate rows
    const rows = all_notes_data.map((note) => ({
        id: note._id,
        noteTitle: note.title,
    }))


    // columns
    const columns: GridColDef[] = [
        {
            field: 'noteTitle',
            headerName: 'Note Title',
            width: 500,
            disableColumnMenu: true,
            headerClassName: "header-cells-common-style hide-text",
        },

        // commented out read and edit button column
        /* 
            {
                field: 'read',
                headerName: 'Read',
                width: 100,
                disableColumnMenu: true,
                sortable: false,
                headerClassName: "header-cells-common-style hide-text",
                renderCell: (params) => (

                    <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.read_note(params.row.id)}>

                        <Button sx={{ width: 'fit-content', }}>
                            Read
                        </Button>
                    </ROUTER_NAVIGATION___COMPONENT>

                ),
            },

            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                disableColumnMenu: true,
                sortable: false,
                headerClassName: "header-cells-common-style hide-text",
                renderCell: (params) => (

                    
                    <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.edit_note(params.row.id)}>

                        <Button sx={{ width: 'fit-content', }}>
                            Edit
                        </Button>

                    </ROUTER_NAVIGATION___COMPONENT>
                ),
            },

        */

    ]

    // state to store all the selected note's id
    const [selectedNotes, setSelectedNotes] = useState([])

    // state to count total selected notes
    const [selectionCount, setSelectionCount] = useState(0)

    // handle selection
    const handleSelection = (newSelection, details) => {
        setSelectedNotes(newSelection);
        setSelectionCount(newSelection?.length)
    }

    // handle notes deletion
    const handleNotesDeletion = () => {

        const user_input = {
            note_ids: selectedNotes
        }

        mutate(user_input)
    }


    // refetch the notes again on successful deletion
    useEffect(() => {

        if(!isDeletedSuccessfully) return

        refetch()

    }, [isDeletedSuccessfully])


    // TSX
    return (

        <>

            {/* Delete */}
            <Stack direction='row' alignItems='center' justifyContent='space-between'>

                <Typography
                    variant='body2'
                    color={selectionCount === 0 ? 'text.secondary' : 'text.primary'}>
                    Number of selected notes: {selectionCount}
                </Typography>

                <Button
                    startIcon={<DeleteIcon/>}
                    onClick={handleNotesDeletion}
                    color='error'
                    disabled={selectionCount === 0 || isDeleting}>

                    {!isDeleting ? 'Delete' : 'Deleting...'}

                </Button>

            </Stack>



            {/* All Notes */}
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={handleSelection}
                hideFooter

                sx={{
                    // remove the focus while clicking on a cell 
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },

                    // classes which are being used on the columns's prop's "headerClassName" property
                    '& .header-cells-common-style': {
                        outline: "none !important",
                        textAlign: 'center'
                    },

                    '& .hide-text': {
                        fontSize: '0px'
                    }


                    // commented out styles
                    /*
                        // hide the header
                        '& .MuiDataGrid-columnHeaders': {
                            display: 'none',
                        }, 
                        
                    */
                }}

            />

        </>

    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTE___CHILD/>
____________________________________________*/

function BOOKMARK___CHILD({note_data}) {

    // useAddOrRemoveNoteBookmark
    const { refetch, data, fetchStatus, status, isFetching} = useAddOrRemoveNoteBookmark(note_data._id)


    // Click to Add to Bookmark or Remove from Bookmark Button
    const handle_click_on_the_bookmark_icon = () => {
        refetch()
    }


    // is_bookmarked state
    const [is_bookmarked, set_is_bookmarked] = useState(note_data.is_bookmarked)


    // Update the state
    useEffect(()=>{

        if(status==='success') {

            if(data.message.includes('unbookmarked')) {
                set_is_bookmarked(false)
            }
            else{
                set_is_bookmarked(true)
            }
        }
    
    },[fetchStatus])


    // Update the state
    useEffect(()=>{

        if(status==='success') {

            if(data.message.includes('unbookmarked')) {
                set_is_bookmarked(false)
            }
            else{
                set_is_bookmarked(true)
            }
        }
    
    },[fetchStatus])



    // TSX
    return (


       <>

           {isFetching?

               <Tooltip title='Loading...'>
                    <IconButton>
                        <CircularProgress size='1.5rem'/>
                    </IconButton>
               </Tooltip>

               :

                (is_bookmarked ?
                    
                    <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Remove Bookmark' onClick={handle_click_on_the_bookmark_icon}>
                        <BookmarkRemoveRoundedIcon sx={{fontSize:'1.5rem'}}/>
                    </NO_TEXT_ICON_BUTTON___STYLED>
    

                    :

                    <NO_TEXT_ICON_BUTTON___STYLED tooltip_title='Bookmark' onClick={handle_click_on_the_bookmark_icon}>
                        <BookmarkAddRoundedIcon sx={{fontSize:'1.5rem'}}/>
                    </NO_TEXT_ICON_BUTTON___STYLED>

                )   

           }
       
       </>

    )

}




/*__________________________________________

 ✅ Styled components of 
 <FILTER_DELETE_BUTTON_AND_NOTES___CHILD/> 
____________________________________________*/

// 🍪
function WRAPPER_OF_FILTER_DELETE_AND_NOTES___STYLED({ children }) {

    return (
        <Stack spacing='1.5rem' sx={{ width: '100%' }}>
            {children}
        </Stack>
    )
}


// 🍪
function WRAPPER_OF_FILTER_AND_DELETE___STYLED({ children }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '1rem',
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: 'center'
            }}>
            {children}
        </Box>
    )
}







