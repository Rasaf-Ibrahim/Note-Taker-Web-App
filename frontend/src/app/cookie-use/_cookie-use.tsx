'use client'

/*__________________________________________

 ✅ import
____________________________________________*/
// types
import { type_of_anything } from '@/types/commonly-used-types'

// styled-components
import { styled } from '@mui/material/styles';

// components
import { Container, Typography, Box, Divider } from '@mui/material';


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function COOKIE_USE___COMPONENT() {

    return (

        <JSX_WRAPPER___STYLED maxWidth="md">

            <Typography variant="h3" component="h1" color='primary.main' align="center" sx={{ marginBottom: '0.7rem' }} >
                Cookie Use Policy
            </Typography>

            <Typography variant="body1" paragraph align="justify">
                We value your privacy and want to be transparent about the cookies we use. This policy outlines how and why we use cookies on our website.
            </Typography>

            <Typography variant="body1" paragraph align="justify">
                Currently, we use cookies primarily for authentication purposes. This ensures that our users have a seamless experience when navigating our website.
            </Typography>

            <Box>

                <Typography variant="h5" component="h2" align="center" sx={{ marginBottom: '0.7rem' }}>
                    How We Use Cookies
                </Typography>

                <Typography variant="body1" paragraph align="justify">

                    <ul style={{ paddingLeft: '0.7rem' }}>

                        <li>
                            Authentication: Cookies help us identify and verify users. This ensures that you remain logged in as you navigate through our website.
                        </li>
                        <li>
                            Future Improvements: We may, in the future, use cookies to provide personalized recommendations to enhance your user experience. Rest assured, these will be non-intrusive and aimed at improving your experience on our platform.
                        </li>
                        <li>
                            Security: Cookies play a role in our security protocols, ensuring that unauthorized parties don't gain access to your information.
                        </li>
                        <li>
                            Preferences: While not currently in use, we may in the future use cookies to remember user preferences and settings.
                        </li>
                    </ul>

                </Typography>

            </Box>

            <Typography variant="body1" paragraph align="justify">
                If you have any questions about our cookie use policy, please contact us at rasaf1999@gmail.com
            </Typography>

            <Divider />

            <Box>

                <Typography variant="body2" paragraph align="left">
                    Last update: August 28th, 2023.
                </Typography>

            </Box>

        </JSX_WRAPPER___STYLED>
    )
}

/*__________________________________________

 ✅ Styled Components of 
 <COOKIE_USE___COMPONENT/>
____________________________________________*/

const JSX_WRAPPER___STYLED = styled((props:type_of_anything) =>

    <Container {...props} maxWidth="sm" />

)(({ theme }) => `

    ${/* layout */ ''}
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;

    ${/* child layout */ ''}
    display: flex;
    flex-direction: column;
    gap:2rem;
`)
