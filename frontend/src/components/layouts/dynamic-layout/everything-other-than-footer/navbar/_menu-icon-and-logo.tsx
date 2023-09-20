/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_func_prop_with_no_rule } from '@/types/commonly-used-types'

// icon
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// components
import { Box, IconButton } from "@mui/material"
import LOGO___COMPONENT from "@/components/reusable/just-for-this-project/logo/logo";



/*__________________________________________

 ✅ types
____________________________________________*/


type type_of_menu_icon_and_logo = {
    no_menu_icon: boolean,
    handle_drawer_open: type_of_func_prop_with_no_rule,
}


/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function MENU_ICON_AND_LOGO___COMPONENT(props: type_of_menu_icon_and_logo) {

    const {
        no_menu_icon,
        handle_drawer_open,
    } = props



    return (

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}>


            {/* Only show navigation drawer opening button if "no_menu_icon" is false  */}
            {!no_menu_icon &&

                <IconButton
                    onClick={handle_drawer_open}
                    sx={{ fontSize: '2rem', color: 'inherit' }}>

                    <MenuOutlinedIcon />

                </IconButton>

            }


            {/* logo and title */}
            <LOGO___COMPONENT />

        </Box>

    )

}
