

// icons
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// components
import { Box, IconButton } from '@mui/material'
import LOGO___COMPONENT from '@/components/reusable/just-for-this-project/logo/logo'



export default function DRAWER_TOP_SECTION___COMPONENT({
    handle_drawer_close,
    navbar_height,
}) {

    return (

        <Box sx={(theme) => ({

            /* layout */
            height: `${navbar_height}`,

            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.5rem',

            /* appearance */
            borderBottom: `2px solid ${theme.palette.divider}`,

            /* child layout */
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        })}>



            <IconButton
                onClick={handle_drawer_close}
                sx={{ fontSize: '2rem', color: 'inherit' }}>

                <MenuOutlinedIcon />

            </IconButton>



            {/* logo and title */}
            <LOGO___COMPONENT />

        </Box>

    )

}
