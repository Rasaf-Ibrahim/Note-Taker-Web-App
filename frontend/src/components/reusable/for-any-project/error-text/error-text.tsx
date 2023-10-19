/*__________________________________________

 ✅ import
____________________________________________*/

// icon
import ErrorIcon from '@mui/icons-material/Error'


// components
import { Box, Typography } from "@mui/material"



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_error_text_props = {

    error_text: string,
    error_icon_size?: string
    typography?: 'h5'  | 'h6'  | 'body1'  | 'body2'  | 'subtitle1'  | 'subtitle2'
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function ERROR_TEXT___COMPONENT(props:type_of_error_text_props) {

    const {error_text, typography, error_icon_size} = props


    

/*__________________________________________

    ✅ JSX 
____________________________________________*/
    return (

        <Box sx={(theme) => ({
            marginTop: '1rem',

            textAlign: 'center',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
        })}>


            <ErrorIcon sx={(theme) => ({
                color: theme.palette.error.light,
                fontSize: error_icon_size ? error_icon_size :'2rem'
            })} />


            <Typography sx={(theme) => ({
                color: theme.palette.error.main,
            })}
                variant={typography? typography : 'h6'}>
                {error_text}
            </Typography>

           

        </Box>
    )
}



