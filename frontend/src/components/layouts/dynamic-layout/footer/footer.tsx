// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// config
import config_obj from '@/config';

// date-fns
import { format } from 'date-fns'

// style

import { styled } from "@mui/material/styles";

// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation';

// utils
import css_media_queries from '@/styles/css-utils/media-queries';

// data
import { footer_data } from './_footer-data';



// type
import { type_of_theme_mode } from '../dynamic-layout';


// components
import { Box, Typography } from "@mui/material";
import CONTAINER___STYLED from '@/components/styled/for-any-project/container';


/*__________________________________________

 ✅ types
____________________________________________*/


type type_of_dynamic_footer_props = {
    theme_mode: type_of_theme_mode
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function DYNAMIC_FOOTER___COMPONENT(props: type_of_dynamic_footer_props) {


    // 🍪 props
    const {
        theme_mode,
    } = props



    return (

        <CONTAINER___STYLED

            elevation={{
                light: { value: 4 },
                dark: { value: 4 },
            }}
            background_color={{ light: 1, dark: 1 }}
        >

            {Object.keys(footer_data).length !== 0 ?

                <FOOTER_HAS_CONTENT___CHILD />

                :

                <FOOTER_HAS_NO_CONTENT___CHILD />

            }

        </CONTAINER___STYLED>

    )
}





/*__________________________________________
 ✅ Sections of 
 <FOOTER_1___COMPONENT/> 
____________________________________________*/

/* 🍪 */
function FOOTER_HAS_CONTENT___CHILD() {

    return (
        <WRAPPER_OF_FOOTER___STYLED>

            <FOOTER_TOP___CHILD />

            <FOOTER_BOTTOM___CHILD />

        </WRAPPER_OF_FOOTER___STYLED>
    )
}


/* 🍪 */
function FOOTER_HAS_NO_CONTENT___CHILD() {

    //current year
    const year = format(new Date(), 'yyyy');


    return (

        <Box sx={(theme) => ({
            padding: '2rem',
        })}>


            <Typography variant='body2' sx={{ textAlign: 'center' }}>

                &copy; Copyright {` ${year}`} {config_obj.about_the_site.name} | All Rights Reserved

            </Typography>


        </Box>
    )
}




/*__________________________________________
 ✅ Sections of
  <FOOTER_HAS_CONTENT___CHILD/> 
____________________________________________*/


/* 🍪 */
function FOOTER_TOP___CHILD() {


    return (

        <WRAPPER_OF_FOOTER_TOP___STYLED>


            {/* Every section is optional, depending on the 'footer_data' object */}

            {footer_data?.basic &&

                <SITE_INFO___CHILD />
            }


            {footer_data?.groups_of_link &&

                <GROUPS_OF_LINK___CHILD />
            }


            {footer_data?.social_accounts &&

                <SOCIAL_ICONS___CHILD />
            }


            {footer_data?.payment_methods_img_src &&

                <PAYMENT_METHODS___CHILD />
            }

        </WRAPPER_OF_FOOTER_TOP___STYLED>

    )
}



/* 🍪 */
function FOOTER_BOTTOM___CHILD() {

    //current year
    const year = format(new Date(), 'yyyy');


    return (

        <Box sx={(theme) => ({
            marginTop: '2rem',
            paddingTop: '2rem',

            borderTop: `2px solid ${theme.palette.divider}`,
        })}>


            <Typography variant='body2' sx={{ textAlign: 'center' }}>

                &copy; Copyright {` ${year}`} {config_obj.about_the_site.name} | All Rights Reserved

            </Typography>


        </Box>
    )
}





/*__________________________________________

 ✅ Sections of 
 <FOOTER_TOP___CHILD/> 
____________________________________________*/


/* 🍪 */
function SITE_INFO___CHILD() {

    return (


        <WRAPPER_OF_SITE_INFO___STYLED>

            {/* logo component */}
            {footer_data?.basic?.logo_component &&

                <Box sx={{ alignSelf: 'center' }}>
                    <footer_data.basic.logo_component />
                </Box>

            }


            {/* about */}
            {footer_data?.basic?.about &&

                <Typography variant='body2' sx={{ textAlign: 'justify', textAlignLast: 'center' }}>
                    {footer_data.basic.about}
                </Typography>
            }


            {/* address */}
            {footer_data?.basic?.address &&

                <Typography variant='body2' sx={{ textAlign: 'justify' }}>
                    Address: {footer_data.basic.address}
                </Typography>
            }



            {/* helpline */}
            {footer_data?.basic?.helpline &&

                <Typography variant='body2' sx={{ textAlign: 'justify' }}>
                    Helpline: {footer_data.basic.helpline}
                </Typography>
            }


            {/* available */}
            {footer_data?.basic?.available &&

                <Typography variant='body2' sx={{ textAlign: 'justify' }}>
                    Available: {footer_data.basic.available}
                </Typography>
            }



        </WRAPPER_OF_SITE_INFO___STYLED>



    )
}




/* 🍪 */

function GROUPS_OF_LINK___CHILD() {

    return (

        <>

            {footer_data.groups_of_link.map((group) => (

                <WRAPPER_OF_TITLE_AND_LINKS___STYLED key={group.title}>

                    {/* group title */}
                    <FOOTER_SUB_TITLE___STYLED>
                        {group.title}
                    </FOOTER_SUB_TITLE___STYLED>


                    <WRAPPER_OF_LINKS___STYLED>

                        {/*  all the links of a group */}
                        {group.links.map((link) => (

                            <ROUTER_NAVIGATION___COMPONENT href={link.url} key={link.text}>

                                <Typography variant='body2' sx={{
                                    "&:hover": {
                                        color: "primary.light",
                                    }
                                }}>
                                    {link.text}
                                </Typography>

                            </ROUTER_NAVIGATION___COMPONENT>
                        ))}

                    </WRAPPER_OF_LINKS___STYLED>

                </WRAPPER_OF_TITLE_AND_LINKS___STYLED>
            ))}

        </>
    )

}



/* 🍪 */
function SOCIAL_ICONS___CHILD() {

    return (

        <Box>

            <FOOTER_SUB_TITLE___STYLED>
                Follow Us
            </FOOTER_SUB_TITLE___STYLED>

            <SOCIAL_ICONS___STYLED>

                {footer_data.social_accounts.map((account) => (

                    <ROUTER_NAVIGATION___COMPONENT href={account.link} key={account.link}>
                        {<account.ICON_COMPONENT />}
                    </ROUTER_NAVIGATION___COMPONENT>
                ))}

            </SOCIAL_ICONS___STYLED>

        </Box>

    )
}




/* 🍪 */
function PAYMENT_METHODS___CHILD() {

    return (

        <Box>

            <FOOTER_SUB_TITLE___STYLED>
                Payment Methods
            </FOOTER_SUB_TITLE___STYLED>

            <WRAPPER_OF_PAYMENT_METHODS___STYLED  >

                {footer_data.payment_methods_img_src.map((src) => (


                    <img height="30" src={src} alt='payment_method' key={src} />

                ))}

            </WRAPPER_OF_PAYMENT_METHODS___STYLED>

        </Box>
    )
}








/*__________________________________________

✅ Styled Components for Multiple Components
____________________________________________*/

/* 🍪 

The following styled component will be used as the root component for some other styled components
*/

const COLUMN_CONTAINER___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box {...props} />

)(({ theme }) => `

    ${/* size */''} 
    max-width: 18rem;

`)


