'use client'

// types
import { type_of_anything } from '@/types/commonly-used-types'

// styled-components
import { styled } from '@mui/material/styles';

// components
import { Container, Typography, Box, Divider } from '@mui/material';


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function PRIVACY_POLICY___COMPONENT() {

    return (

        <JSX_WRAPPER___STYLED>

            <Typography variant="h3" component="h1" color='primary.main' align="center" sx={{ marginBottom: '0.7rem' }} >
                Privacy Policy
            </Typography>

            <Box>

                <Typography variant="body1" paragraph align="justify">
                    This privacy policy explains how we collect, use, and protect your personal information when you visit our website or use our services. Please read it carefully and contact us if you have any questions.
                </Typography>

            </Box>

            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center" >
                    What information do we collect?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We collect information that you provide to us when you register, purchase, or contact us. This may include your name, email address, phone number, billing address, and payment information.
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We also collect information that is automatically generated when you use our website or services. This may include your IP address, browser type, device type, operating system, pages viewed, links clicked, and other usage data.
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center">
                    How do we use your information?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We use your information for the following purposes:
                </Typography>

                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>To provide, maintain, and improve our website and services.</li>
                    <li>To process your orders and payments.</li>
                    <li>To communicate with you about your account and transactions.</li>
                    <li>To send you newsletters, promotions, and marketing materials.</li>
                    <li>To personalize your experience and tailor our content to your preferences.</li>
                    <li>To analyze our website traffic and user behavior.</li>
                    <li>To protect our rights and property and prevent fraud and abuse.</li>
                    <li>To comply with legal obligations and enforce our terms and policies.</li>
                </ul>
            </Box>


            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center">
                    How do we share your information?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We do not sell or rent your personal information to third parties. We may share your information with the following categories of recipients:
                </Typography>


                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Service providers that help us operate our website and services, such as hosting, payment processing, analytics, email delivery, etc.</li>
                    <li>Business partners that offer products or services that may be of interest to you.</li>
                    <li>Law enforcement agencies or regulators when required by law or to protect our rights and property.</li>
                    <li>Other parties with your consent or at your direction.</li>
                </ul>

            </Box>


            <Box>

                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center" >
                    How do we protect your information?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We take reasonable measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission or storage is 100% secure and we cannot guarantee the absolute security of your information. You are responsible for keeping your password and account details confidential and for notifying us of any suspected breach of security.
                </Typography>

            </Box>

            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center" >
                    How long do we keep your information?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, unless otherwise required by law. We may also retain some of your information for backup, archival, or audit purposes. When we no longer need your information, we will delete it or anonymize it in accordance with our data retention policy.
                </Typography>

            </Box>


            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center">
                    What are your choices and rights?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    You have the following choices and rights regarding your personal information:
                </Typography>

                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>You can access, update, or delete your account information at any time by logging into your account or contacting us.</li>
                    <li>You can opt out of receiving marketing emails from us by clicking the unsubscribe link in the email or changing your preferences in your account settings.</li>
                    <li>You can request a copy of your personal information that we hold or ask us to correct, update, or erase it by contacting us.</li>
                    <li>You can object to or restrict our processing of your personal information or withdraw your consent at any time by contacting us.</li>
                    <li>You can lodge a complaint with a data protection authority if you are unhappy with how we handle your personal information.</li>
                </ul>

            </Box>


            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center" >
                    How do we use cookies and similar technologies?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We use cookies and similar technologies to collect and store information about your preferences and settings, to enable certain features and functionalities, to measure and analyze how you use our website and services, and to deliver relevant ads. You can manage your cookie preferences in your browser settings or by using our cookie consent tool.
                </Typography>

            </Box>


            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center">
                    How do we update this privacy policy?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    We may update this privacy policy from time to time to reflect changes in our practices, technologies, legal requirements, or other reasons. We will notify you of any material changes by posting the updated policy on our website and indicating the date of revision. Your continued use of our website and services after the updated policy becomes effective constitutes your acceptance of the changes.
                </Typography>
            </Box>


            <Box>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '0.7rem' }} align="center">
                    How do you contact us?
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    If you have any questions or comments about this privacy policy or our privacy practices, please contact us at: rasaf1999@gmail.com
                </Typography>

            </Box>

            <Divider />

            <Box>

                <Typography variant="body2" paragraph align="left">
                    Last update: April 30th, 2023.
                </Typography>

            </Box>



        </JSX_WRAPPER___STYLED>
    );
}




/*__________________________________________

✅ Styled Components for
 <PRIVACY_POLICY___COMPONENT/>
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