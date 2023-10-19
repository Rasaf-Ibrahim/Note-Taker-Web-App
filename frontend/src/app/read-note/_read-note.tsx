'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// react
import * as React from 'react'

// types
import { MenuProps } from '@mui/material/Menu';

// config
import config_obj from "@/config"

// date-fns
import { format } from 'date-fns'

// hook
import { useState, useEffect } from 'react'

// api hook
import { useFetchNote } from "@/api-calls/note/fetch-a-note"
import { useAddOrRemoveNoteBookmark } from '@/api-calls/note/add-to-bookmark-or-remove-from-bookmark-hook'

// router hook
import useRouterQueryStringParams from "@/utils/route/router-query-string-parameters"

// theme hook
import { useTheme } from '@mui/material/styles'

// router
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation"

// style
import { styled, alpha } from '@mui/material/styles'

// icons
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArticleIcon from '@mui/icons-material/Article'
import SettingsIcon from '@mui/icons-material/Settings'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

// components
import DisplayTheOutput from "rich-text-editor-for-react/display-output"

import { Box, Button, Stack, Typography, Menu, MenuItem, Divider, CircularProgress} from '@mui/material'

import LOADING_SPINNER___REUSABLE from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___REUSABLE from "@/components/reusable/for-any-project/error-text/error-text"
import CONTAINER___STYLED from "@/components/styled/for-any-project/container"
import NOTE_DELETE_CONFIRMATION_MODAL___REUSABLE from "@/components/reusable/just-for-this-project/note-delete-confirmation"





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function READ_NOTE___COMPONENT() {

    // 🍪 extract the token 
    const { id } = useRouterQueryStringParams()


    //  🍪 useFetchNote hook
    const {data, isLoading, isSuccess, isError, error } = useFetchNote(id)



    // ✅ TSX
    return (
        <>

            {

                (() => {

                    if (isLoading) {
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

                            <DISPLAY_NOTE___CHILD 
                                note_data={data.fetched_document} 
                            />

                        )
                    }

                })()

            }

        </>
    )
}




/*__________________________________________

 ✅ Child Component of 
 <READ_NOTE___COMPONENT/>
____________________________________________*/

function DISPLAY_NOTE___CHILD({ note_data }) {

    return (
        <Box sx={{
            margin: { xs: '1rem', sm: '1.5rem', md: '2rem' },
            
            display:'flex',
            flexDirection:'column',
            gap:'1.5rem'
        }}>

    
            <NOTE_ACTIONS___CHILD note_data={note_data}/>

            <NOTE_TITLE_AND_INFO_AND_DESCRIPTION___CHILD note_data={note_data}/>
                

        </Box>
    )
}


/*__________________________________________

 ✅ Child Component of 
 <DISPLAY_NOTE___CHILD/>
____________________________________________*/

