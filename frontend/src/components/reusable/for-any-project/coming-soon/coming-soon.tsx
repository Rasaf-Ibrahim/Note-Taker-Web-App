/*__________________________________________

 ✅ import
____________________________________________*/
// components
import CONTAINER___STYLED from '@/components/styled/for-any-project/container';
import { Typography, Box } from '@mui/material';



/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function COMING_SOON___REUSABLE() {

    return (

        <CONTAINER___STYLED

            elevation={{ light: { value: 4 }, dark: { value: 4 } }}

            background_color={{ light: 0, dark: 0 }}

            sx={{
                /* Layout */
                width: { xs: '16rem', sm: '22rem', md: '28rem', lg: '34rem' },

                padding: '2rem',

                /* Centering Content */
                position: 'absolute',
                top: '40%', //not fully centered
                left: '50%',
                transform: 'translate(-50%, -50%)',


                /* Child Layout */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '2rem'
            }}>


            <Typography variant="h4">
                Coming Soon
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1">Stay tuned for updates and thank you for your patience.</Typography>
            </Box>

        </CONTAINER___STYLED>


    )
}