/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_func_prop_with_no_rule } from '@/types/commonly-used-types'

// config
import config_obj from '@/config'

// icon
import ColorLensIcon from '@mui/icons-material/ColorLens';

// type
import { Button } from '@mui/material';

// components
import { Box, IconButton } from "@mui/material"
import MENU_ICON_AND_LOGO___COMPONENT from './_menu-icon-and-logo';
import APPEARANCE___MODAL from './_appearance-modal';
import PROFILE_POPOVER___COMPONENT from './_profile-popover';
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation';
import { auth_store } from '@/store/auth-store';
import CONTAINER___STYLED from '@/components/styled/for-any-project/container';



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_no_auth_navbar_props = {
    auth_layout: boolean,
    no_navigation_drawer: boolean,

    navbar_height: string

    navigation_drawer_is_open: boolean
    open_navigation_drawer: type_of_func_prop_with_no_rule,
    close_navigation_drawer: type_of_func_prop_with_no_rule,

    appearance_modal_is_open: boolean,
    open_appearance_modal: type_of_func_prop_with_no_rule,
    close_appearance_modal: type_of_func_prop_with_no_rule,

}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function NAVBAR___COMPONENT(props: type_of_no_auth_navbar_props) {


    // 🍪 props
    const {
        auth_layout,
        no_navigation_drawer,

        navbar_height,

        navigation_drawer_is_open,
        open_navigation_drawer,
        close_navigation_drawer,

        appearance_modal_is_open,
        open_appearance_modal,
        close_appearance_modal,

    } = props



    // 🍪 get the state properties 
    const { user_state } = auth_store(state => ({
        user_state: state?.user_state
    }))





    /*__________________________________________
    
     ✅ JSX 
    ____________________________________________*/

    return (


        <CONTAINER___STYLED
            elevation={{
                light: {
                    value: 4
                },
                dark: {
                    value: 4
                },
            }}

            background_color={{
                light: 'inherit',
                dark: 'inherit'
            }}
        >

            <NAVBAR___STYLED navbar_height={navbar_height}>


                <LEFT_CORNER_OF_NAVBAR___STYLED>


                    {!navigation_drawer_is_open &&


                        <MENU_ICON_AND_LOGO___COMPONENT

                            no_menu_icon={no_navigation_drawer}

                            handle_drawer_open={open_navigation_drawer}

                        />

                    }

                </LEFT_CORNER_OF_NAVBAR___STYLED>



                <RIGHT_CORNER_OF_NAVBAR___STYLED>


                    {auth_layout &&

                        <>

                            {user_state.signed_in_or_up ?

                                <PROFILE_POPOVER___COMPONENT />

                                :

                                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_in}>

                                    <Button variant='contained'>
                                        Sign In
                                    </Button>

                                </ROUTER_NAVIGATION___COMPONENT>
                            }

                        </>

                    }




                    {!auth_layout &&

                        <>
                            <APPEARANCE_ICON___CHILD
                                open_appearance_modal={open_appearance_modal}
                            />


                            <APPEARANCE___MODAL

                                appearance_modal_is_open={appearance_modal_is_open}

                                close_appearance_modal={close_appearance_modal}

                            />

                        </>

                    }


                </RIGHT_CORNER_OF_NAVBAR___STYLED>





            </NAVBAR___STYLED>

        </CONTAINER___STYLED>
    )

}





/*__________________________________________

✅ Child Components of
<NAVBAR___COMPONENT/>
____________________________________________*/


/* 🍪 */
type type_of_appearance_icon = {
    open_appearance_modal: type_of_func_prop_with_no_rule
}


function APPEARANCE_ICON___CHILD(props: type_of_appearance_icon) {

    const {
        open_appearance_modal
    } = props


    return (

        <>

            <IconButton
                onClick={open_appearance_modal}
                sx={{ fontSize: '2rem', color: 'inherit' }}>

                <ColorLensIcon />

            </IconButton>


        </>

    )

}





/*__________________________________________

✅ Styled Components for 
<NAVBAR___COMPONENT/>
____________________________________________*/



function NAVBAR___STYLED({ children, navbar_height }) {

    return (

        <Box sx={(theme) => ({
            /* layout */
            paddingLeft: '1rem',
            paddingRight: '1rem',
            height: `${navbar_height}`,


            /* child layout */
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '2.5fr 1fr',



            /* child components */
            "> .left_corner_of_navbar": {
                gridColumn: 1,
                justifySelf: 'start'
            },


            "> .right_corner_of_navbar": {
                gridColumn: 2,
                justifySelf: 'end'
            }


        })}>


            {children}


        </Box>
    )

}





function LEFT_CORNER_OF_NAVBAR___STYLED({ children }) {

    return (

        <Box className='left_corner_of_navbar'>

            {children}

        </Box>
    )

}



function RIGHT_CORNER_OF_NAVBAR___STYLED({ children }) {

    return (

        <Box className='right_corner_of_navbar'>

            {children}

        </Box>
    )

}