function NOTE_TITLE_AND_INFO_AND_DESCRIPTION___CHILD({note_data}) {

    return (

        <CONTAINER___STYLED
            elevation={{light: { value: 1 }, dark: { value: 0 }}}

            background_color={{light: 0, dark: 1}}

            sx={{   
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        > 

            <NOTE_TITLE_AND_INFO___CHILD note_data={note_data} />


            <NOTE_DESCRIPTION___CHILD note_data={note_data}/>
            

        </CONTAINER___STYLED>

    )

}


/*__________________________________________

 ✅ Child Component of 
 <DISPLAY_NOTE___CHILD/>
____________________________________________*/

function NOTE_ACTIONS___CHILD({note_data}) {

    // state to open and close dropdown options menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

  
    // TSX
    return (

      <Box sx={{alignSelf:'end'}}>

        <Button
          variant="text"
          size='small'
          disableElevation
          onClick={handleClick}
          startIcon={<SettingsIcon />}
        >
          Options
        </Button>

        <MENU___STYLED
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >

          <EDIT_ACTION___CHILD 
            handle_close_actions_dropdown={handleClose}
            note_data={note_data}
          />

          <DELETE_ACTION___CHILD
            handle_close_actions_dropdown={handleClose}
            note_data={note_data}
           />

          <Divider sx={{ my: 0.5 }} />

          <ADD_OR_REMOVE_BOOKMARK_ACTION___CHILD note_data={note_data} />

          <Divider sx={{ my: 0.5 }} />


          <NAVIGATE_TO_ALL_NOTES_PAGE___CHILD handle_close_actions_dropdown={handleClose}/>

          <NAVIGATE_TO_CREATE_NOTE_PAGE___CHILD handle_close_actions_dropdown={handleClose}/>

        </MENU___STYLED>

      </Box>
    )
}




/*__________________________________________

 ✅ Child Component of 
 <NOTE_TITLE_AND_INFO_AND_DESCRIPTION___CHILD/>
____________________________________________*/

function NOTE_TITLE_AND_INFO___CHILD({note_data}) {

    // theme
    const theme = useTheme()

    // Convert date string to a readable format
    const formatted_created_at = format(new Date(note_data.createdAt), 'h:mm a, dd-MM-yyyy')
    const formatted_updated_at = format(new Date(note_data.updatedAt), 'h:mm a, dd-MM-yyyy')

    return (
        <Stack spacing='1rem' 
            sx={{
                padding:'1rem',
                borderBottom: `2px solid ${theme.palette.divider}`,
            }}
        >

            <Typography 
                variant="h6"
            >
                {note_data.title}
            </Typography>


            <Stack spacing='0.3rem'>
                <Typography 
                variant='caption'>
                    Created: {formatted_created_at}
                </Typography>

                <Typography variant='caption'>
                    Last Modified: {formatted_updated_at}
                </Typography>
            </Stack>

        </Stack>
    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTE_TITLE_AND_INFO_AND_DESCRIPTION___CHILD/>
____________________________________________*/

function NOTE_DESCRIPTION___CHILD({note_data}) {

    const theme = useTheme()

    return (

        <Box>

            <DisplayTheOutput
                html={note_data.description}

                backgroundColor={theme.palette.mode === 'dark' ? theme.palette.background.variation_1: theme.palette.background.default}

                primaryColor={theme.palette.primary.main}
            />

        </Box>
    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/

function EDIT_ACTION___CHILD({
    handle_close_actions_dropdown,
    note_data
}) {

    return (

        <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.edit_note(note_data._id)}>

            <MenuItem onClick={handle_close_actions_dropdown} disableRipple>

                <EditIcon />
                Edit

            </MenuItem>
                
        </ROUTER_NAVIGATION___COMPONENT>

    )
}


/*__________________________________________

 ✅ Child Component of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/

function DELETE_ACTION___CHILD({
    handle_close_actions_dropdown,
    note_data
}) {

    // is_delete_note_modal_open state
    const [is_delete_note_modal_open, set_is_delete_note_modal_open] = useState(false)

    const handle_click_on_the_delete_button = () => {
        set_is_delete_note_modal_open(true)
    }

    const handle_delete_modal_close = () => {
        set_is_delete_note_modal_open(false)
    }


    return (

        <>  
            <MenuItem onClick={handle_click_on_the_delete_button} disableRipple>
                <DeleteIcon />
                Delete
            </MenuItem>

            <NOTE_DELETE_CONFIRMATION_MODAL___REUSABLE 
                    modal_is_open={is_delete_note_modal_open}
                    handle_modal_close={handle_delete_modal_close}
                    note_id={note_data._id}
            />
        </>

    )
}


/*__________________________________________

 ✅ Child Component of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/

function ADD_OR_REMOVE_BOOKMARK_ACTION___CHILD({
    note_data,
}) {

    // useAddOrRemoveNoteBookmark
    const { refetch, data, fetchStatus, status, isFetching} = useAddOrRemoveNoteBookmark(note_data._id)


    // Click to Add to Bookmark or Remove from Bookmark Button
    const handle_click_on_the_item = () => {
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



    // TSX
    return (

        <>  
            <MenuItem 
                onClick={handle_click_on_the_item} 
                disableRipple>

                {isFetching?

                   <>
                        <CircularProgress size='1.65rem'/>
                   </>

                   :
                  
           
                    (is_bookmarked ?
                
                        <>
                            <RemoveCircleRoundedIcon/>
                            Bookmark
                        </>
                        

                        :

                        <>
                            <AddCircleRoundedIcon/>
                            Bookmark
                        </>
                    )

                }
   
            </MenuItem>


        </>

    )
}



/*__________________________________________

 ✅ Child Component of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/

function NAVIGATE_TO_ALL_NOTES_PAGE___CHILD({
    handle_close_actions_dropdown
}) {

    return (

        <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.all_notes}>

            <MenuItem onClick={handle_close_actions_dropdown} disableRipple>

                <ArticleIcon />
                All Notes

            </MenuItem>
                
        </ROUTER_NAVIGATION___COMPONENT>

    )
}


/*__________________________________________

 ✅ Child Component of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/

function NAVIGATE_TO_CREATE_NOTE_PAGE___CHILD({
    handle_close_actions_dropdown
}) {

    return (

        <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.create_note}>

            <MenuItem onClick={handle_close_actions_dropdown} disableRipple>

                <NoteAddIcon />
                Create Note

            </MenuItem>
                
        </ROUTER_NAVIGATION___COMPONENT>

    )
}




/*__________________________________________

 ✅ Styled Components of 
 <NOTE_ACTIONS___CHILD/>
____________________________________________*/


const MENU___STYLED = styled((props: MenuProps) => (

    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
}))


