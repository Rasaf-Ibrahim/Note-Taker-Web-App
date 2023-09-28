'use client'

/*__________________________________________

 ✅ import 
____________________________________________*/

// styled-components
import { styled } from '@mui/material/styles';

// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation';

// components
import { Button } from '@mui/material';
import SVG_404___COMPONENT from './__svg-404'



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function NOT_FOUND___COMPONENT() {




    return (


        <WRAPPER_OF_JSX___STYLED>


            <SVG_404___COMPONENT
                background_is_always_light={false}
                background_is_always_dark={false}
                background_has_opposite_theme_color=
                {false}
            />




            {/* 🚀 
                As of May, 2023, Link Component is not working on the not-found.tsx page.

                So, we are temporarily using <a/> tag in the not-found.tsx page

                https://github.com/vercel/next.js/issues/49812
            */}
            <a href='/'
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                }}>

                <Button variant='outlined' size='large'>Back to Home
                </Button>

            </a>




        </WRAPPER_OF_JSX___STYLED>


    )
}




/*__________________________________________

✅ Styled Components for 
<NOT_FOUND___COMPONENT/>
____________________________________________*/

/* 🥔 */
const WRAPPER_OF_JSX___STYLED = styled('div')

    (({ theme }) => `

    min-height: 100vh; 

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center; 
    gap: 2.5rem; 
`)
