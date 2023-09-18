// zustand theme store
import { theme_store } from '@/store/theme-store';


// material UI (MUI)
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// global styles
import GLOBAL_STYLES from '../global-style/global-style'


// importing all the customized theme properties*
import {
    theme_palette_background,
    theme_palette_text,
    theme_palette_primary,
    theme_palette_secondary,
    theme_palette_error,
    theme_palette_warning,
    theme_palette_info,
    theme_palette_success,
    theme_palette_grey,
} from './customized-theme-properties/palette/_palette'

import { theme_typography } from './customized-theme-properties/typography/typography';
import { theme_breakpoints } from './customized-theme-properties/breakpoints/breakpoints';


import { theme_component_button } from './customized-theme-properties/components/button'
import { theme_component_stack } from './customized-theme-properties/components/stack'




/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_mui_theme = {
    force_dark_mode?: boolean
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_THEME___COMPONENT(props: React.PropsWithChildren<type_of_mui_theme>) {

    // 🍪 props
    const { force_dark_mode = false, children } = props


    // 🍪 dark theme or not
    let is_dark

    // if dark mode is forced, use that
    if (force_dark_mode) {

        is_dark = true
    }

    // otherwise, check 'dark_mode' state from 'theme_store'
    else {

        const { dark_mode } = theme_store(state => ({
            dark_mode: state?.theme.dark_mode,
        }))

        is_dark = dark_mode
    }






    //colors
    const theme_palette_primary_obj = theme_palette_primary(is_dark)

    const theme_palette_secondary_obj = theme_palette_secondary(is_dark)

    const theme_palette_error_obj = theme_palette_error(is_dark)

    const theme_palette_warning_obj = theme_palette_warning(is_dark)

    const theme_palette_success_obj = theme_palette_success(is_dark)

    const theme_palette_info_obj = theme_palette_info(is_dark)

    const theme_palette_grey_obj = theme_palette_grey(is_dark)

    // text
    const theme_palette_text_obj = theme_palette_text(is_dark)

    //background
    const theme_palette_background_obj = theme_palette_background(is_dark)


    const theme_breakpoints_obj = theme_breakpoints()


    const theme_typography_obj = theme_typography()


  

    // button
    const theme_component_button_obj = theme_component_button()



   

    // stack
    const theme_component_stack_obj = theme_component_stack()






    const updated_mui_theme_obj = createTheme({


        //spacing, here factor = 1 = 0.5rem = 8px
        spacing: factor => `${0.5 * factor}rem`,

        /*🍪 Breakpoints 🍪 */
        breakpoints: {

            ...theme_breakpoints_obj
        },


        /*🍪 Palette 🍪 */

        palette: {

            mode: is_dark ? 'dark' : 'light',


            // this background object controls the background color of our application
            ...theme_palette_background_obj,


            // primary, secondary, error, warning, success, info
            ...theme_palette_primary_obj,

            ...theme_palette_secondary_obj,

            ...theme_palette_error_obj,

            ...theme_palette_warning_obj,

            ...theme_palette_success_obj,

            ...theme_palette_info_obj,

            // grey
            ...theme_palette_grey_obj,


            // text
            ...theme_palette_text_obj,

        },


        /*🍪 Typography 🍪 */
        typography: {

            ...theme_typography_obj
        },


        components: {

            // button
            ...theme_component_button_obj as any,

            //  stack 
            ...theme_component_stack_obj

        },


    })






    /*__________________________________________
    
     ✅ JSX
    ____________________________________________*/
    return (

        <>


            


            <ThemeProvider theme={updated_mui_theme_obj}>


              

                <GLOBAL_STYLES />
                <CssBaseline>

                    {children}

                </CssBaseline>


            </ThemeProvider>

        </>

    )

}



