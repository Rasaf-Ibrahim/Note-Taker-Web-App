import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';



export default function GLOBAL_STYLES() {

    const theme = useTheme()
    

    return (
        <>
            <GlobalStyles styles={{

                '*': {

       
                    /*  'margin:0' is needed so that when I use html tag in the MUI's Box component, <Box component='p'> </Box>, then extra margin from the html tag don't get added on the ui. */
                    margin: 0,
                    padding: 0,


                    /* Custom Scroll Bar for Firefox */ 
                    scrollbarWidth: 'auto',
                    scrollbarColor: `${theme.palette.text.disabled} ${theme.palette.background.variation_1}`,
                
                },


                /* Custom Scroll Bar for Webkit browsers (Chrome, Safari, etc.) */

                '*::-webkit-scrollbar': {
                    width: '6px',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.text.disabled,
                    borderRadius: '2px',
                },
                '*::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.background.variation_1,
                },


                body: {

                    /* By setting overflow-y: scroll, we ensure that the scrollbar is always present, whether the content overflows the vertical viewport or not. */
                    overflowY: 'scroll',
                }


            }} />
         
        </>
    );
}
