'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import { useState } from 'react'
import { useMount } from 'react-use'
import { usePathname } from 'next/navigation'
import { useTheme } from '@mui/material/styles';

// router navigation
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'

// components
import { Box, Tabs, Tab, Divider } from '@mui/material';


/*__________________________________________

 ✅ Types
____________________________________________*/


type type_of_tabs_info = {
    label: string
    href: string
}[]


type type_of_payload = {
    tabs_info: type_of_tabs_info
}




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function NAVIGATION_TABS___REUSABLE(props:type_of_payload) {

    // props
    const { tabs_info } = props


    return (

        <WRAPPER_OF_JSX___STYLED>

            <Box>

                <ALL_TABS___STYLED>

                    {tabs_info.map((tab)=> {
                        return (
                            
                            <LINK_TAB___CHILD label={tab.label} href={tab.href} key={tab.href}/>
                            
                        )
                    })}

                </ALL_TABS___STYLED>

                <Divider/>

            </Box>
           
        </WRAPPER_OF_JSX___STYLED>

    )
}



/*__________________________________________

 ✅ Child Component
____________________________________________*/

function LINK_TAB___CHILD({ label, href }) {

    // theme
    const theme = useTheme()

    // is_active state
    const [is_active, set_is_active] = useState(false)

    const pathname = usePathname()

    useMount(() => {
        if (pathname === href) {
            set_is_active(true)
        }
    })


    return (

        <ROUTER_NAVIGATION___COMPONENT href={href}>

            <Tab
                label={label}

                sx={{
                    color: is_active ? theme.palette.primary.main : 'inherit',
                    
                    borderBottom: is_active ? `0.8px solid ${theme.palette.primary.main}` : null,

                    // by default, the opacity is 0.6
                    opacity: 1
                }}

            />

        </ROUTER_NAVIGATION___COMPONENT>
    )

}




/*__________________________________________

 ✅ Styled Components
____________________________________________*/


function WRAPPER_OF_JSX___STYLED ({children}) {

    return (

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width:'100%' 
        }}>
            {children}
        </Box>

    )
}



function ALL_TABS___STYLED({children}) {

    // theme
    const theme = useTheme()


    return (

        <Tabs
            orientation="horizontal"
            variant="scrollable"
            allowScrollButtonsMobile
            textColor="primary"
            sx={{

                /* changing some styles of the scroll buttons */
                '> .MuiTabs-scrollButtons': {

                    paddingRight: '0.2rem',
                    paddingLeft: '0.2rem',

                    /* very minimal box-shadow, it work like left and right border */
                    boxShadow: `0px 0px 1px 1px ${theme.palette.divider}`

                },


                /* changing style of the scroll button's icon*/
                '> .MuiButtonBase-root .MuiSvgIcon-root': {

                    fontSize: '1.5rem'
                },


                /* if the tabs are scrollable, always want the scroll button to be visible even when they are disable */
                '> .MuiTabs-scrollButtons.Mui-disabled': {
                    opacity: 0.3
                }
            }}

        >

           {children}

        </Tabs>
    )
}