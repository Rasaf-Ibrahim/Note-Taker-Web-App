'use client'

/*__________________________________________

 ✅ import 
____________________________________________*/
// hook
import { useImmer } from 'use-immer'

// mui hook
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// styled components
import { styled } from "@mui/material/styles"

// components
import { Box } from "@mui/material"
import NAVBAR___COMPONENT from './navbar/navbar'
import SWIPEABLE_DRAWER___REUSABLE from '@/components/reusable/for-any-project/drawer/swipeable-drawer'



// components
import DRAWER_TOP_SECTION___COMPONENT from './drawer/drawer-top-section'
import DRAWER_CONTENT___COMPONENT from './drawer/drawer-content'


/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_auth_layout_props = {
    auth_layout: boolean,
    no_navigation_drawer: boolean,
    content_of_the_whole_application: any,
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function EVERYTHING_OTHER_THAN_FOOTER___COMPONENT(props: type_of_auth_layout_props) {

    const {
        auth_layout,
        no_navigation_drawer,
        content_of_the_whole_application
    } = props


    // 🍪 media query
    const theme = useTheme()
    const laptop_and_up = useMediaQuery(theme.breakpoints.up('lg'))


    // 🍪 drawer state
    const [layout_state, update_layout_state] = useImmer({
        navigation_drawer_is_open: false,
        appearance_modal_is_open: false
    })



    // 🍪 drawer actions
    const layout_actions = {

        open_navigation_drawer: () => {

            update_layout_state(draft => {
                draft.navigation_drawer_is_open = true
            })

        },

        close_navigation_drawer: () => {

            update_layout_state(draft => {
                draft.navigation_drawer_is_open = false
            })

        },



        open_appearance_modal: () => {

            update_layout_state(draft => {
                draft.appearance_modal_is_open = true
            })

        },

        close_appearance_modal: () => {

            update_layout_state(draft => {
                draft.appearance_modal_is_open = false
            })

        }

    }




    // 🍪 important no auth layout values
    const important_layout_values = {

        navbar_height: '4rem',

        navigation_drawer_width: '300px',

        navigation_drawer_is_persistent_on_large_screen: true as true,

        navigation_drawer_open_direction: 'left' as 'right' | 'left',



        margin_right_of_everything_other_than_drawer: function () {

            if (
                important_layout_values.navigation_drawer_open_direction === 'right'
                && important_layout_values.navigation_drawer_is_persistent_on_large_screen
                && laptop_and_up
                && layout_state.navigation_drawer_is_open
            ) {
                return important_layout_values.navigation_drawer_width
            }


            else {
                return '0px'
            }

        },


        margin_left_of_everything_other_than_drawer: function () {

            if (
                important_layout_values.navigation_drawer_open_direction === 'left'
                && important_layout_values.navigation_drawer_is_persistent_on_large_screen
                && laptop_and_up
                && layout_state.navigation_drawer_is_open
            ) {
                return important_layout_values.navigation_drawer_width
            }


            else {
                return '0px'
            }



        }

    }






    /*__________________________________________

    ✅ JSX
    ____________________________________________*/

    return (

        <DRAWER_NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED>


            {!no_navigation_drawer &&

                <DRAWER___NOT_STYLED>


                    <SWIPEABLE_DRAWER___REUSABLE

                        drawer_open_direction={important_layout_values.navigation_drawer_open_direction}

                        drawer_width={important_layout_values.navigation_drawer_width}

                        drawer_is_open_state={layout_state.navigation_drawer_is_open}

                        handle_drawer_open={layout_actions.open_navigation_drawer}

                        handle_drawer_close={layout_actions.close_navigation_drawer}

                        persistent_on_large_screen={important_layout_values.navigation_drawer_is_persistent_on_large_screen}

                        is_large_screen={laptop_and_up}

                        drawer_open_initially={false}

                        drawer_content_jsx={<DRAWER_CONTENT___COMPONENT />}

                        drawer_top_section_jsx={<DRAWER_TOP_SECTION___COMPONENT

                            handle_drawer_close={layout_actions.close_navigation_drawer}

                            navbar_height={important_layout_values.navbar_height}

                        />}
                    />



                </DRAWER___NOT_STYLED>

            }


            <NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED sx={{

                marginRight: important_layout_values.margin_right_of_everything_other_than_drawer(),

                marginLeft: important_layout_values.margin_left_of_everything_other_than_drawer()
            }}>

                <NAVBAR___COMPONENT

                    auth_layout={auth_layout}


                    navbar_height={important_layout_values.navbar_height}

                    navigation_drawer_is_open={layout_state.navigation_drawer_is_open}

                    open_navigation_drawer={layout_actions.open_navigation_drawer}
                    close_navigation_drawer={layout_actions.close_navigation_drawer}

                    appearance_modal_is_open={layout_state.appearance_modal_is_open}
                    open_appearance_modal={layout_actions.open_appearance_modal}

                    close_appearance_modal={layout_actions.close_appearance_modal}

                    no_navigation_drawer={no_navigation_drawer}

                />


                {content_of_the_whole_application}

            </NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED>



        </DRAWER_NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED>

    )

}





/*__________________________________________

✅ Styled Components of
 <EVERYTHING_OTHER_THAN_FOOTER___COMPONENT/>
____________________________________________*/


/* 🍪 */
const DRAWER_NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED = styled(Box)
    (({ theme }) => ``)


/* 🍪 */
const DRAWER___NOT_STYLED = styled(Box)
    (({ theme }) => ``)


/* 🍪 */
const NAVBAR_AND_CONTENT_OF_THE_APPLICATION___NOT_STYLED = styled(Box)
    (({ theme }) => ``)










