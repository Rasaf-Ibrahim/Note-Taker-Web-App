// react
import React from 'react';

// hook
import { useTheme } from '@mui/material/styles';

// components
import { Box, BoxProps } from '@mui/material'


import { type_of_styled_component_props } from '@/types/commonly-used-types';


export default function SIGN_IN_OR_UP_FORM_CONTAINER___STYLED(props: type_of_styled_component_props<BoxProps>) {

    const { sx, children, ...extra_props } = props

    const theme = useTheme()

    return (

        <Box
            sx={{
                marginTop: '2rem',
                marginBottom: '2rem',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >


            <Box
                sx={{

                    width: { xs: '18rem', sm: '20rem', md: '22rem', lg: '24rem' },

                    /*when the width is increasing 2, we need to increase the padding the padding 1 because padding has right and left. */
                    paddingRight: { xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem' },
                    paddingLeft: { xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem' },
                    paddingTop: '1rem',
                    paddingBottom: '1rem',

                    backgroundColor: theme.palette.background.variation_1,
                    boxShadow: '5px 5px 2px 0px',

                    borderRadius: '1rem',


                    /* Button's size is getting changed while toggling the email form if we use display:'grid' instead of display:'flex' & flex-direction:'column' */
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '1.2rem',


                    ...sx
                }}

                {...extra_props}
            >

                {children}

            </Box>

        </Box>
    )
}


