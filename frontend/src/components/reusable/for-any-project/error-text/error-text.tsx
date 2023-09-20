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
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function ERROR_TEXT___COMPONENT(props:type_of_error_text_props) {

    const {error_text} = props


    

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
                fontSize: '2rem'
            })} />


            <Typography sx={(theme) => ({
                color: theme.palette.error.main,
            })}
                variant='h6'>
                {error_text}
            </Typography>

           

        </Box>
    )
}



