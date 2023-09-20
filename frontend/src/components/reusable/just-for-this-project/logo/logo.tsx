'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config";


// zustand store
import { auth_store } from "@/store/auth-store"


// useTheme hook
import { useTheme } from '@mui/material/styles';


// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'


// components
import { Box, Typography } from '@mui/material'



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_logo_props = {
    background_is_always_light?: boolean,
    background_is_always_dark?: boolean,
    background_has_opposite_theme_color?: boolean
}



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function LOGO___COMPONENT(props: type_of_logo_props) {

    // props
    const {
        background_is_always_light = false,
        background_is_always_dark = false,
        background_has_opposite_theme_color = false
    } = props


    // useTheme
    const theme = useTheme()


    // color_based_on_props
    const color_based_on_props = () => {

        if (!background_is_always_light && !background_is_always_dark && !background_has_opposite_theme_color) {

            return theme.palette.primary.main
        }

        else if (background_is_always_light) {

            return theme.palette.primary.static_variant.dark_1
        }

        else if (background_is_always_dark) {

            return theme.palette.primary.static_variant.light_1
        }

        else if (background_has_opposite_theme_color) {

            return theme.palette.primary.opposite_theme.main
        }
    }


    // get the user state properties 
    const { user_info, user_state } = auth_store(state => ({
        user_info: state?.user_info,
        user_state: state?.user_state
    }))



    // navigate to home
    const navigate_to_home = () => {

        if (user_state.signed_in_or_up && user_info.is_email_verified) {

            return config_obj.page_path.home_after_login
        }

        else {
            return config_obj.page_path.home_before_login
        }

    }


    // TSX
    return (

        <ROUTER_NAVIGATION___COMPONENT href={navigate_to_home()}>

            <Box sx={{

                // layout 
                padding: '0.3rem',

                // appearance
                borderRadius: '0.3rem',
                boxShadow: `0px 0px 5px 2px ${color_based_on_props()}`,

                // child layout
                display: 'flex',
                gap: '0.2rem'
            }}>


                <Box sx={{
                    fontFamily: "'Lobster Two', 'cursive'",
                    fontSize: '11px',
                    lineHeight: '0.7'
                }}>

                    <Box>Rasaf's</Box>
                    <Box>&nbsp; Project</Box>

                </Box>


                <Typography
                    variant='body1'
                    sx={{ fontFamily: "'Lobster Two', 'cursive'" }}>

                    Note Taker
                </Typography>


            </Box>

        </ROUTER_NAVIGATION___COMPONENT>
    )
}






