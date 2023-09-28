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
export default function TERMS_OF_SERVICE___COMPONENT() {

    return (

        <JSX_WRAPPER___STYLED maxWidth="md">


            <Typography variant="h3" component="h1" color='primary.main' align="center" sx={{ marginBottom: '0.7rem' }} >
                Terms of Service
            </Typography>


            <Typography variant="body1" paragraph align="justify">
                Welcome to our website. If you continue to browse and use this website,
                you are agreeing to comply with and be bound by the following terms and
                conditions of use, which together with our privacy policy govern our
                relationship with you in relation to this website. If you disagree with
                any part of these terms and conditions, please do not use our website.
            </Typography>


            <Typography variant="body1" paragraph align="justify">
                The term 'us' or 'we' refers to the owner of the website. The term 'you'
                refers to the user or viewer of our website.
            </Typography>

            <Box>

                <Typography variant="h5" component="h2" align="center" sx={{ marginBottom: '0.7rem' }}>
                    The use of this website is subject to the following terms of use
                </Typography>

                <Typography variant="body1" paragraph align="justify">

                    <ul style={{ paddingLeft: '0.7rem' }}>

                        <li>
                            The content of the pages of this website is for your general
                            information and use only. It is subject to change without notice.
                        </li>
                        <li>
                            This website uses cookies to monitor browsing preferences. If you do
                            allow cookies to be used, some basic personal information may be stored by us for use by third parties.
                        </li>
                        <li>
                            Neither we nor any third parties provide any warranty or guarantee as
                            to the accuracy, timeliness, performance, completeness or suitability
                            of the information and materials found or offered on this website for
                            any particular purpose. You acknowledge that such information and
                            materials may contain inaccuracies or errors and we expressly exclude
                            liability for any such inaccuracies or errors to the fullest extent
                            permitted by law.
                        </li>
                        <li>
                            Your use of any information or materials on this website is entirely
                            at your own risk, for which we shall not be liable. It shall be your
                            own responsibility to ensure that any products, services or
                            information available through this website meet your specific
                            requirements.
                        </li>
                        <li>
                            This website contains material which is owned by or licensed to us.
                            This material includes, but is not limited to, the design, layout,
                            look, appearance and graphics. Reproduction is prohibited other than
                            in accordance with the copyright notice, which forms part of these
                            terms and conditions.
                        </li>
                        <li>
                            All trademarks reproduced in this website, which are not the property
                            of, or licensed to the operator, are acknowledged on the website.
                        </li>
                        <li>
                            Unauthorized use of this website may give rise to a claim for damages
                            and/or be a criminal offense.
                        </li>
                        <li>
                            From time to time, this website may also include links to other
                            websites. These links are provided for your convenience to provide
                            further information. They do not signify that we endorse the
                            website(s). We have no responsibility for the content of the linked
                            website(s).
                        </li>
                        <li>
                            Your use of this website and any dispute arising out of such use of
                            the website is subject to the laws of Bangladesh.
                        </li>
                    </ul>

                </Typography>

            </Box>

            <Typography variant="body1" paragraph align="justify">
                If you have any questions about these terms of service, please contact us at rasaf1999@gmail.com
            </Typography>


            <Divider />

            <Box>

                <Typography variant="body2" paragraph align="left">
                    Last update: April 30th, 2023.
                </Typography>

            </Box>


        </JSX_WRAPPER___STYLED>
    )
}



/*__________________________________________

 ✅ Styled Components of 
 <TERMS_OF_SERVICE___COMPONENT/>
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