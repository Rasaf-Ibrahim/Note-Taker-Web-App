/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import { useState } from 'react';
import { useMediaQuery } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles';


// type
import { TabProps, TabsProps } from '@mui/material'
import { type_of_anything, type_of_single_element_jsx } from '@/types/commonly-used-types'

// components
import { Box, Tab, Tabs, } from '@mui/material'


/*__________________________________________

 ✅ types
____________________________________________*/

export type type_of_tabs = {
    tab_name_jsx: type_of_single_element_jsx
    tab_icon_jsx?: type_of_single_element_jsx
    component_jsx: type_of_single_element_jsx
}[]


type type_of_variation = {


    mobile: {
        tab_style: 'default' | 'customized'
        tab_position: 'top'
        margin_bottom?: never
        tab_icon_position: 'top' | 'bottom' | 'start' | 'end'
    } | {
        tab_style: 'default' | 'customized'
        tab_position: 'bottom'
        margin_bottom: string
        tab_icon_position: 'top' | 'bottom' | 'start' | 'end'
    }

    desktop: {
        tab_style: 'default' | 'customized'
        tab_position: 'top'
        margin_bottom?: never
        tab_icon_position: 'top' | 'bottom' | 'start' | 'end'
    } | {
        tab_style: 'default' | 'customized'
        tab_position: 'bottom'
        margin_bottom: string
        tab_icon_position: 'top' | 'bottom' | 'start' | 'end'
    }


}