/* 🍪 */

const FOOTER_SUB_TITLE___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Typography {...props} variant='body1' />

)(({ theme }) => `
    
     text-align:center;
    font-weight:500;
    margin-bottom: 1.1rem;

`)






/*__________________________________________

✅ Styled Components for
 'FOOTER_HAS_CONTENT___CHILD' Component
____________________________________________*/



/* 🍪 */

const WRAPPER_OF_FOOTER___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box {...props} />

)(({ theme }) => `


   ${/* spacing */''}
   padding:2rem;

   ${css_media_queries.name_xs_sm_md_lg_xl('paddingRight', '1.5rem', '2rem', '2.5rem', '3rem', '3.5rem')};

   ${css_media_queries.name_xs_sm_md_lg_xl('paddingLeft', '1.5rem', '2rem', '2.5rem', '3rem', '3.5rem')};

`)




/*__________________________________________
✅ Styled Components for
 'FOOTER_TOP___CHILD' Component
____________________________________________*/


/* 🍪 */

const WRAPPER_OF_FOOTER_TOP___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box {...props} />

)(({ theme }) => `

    ${/* layout */''}
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;

   ${css_media_queries.name_xs_sm_md_lg_xl('justify-content', 'center', 'center', 'space-between', 'space-around', 'space-around')};

`)







/*__________________________________________
✅ Styled Components for
 'SITE_INFO___CHILD' Component
____________________________________________*/



/* 🍪 */

const WRAPPER_OF_SITE_INFO___STYLED = styled((props: type_of_obj_with_any_values) =>

    <COLUMN_CONTAINER___STYLED {...props} />

)(({ theme }) => `


    ${/* layout */''}
    display:flex;
    flex-direction:column;
    gap:1.5rem;

 


        
`)



/* 🍪 */

const SOCIAL_ICONS___STYLED = styled((props: type_of_obj_with_any_values) =>

    <COLUMN_CONTAINER___STYLED {...props} />

)(({ theme }) => `

    ${/* targeting child icons and styling */''}
    & .MuiSvgIcon-root {

        font-size: 1.5rem;

        &:hover {
            color: ${theme.palette.primary.main};
            cursor:pointer;
        }
    }


    ${/* layout */''}
    display: flex;
    gap: 0.8rem;

`)




/*__________________________________________
✅ Styled Components for
 'GROUPS_OF_LINK___CHILD' Component
____________________________________________*/


/* 🍪 */

const WRAPPER_OF_TITLE_AND_LINKS___STYLED = styled((props: type_of_obj_with_any_values) =>

    <COLUMN_CONTAINER___STYLED {...props} />

)(({ theme }) => `


    ${/* layout */''}
    display: flex;
    flex-direction: column;
    text-align: center;
`)




/* 🍪 */

const WRAPPER_OF_LINKS___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box {...props} />

)(({ theme }) => `


    ${/* layout */''}
    display: flex;
    flex-direction: column;
    gap:0.2rem;
    text-align: center;
`)









/*__________________________________________

✅ Styled Components for 
'PAYMENT_METHODS___CHILD' Component
____________________________________________*/


/* 🍪 */

const WRAPPER_OF_PAYMENT_METHODS___STYLED = styled((props: type_of_obj_with_any_values) =>

    <COLUMN_CONTAINER___STYLED {...props} />

)(({ theme }) => `


    ${/* layout */''}
    display:flex;
    gap:0.8rem;
    flex-wrap:wrap;
        
`)