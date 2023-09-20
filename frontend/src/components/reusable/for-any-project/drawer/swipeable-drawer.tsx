/*__________________________________________

 ✅ import
____________________________________________*/


// types
import { type_of_anything, type_of_func_prop_with_no_rule, type_of_single_element_jsx } from '@/types/commonly-used-types'

// hook
import { useEffect } from 'react'


// styled components
import { styled } from '@mui/material/styles'


// components
import dynamic from 'next/dynamic'
const SwipeableDrawer:type_of_anything = dynamic(() => import('@mui/material/SwipeableDrawer'))


/*__________________________________________

 ✅ types
____________________________________________*/



type none_conditional_types_of_swipeable_drawer_props = {

    drawer_open_direction: "right" | "left"
    drawer_width: string,
    drawer_is_open_state: boolean,
    handle_drawer_open: type_of_func_prop_with_no_rule,
    handle_drawer_close: type_of_func_prop_with_no_rule,
    drawer_content_jsx: type_of_single_element_jsx
}


// the 'is_large_screen', 'drawer_top_section_jsx' & 'drawer_open_initially' should only be present when persistent_on_large_screen is true 
type conditional_types_of_swipeable_drawer_props = {
    persistent_on_large_screen: true
    is_large_screen: boolean
    drawer_top_section_jsx: type_of_single_element_jsx
    drawer_open_initially: boolean
} |
{
    persistent_on_large_screen: false
    is_large_screen: never
    drawer_top_section_jsx: never,
    drawer_open_initially: never
}


type type_of_swipeable_drawer_props = none_conditional_types_of_swipeable_drawer_props & conditional_types_of_swipeable_drawer_props





/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function SWIPEABLE_DRAWER___REUSABLE(props: type_of_swipeable_drawer_props) {


    const {
        drawer_open_direction,
        drawer_width,
        drawer_is_open_state,
        handle_drawer_open,
        handle_drawer_close,
        persistent_on_large_screen,
        is_large_screen,
        drawer_open_initially,
        drawer_top_section_jsx,
        drawer_content_jsx
    } = props




    /* if 'drawer_open_initially' set to true */
    useEffect(() => {

        if (drawer_open_initially) {
            handle_drawer_open()
        }

    }, [])




    /*__________________________________________

    ✅ JSX
    ____________________________________________*/
    return (

        <SwipeableDrawer
            anchor={drawer_open_direction}
            open={drawer_is_open_state}
            onOpen={handle_drawer_open}
            onClose={handle_drawer_close}
            variant={
                !persistent_on_large_screen ? "temporary" :
                    (is_large_screen ? "persistent" : "temporary")
            }
            elevation={3}
        >


            <CONTENT_WRAPPER___NOT_STYLED sx={{
                width: `${drawer_width}`,
                height: '100%',
                minHeight: '100vh'
            }}>



                {drawer_top_section_jsx}


                {/* Content of Drawer */}
                {drawer_content_jsx}

            </CONTENT_WRAPPER___NOT_STYLED>



        </SwipeableDrawer>


    )
}



/*__________________________________________

✅ Styled Components of
 <SWIPEABLE_DRAWER___REUSABLE/>
____________________________________________*/



const CONTENT_WRAPPER___NOT_STYLED = styled('div')
    (({ theme }) => ``)




