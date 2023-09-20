'use client'


/*__________________________________________

 ✅ import 
____________________________________________*/

// hook
import { useEffect, useState } from "react";

// types
import { type_of_anything } from "@/types/commonly-used-types"

// theme_store 
import { theme_store, theme_store_actions } from "@/store/theme-store"


// styled components
import { styled, useTheme } from '@mui/material/styles';


// type
import { Theme } from '@mui/material/styles';


// icon
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';


// components
import { Box, Tooltip, Typography, Button } from "@mui/material"






/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function APPEARANCE___REUSABLE() {


    // theme store
    const { dark_mode, primary_color } = theme_store(state => ({
        dark_mode: state?.theme.dark_mode,
        primary_color: state?.theme.primary_color
    }))


    const [active_color, set_active_color] = useState<string | null>(null)


    useEffect(() => {

        set_active_color(primary_color)

    }, [primary_color])




    return (

        <Box sx={{
            marginTop: '2rem',
            marginBottom: '2rem',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3rem'

        }}>


            <Box>

                <Typography variant="h6" textAlign='center' sx={{ marginBottom: '0.8rem' }}>Select Mode</Typography>

                <SELECT_MODE___CHILD dark_mode={dark_mode} />

            </Box>



            <Box>
                <Typography variant="h6" textAlign='center' sx={{ marginBottom: '0.8rem' }}>Select Color</Typography>

                <SELECT_COLOR___CHILD
                    active_color={active_color}
                />

            </Box>




        </Box>
    )

}




/*__________________________________________

 ✅ Child of 
 <APPEARANCE___REUSABLE/>
____________________________________________*/




/* 🍪 */

function SELECT_MODE___CHILD(props) {

    const { dark_mode } = props

    return (
        <WRAPPER_OF_SELECTION_BOX___STYLED>

            <Tooltip title='Light Mode'>

                <SELECTION_BOX___STYLED
                    onClick={() => theme_store_actions.theme.switch_to_light_mode()}

                    active={dark_mode ? false : true}
                >

                    <WbSunnyIcon sx={{
                        fontSize: '2rem'
                    }} />

                </SELECTION_BOX___STYLED>

            </Tooltip>



            <Tooltip title='Dark Mode'>

                <SELECTION_BOX___STYLED
                    onClick={() => theme_store_actions.theme.switch_to_dark_mode()}

                    active={dark_mode ? true : false}>

                    <DarkModeIcon sx={{
                        fontSize: '2rem'
                    }} />

                </SELECTION_BOX___STYLED>

            </Tooltip>

        </WRAPPER_OF_SELECTION_BOX___STYLED>
    )

}














/*  🍪 */

function SELECT_COLOR___CHILD(props) {


    // props
    const { active_color } = props


    // theme
    const theme = useTheme()


    // all color array
    const all_color_array: type_of_anything = [

        {
            name: 'red',
            label: 'Red',
            light_color: 'hsl(14, 60%, 84%)',
            dark_color: 'hsl(14, 40%, 15%)'
        },


        {
            name: 'amber',
            label: 'Amber',
            light_color: 'hsl(45, 60%, 84%)',
            dark_color: 'hsl(45, 40%, 15%)'
        },


        {
            name: 'light_green',
            label: 'Light Green',
            light_color: 'hsl(88, 60%, 84%)',
            dark_color: 'hsl(88, 40%, 15%)'
        },


        {
            name: 'cyan',
            label: 'Cyan',
            light_color: 'hsl(187, 60%, 84%)',
            dark_color: 'hsl(187, 40%, 15%)'
        },



        {
            name: 'indigo',
            label: 'Indigo',
            light_color: 'hsl(262, 60%, 84%)',
            dark_color: 'hsl(262, 40%, 15%)'
        },

    ]


    return (

        <WRAPPER_OF_SELECTION_BOX___STYLED>


            {all_color_array.map((color: type_of_anything) => (

                <Tooltip title={color.label} key={color.name}>

                    <SELECTION_BOX___STYLED
                        onClick={() => theme_store_actions.theme.update_primary_color(color.name)}

                        active={active_color === color.name ? true : false}
                    >

                        <CIRCLE___STYLED
                            color={`${theme.palette.mode === 'dark' ? color.light_color : color.dark_color}`}

                            active={active_color === color.name ? true : false}
                        />

                    </SELECTION_BOX___STYLED>

                </Tooltip>

            ))}



        </WRAPPER_OF_SELECTION_BOX___STYLED>

    )
}










/*__________________________________________

 ✅ Styled Components for  
Multiple Components
____________________________________________*/

/* 🍪 */


const WRAPPER_OF_SELECTION_BOX___STYLED = styled(Box)
    (({ theme }) => `

    padding:2rem;

    display:flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap; 
    gap:2rem; 
`)

/* 🍪 */


type type_of_color_selection_box = {
    active: boolean,
    theme?: Theme
}

const SELECTION_BOX___STYLED = styled(Button, {

    // Configure which props should be forwarded on DOM
    shouldForwardProp: (prop: type_of_anything) => prop !== 'active'

})
    (({ active, theme }: type_of_color_selection_box) => `


    width: 6rem;
    height: 5rem;  
   
    background-color: ${active ? (theme.palette.mode === 'dark' ? theme.palette.background.variation_1 : theme.palette.background.variation_2) : 'none'};

    border: 0.05rem solid ${theme.palette.divider};
    
`)



/*__________________________________________

 ✅ Styled Components for 
 <SELECT_COLOR___CHILD/>
____________________________________________*/

/* 🍪 */

type type_of_circle = {
    color: string,
    active: boolean,
    theme?: Theme
}

const CIRCLE___STYLED = styled(Box, {

    // Configure which props should be forwarded on DOM
    shouldForwardProp: (prop: type_of_anything) => prop !== 'color' && prop !== 'active'

})
    (({ color, active, theme }: type_of_circle) => `


   background-color: ${color};
    
   width: ${active ? '2.3rem' : '1.7rem'};
   height: ${active ? '2.3rem' : '1.7rem'};
   border-radius: 50%;
 
`)