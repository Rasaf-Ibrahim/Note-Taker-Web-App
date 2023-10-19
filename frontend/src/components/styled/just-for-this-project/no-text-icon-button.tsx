/*__________________________________________

 ✅ import
____________________________________________*/

// polished
import { lighten, darken  } from 'polished'


// theme hook
import { useTheme } from '@mui/material/styles'

// components
import { IconButton, Tooltip } from "@mui/material"


/*__________________________________________

 ✅ Styled Component
____________________________________________*/

export default function NO_TEXT_ICON_BUTTON___STYLED({children, tooltip_title, ...props}) {

    const theme = useTheme()

    return (

        <Tooltip title={tooltip_title}>

            <IconButton  
                sx={{
                    color: theme.palette.mode == 'dark' ? darken(0.1, theme.palette.text.primary) : lighten(0.1, theme.palette.text.primary)
                }}
                {...props}
            >
                {children}
            </IconButton>

        </Tooltip>
    )

}