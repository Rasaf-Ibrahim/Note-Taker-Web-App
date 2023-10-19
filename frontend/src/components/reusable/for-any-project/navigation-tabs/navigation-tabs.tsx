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
import { type_of_single_element_jsx } from '@/types/commonly-used-types';


/*__________________________________________

 ✅ Types
____________________________________________*/


type type_of_tab_info = {
    tab_name_jsx: type_of_single_element_jsx
    tab_href: string,
    tab_icon_jsx?: type_of_single_element_jsx
}

type type_of_tab_style = {
    bottom_border_size?: 'short' | 'long' | 'none'
}

type type_of_payload = {
    tabs_info: type_of_tab_info[],
    tab_style?: type_of_tab_style
}



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function NAVIGATION_TABS___REUSABLE(props:type_of_payload) {

    // props
    const { tabs_info, tab_style = {} } = props

    const {
        bottom_border_size = 'long'
    } = tab_style

 
    return (

        <WRAPPER_OF_JSX___STYLED bottom_border_size={bottom_border_size}>

                <ALL_TABS___STYLED bottom_border_size={bottom_border_size}>

                    {tabs_info.map((tab_info)=> {
                        return (
                            
                            <LINK_TAB___CHILD 
                                tab_info={tab_info} 
                                key={tab_info.tab_href}/>
                            
                        )
                    })}

                </ALL_TABS___STYLED>
           
           
        </WRAPPER_OF_JSX___STYLED>

    )
}



/*__________________________________________

 ✅ Child Component
____________________________________________*/

function LINK_TAB___CHILD({ tab_info}: {tab_info: type_of_tab_info}) {

    // theme
    const theme = useTheme()

    // is_active state
    const [is_active, set_is_active] = useState(false)

    const pathname = usePathname()

    useMount(() => {
        if (pathname === tab_info.tab_href) {
            set_is_active(true)
        }
    })


    return (

        <ROUTER_NAVIGATION___COMPONENT href={tab_info.tab_href}>

            <Tab
                label={tab_info.tab_name_jsx}
                wrapped
                icon={tab_info.tab_icon_jsx}
                iconPosition='top'

                sx={{
                    color: is_active ? theme.palette.primary.main : 'inherit',
                    
                    // by default, the opacity is 0.6
                    opacity: is_active ? 1 : 0.6,
                    
                    borderBottom: is_active ? `0.8px solid ${theme.palette.primary.main}` : null,
                }}

            />

        </ROUTER_NAVIGATION___COMPONENT>
    )

}




/*__________________________________________

 ✅ Styled Components
____________________________________________*/


function WRAPPER_OF_JSX___STYLED ({children, bottom_border_size}) {


    const theme = useTheme()


    return (

        <Box sx={{
            display:'flex',
            justifyContent:'center',
           
            ...bottom_border_size === 'long' ? {
                borderBottom: `2px solid ${theme.palette.divider}`
            } : {}
        }}>
            {children}
            
        </Box>

    )
}



function ALL_TABS___STYLED({children, bottom_border_size}) {

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
                    boxShadow: `0px 0px 1px 1px ${theme.palette.divider}`,
                },


                /* changing style of the scroll button's icon*/
                '> .MuiButtonBase-root .MuiSvgIcon-root': {

                    fontSize: '1.5rem'
                },


                /* if the tabs are scrollable, always want the scroll button to be visible even when they are disable */
                '> .MuiTabs-scrollButtons.Mui-disabled': {
                    opacity: 0.3
                },

                ...bottom_border_size === 'short' ? {
                    borderBottom: `2px solid ${theme.palette.divider}`
                } : {}
            }}

        >

           {children}

        </Tabs>
    )
}