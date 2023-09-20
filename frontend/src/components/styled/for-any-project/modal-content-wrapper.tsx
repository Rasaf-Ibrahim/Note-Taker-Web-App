import Box, { BoxProps } from '@mui/material/Box'
import { type_of_styled_component_props } from '@/types/commonly-used-types';



export default function MODAL_CONTENT_WRAPPER___STYLED(props: type_of_styled_component_props<BoxProps>) {

    const { sx, children, ...extra_props } = props

    return (

        <Box sx={{
            minHeight: '10rem',
            minWidth: '15rem',

            paddingTop: '2rem',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',

            ...sx
        }}

            {...extra_props}

        >

            {children}

        </Box>

    )
}
