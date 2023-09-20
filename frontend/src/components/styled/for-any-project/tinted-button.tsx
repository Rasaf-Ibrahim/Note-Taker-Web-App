
// theme hook
import { useTheme } from '@mui/material/styles'

// types
import { type_of_styled_component_props } from '@/types/commonly-used-types'
import { ButtonProps } from '@mui/material'

// component
import { Button } from '@mui/material'



export default function BUTTON_TINTED___STYLED(props: type_of_styled_component_props<ButtonProps>) {


    // props
    const { sx, children, ...extra_props } = props


    // theme
    const theme = useTheme()


    return (
        <Button
            variant='text'
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0, 0.03)',
                '&:hover': {
                    backgroundColor: 'action.selected'
                },

                ...sx
            }}

            {...extra_props}
        >

            {children}

        </Button>
    )
}