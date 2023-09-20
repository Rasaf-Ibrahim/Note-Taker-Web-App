'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_anything, type_of_obj_with_any_values } from '@/types/commonly-used-types'

// styled-components
import { styled } from '@mui/material/styles'

// component
import { Box } from '@mui/material'
import EVERYTHING_OTHER_THAN_FOOTER___COMPONENT from './everything-other-than-footer/everything-other-than-footer'
import DYNAMIC_FOOTER___COMPONENT from './footer/footer'



/*__________________________________________

 ✅ types
____________________________________________*/

export type type_of_theme_mode = 'dynamic' | 'always_dark' | 'always_light'

type type_of_dynamic_layout_props = {

    children: any,
    auth_layout?: type_of_anything,
    no_navigation_drawer?: boolean,
    no_footer?: boolean,
    theme_mode?: type_of_theme_mode
}




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function DYNAMIC___LAYOUT(props: type_of_dynamic_layout_props) {


    const {
        children,
        auth_layout = true,
        no_navigation_drawer = false,
        no_footer = false,
        theme_mode = 'dynamic'
    } = props


    return (

        <>



            <WRAPPER_OF_JSX___STYLED>


                <EVERYTHING_OTHER_THAN_FOOTER___COMPONENT

                    auth_layout={auth_layout}
                    no_navigation_drawer={no_navigation_drawer}
                    content_of_the_whole_application={children}
                />


                {!no_footer &&

                    <Box sx={{ marginTop: '3rem' }}>

                        <DYNAMIC_FOOTER___COMPONENT

                            theme_mode={theme_mode}

                        />

                    </Box>

                }


            </WRAPPER_OF_JSX___STYLED>

        </>

    )

}




/*__________________________________________

 ✅ Styled Components of 
 <DYNAMIC___LAYOUT/>
____________________________________________*/


/* 🥔 */
const WRAPPER_OF_JSX___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} />

)(({ theme }) => `

    min-height: 100vh;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;
`)




