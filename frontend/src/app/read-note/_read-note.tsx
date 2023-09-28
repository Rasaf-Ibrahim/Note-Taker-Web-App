'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config";

// hook
import { useState } from 'react'

// api hook
import { useFetchNote } from "@/api-calls/note/fetch-a-note"

// router hook
import useRouterQueryStringParams from "@/utils/route/router-query-string-parameters"

// theme hook
import { useTheme } from '@mui/material/styles';

// utils
import log_in_dev_env from "@/utils/log/log-in-dev-env-util"


// router
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation";

// components
import { Box, Typography, Button } from '@mui/material'

import LOADING_SPINNER___REUSABLE from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ERROR_TEXT___REUSABLE from "@/components/reusable/for-any-project/error-text/error-text"
import DisplayTheOutput from "rich-text-editor-for-react/display-output";
import CONTAINER___STYLED from "@/components/styled/for-any-project/container"
import NOTE_DELETE_CONFIRMATION_MODAL___REUSABLE from "@/components/reusable/just-for-this-project/note-delete-confirmation";



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function READ_NOTE___COMPONENT() {

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

                            <DISPLAY_NOTE___CHILD
                                note_data={data.fetched_document} />

                        )
                    }


                })()

            }

        </>
    )
}




/*__________________________________________

 ✅ Child components of
  <READ_NOTE___COMPONENT/>
____________________________________________*/


function DISPLAY_NOTE___CHILD({ note_data }) {

    const theme = useTheme()




    // State to handle delete note modal
    const [is_delete_note_modal_open, set_is_delete_note_modal_open] = useState(false)


    const handle_click_on_the_delete_button = () => {
        set_is_delete_note_modal_open(true)
    }

    const handle_delete_modal_close = () => {
        set_is_delete_note_modal_open(false)
    }




    // ✅ TSX
    return (

        <WRAPPER_OF_NOTE___STYLED>

            {/*🍪  Note Title  🍪*/}
            <Typography
                variant='h4'
                sx={{
                    marginBottom: 3,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    paddingBottom: 1,
                    fontWeight: 'bold',
                }}
            >
                {note_data.title}
            </Typography>



            {/*🍪  Note Description  🍪*/}
            <Box>
                <DisplayTheOutput
                    html={note_data.description}
                    backgroundColor={theme.palette.background.variation_1}
                    primaryColor={theme.palette.primary.main}
                    typography={{
                        h1: {
                            fontSize: '1rem',
                            fontWeight: 300
                        },
                        p: {
                            fontSize: '16px'
                        }
                    }}
                />
            </Box>



            {/*🍪  Edit & Delete Note  🍪*/}


            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.edit_note(note_data._id)}>

                    <Button variant='contained'>Edit</Button>

                </ROUTER_NAVIGATION___COMPONENT>

                <Button
                    onClick={handle_click_on_the_delete_button}
                    variant='contained'
                    color='error'
                >
                    Delete
                </Button>

            </Box>


            <NOTE_DELETE_CONFIRMATION_MODAL___REUSABLE
                modal_is_open={is_delete_note_modal_open}
                handle_modal_close={handle_delete_modal_close}
                note_id={note_data._id}
            />



        </WRAPPER_OF_NOTE___STYLED>
    )
}




/*__________________________________________

 ✅ Styled component of
  <DISPLAY_NOTE___CHILD/>
____________________________________________*/


function WRAPPER_OF_NOTE___STYLED({ children }) {

    return (

        <CONTAINER___STYLED
            elevation={{
                light: {
                    value: 1
                },
                dark: {
                    value: 1
                },
            }}

            background_color={{
                light: 1,
                dark: 1
            }}

            sx={{
                margin: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },

                borderRadius: 2,

                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >

            {children}

        </CONTAINER___STYLED>

    )
}