type type_of_desktop_tab_props = {
    tabs: type_of_tabs
    variation: type_of_variation
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function TABS___REUSABLE(props: type_of_desktop_tab_props) {


    // 🍪 props
    const { tabs, variation } = props


    // 🍪 mobile_or_tablet
    const theme = useTheme();
    const mobile_or_tablet = useMediaQuery(theme.breakpoints.down('md'));



    // when we select a tab, the state changes
    const [selected_tab_state, set_selected_tab_state] = useState(0);





    // ✅ TSX

    return (

        <WRAPPER_OF_JSX___STYLED
            is_mobile_or_tablet={mobile_or_tablet}
            tab_variation={variation}>


            <WRAPPER_OF_ALL_TABS___STYLED
                is_mobile_or_tablet={mobile_or_tablet}
                tab_variation={variation}>


                <ALL_TABS___STYLED
                    value={selected_tab_state}
                    onChange={(event, newValue) => {
                        set_selected_tab_state(newValue);
                    }}

                    tab_variation={variation}
                    is_mobile_or_tablet={mobile_or_tablet}
                >


                    {tabs.map((tab) => (

                        // eslint-disable-next-line react/jsx-key
                        <ONE_TAB___STYLED
                            label={tab.tab_name_jsx}
                            icon={tab.tab_icon_jsx}

                            tab_variation={variation}
                            is_mobile_or_tablet={mobile_or_tablet}
                        />

                    ))}


                </ALL_TABS___STYLED>



            </WRAPPER_OF_ALL_TABS___STYLED>




            {/* Content of the tab */}
            <WRAPPER_OF_COMPONENTS___STYLED
                tab_variation={variation}
                is_mobile_or_tablet={mobile_or_tablet}>

                {tabs.map((tab, index) => (

                    selected_tab_state === index && tab.component_jsx

                ))}

            </WRAPPER_OF_COMPONENTS___STYLED>




        </WRAPPER_OF_JSX___STYLED>

    )
}



/*__________________________________________

 ✅ Styled Components  for 
 <TABS___REUSABLE/> component
____________________________________________*/


/* 🥔 */

type type_of_wrapper_of_jsx_props = {

    children: type_of_anything,
    tab_variation: type_of_variation
    is_mobile_or_tablet: boolean
}


function WRAPPER_OF_JSX___STYLED(props: type_of_wrapper_of_jsx_props) {


    const {
        children,
        is_mobile_or_tablet,
        tab_variation
    } = props



    // 🍪 style_for_top_positioned_tabs
    const style_for_top_positioned_tabs = {

        width: '100%',


    }


    // 🍪 style_for_bottom_positioned_tabs
    const style_for_bottom_positioned_tabs = {
        width: '100%',




        /* 
            if position is "bottom", then we need marginBottom.
            
            At position "bottom", the tabs' section will be fixed at the end of the screen, we must have extra margin-bottom so that we can scroll and see the full content of the page.
            
        */
        marginBottom: tab_variation.mobile.margin_bottom
    }





    return (


        <>

            {/* 🍪 mobile or tablet 🍪 */}
            {is_mobile_or_tablet &&

                <>

                    {tab_variation.mobile.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.mobile.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }




            {/* 🍪 laptop or desktop 🍪 */}
            {!is_mobile_or_tablet &&

                <>

                    {tab_variation.desktop.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.desktop.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }



        </>

    )



}







/* 🥔 */

type type_of_wrapper_of_all_tabs_props = {

    children: type_of_anything,
    tab_variation: type_of_variation
    is_mobile_or_tablet: boolean
}

function WRAPPER_OF_ALL_TABS___STYLED(props: type_of_wrapper_of_all_tabs_props) {



    // 🍪 props
    const {
        children,
        is_mobile_or_tablet,
        tab_variation
    } = props


    // 🍪 theme
    const theme: Theme = useTheme()



    // 🍪 style_for_top_positioned_tabs
    const style_for_top_positioned_tabs = {

        borderBottom: `0.1rem solid ${theme.palette.divider}`,

        display: 'flex',
        justifyContent: 'center'

    }


    // 🍪 style_for_bottom_positioned_tabs
    const style_for_bottom_positioned_tabs = {

        /*We want to put the tabs at the bottom of the mobile screen*/

        position: 'fixed',
        bottom: 0,
        zIndex: '999',

        width: '100%',

        backgroundColor: theme.palette.background.variation_1,


        display: 'flex',
        justifyContent: 'center'

    }




    return (


        <>

            {/* 🍪 mobile or tablet 🍪 */}
            {is_mobile_or_tablet &&

                <>

                    {tab_variation.mobile.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.mobile.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }




            {/* 🍪 laptop or desktop 🍪 */}
            {!is_mobile_or_tablet &&

                <>

                    {tab_variation.desktop.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.desktop.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }


        </>

    )


}






/* 🥔 */

type type_of_customized_mui_tabs_props = Required<Pick<TabsProps, 'value' | 'onChange'>>


type type_of_all_tabs_props = {

    children: type_of_anything,
    tab_variation: type_of_variation
    is_mobile_or_tablet: boolean,
} & type_of_customized_mui_tabs_props



function ALL_TABS___STYLED(props: type_of_all_tabs_props) {


    const {
        children,
        is_mobile_or_tablet,
        tab_variation,
        ...mui_tabs_props
    } = props


    const theme = useTheme()


    const css_of_customized_tabs = {


        /* don't want to see the selected tab's indicator */
        '& .MuiTabs-indicator': {
            opacity: 0
        },

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

    }




    return (


        <>

            {/* 🍪 mobile or tablet 🍪 */}
            {is_mobile_or_tablet &&

                <Tabs
                    {...mui_tabs_props}

                    orientation="horizontal"

                    variant="scrollable"
                    allowScrollButtonsMobile

                    textColor="primary"
                    indicatorColor="primary"

                    sx={(theme) => ({

                        ...(tab_variation.mobile.tab_style === 'customized' && css_of_customized_tabs)

                    })}>



                    {children}

                </Tabs>

            }




            {/* 🍪 laptop or desktop 🍪 */}
            {!is_mobile_or_tablet &&

                <Tabs
                    {...mui_tabs_props}

                    orientation="horizontal"

                    variant="scrollable"

                    textColor="primary"
                    indicatorColor="primary"

                    sx={(theme) => ({

                        ...(tab_variation.desktop.tab_style === 'customized' && css_of_customized_tabs)

                    })}>



                    {children}

                </Tabs>
            }


        </>

    )


}






/* 🥔 */

type type_of_customized_mui_tab_props = Required<Pick<TabProps, 'label' | 'icon'>>


type type_of_one_tab_props = {

    tab_variation: type_of_variation
    is_mobile_or_tablet: boolean,

} & type_of_customized_mui_tab_props



function ONE_TAB___STYLED(props: type_of_one_tab_props) {


    //  🍪 props
    const {
        is_mobile_or_tablet,
        tab_variation,
        ...mui_tab_props
    } = props


    // 🍪 theme
    const theme = useTheme()



    // 🍪 css_of_customized_tab
    const css_of_customized_tab = {

        /* changing selected tab's style */
        '&.Mui-selected': {

            backgroundColor: `${theme.palette.primary.dark}`,

            color: `${theme.palette.text.opposite_theme.primary}`
        }


    }



    return (


        <>

            {/* 🍪 mobile or tablet 🍪 */}
            {is_mobile_or_tablet &&

                <Tab
                    {...mui_tab_props}
                    wrapped

                    iconPosition={tab_variation.mobile.tab_icon_position}

                    disableRipple={tab_variation.mobile.tab_style === 'customized' ? true : false}

                    sx={(theme) => ({

                        ...(tab_variation.mobile.tab_style === 'customized' && css_of_customized_tab)

                    })} />

            }




            {/* 🍪 laptop or desktop 🍪 */}
            {!is_mobile_or_tablet &&

                <Tab
                    {...mui_tab_props}

                    iconPosition={tab_variation.desktop.tab_icon_position}

                    disableRipple={tab_variation.desktop.tab_style === 'customized' ? true : false}


                    sx={(theme) => ({

                        ...(tab_variation.desktop.tab_style === 'customized' && css_of_customized_tab)

                    })} />

            }


        </>

    )


}







/* 🥔 */

type type_of_wrapper_of_components_props = {

    children: type_of_anything
    tab_variation: type_of_variation
    is_mobile_or_tablet: boolean

}


function WRAPPER_OF_COMPONENTS___STYLED(props: type_of_wrapper_of_components_props) {


    const {
        children,
        tab_variation,
        is_mobile_or_tablet
    } = props




    // 🍪 style_for_top_positioned_tabs
    const style_for_top_positioned_tabs = {

        marginTop: '1rem',

        display: 'flex',
        justifyContent: 'center'

    }


    // 🍪 style_for_bottom_positioned_tabs
    const style_for_bottom_positioned_tabs = {
        /* no style */
    }





    return (


        <>

            {/* 🍪 mobile or tablet 🍪 */}
            {is_mobile_or_tablet &&

                <>

                    {tab_variation.mobile.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.mobile.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }




            {/* 🍪 laptop or desktop 🍪 */}
            {!is_mobile_or_tablet &&

                <>

                    {tab_variation.desktop.tab_position === 'top' &&

                        <Box sx={(theme) => ({ ...style_for_top_positioned_tabs })}>
                            {children}
                        </Box>

                    }



                    {tab_variation.desktop.tab_position === 'bottom' &&

                        <Box sx={(theme) => ({
                            ...style_for_bottom_positioned_tabs
                        })}>

                            {children}

                        </Box>

                    }


                </>

            }



        </>

    )


}





