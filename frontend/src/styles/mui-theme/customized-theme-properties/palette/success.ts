import { teal } from '@mui/material/colors';


export function theme_palette_success(darkModeVariable) {

     

    return {

        success: {


            light: darkModeVariable ? teal[50] : teal[600],
            main: darkModeVariable ? teal[100] : teal[700],
            dark: darkModeVariable ? teal[200] : teal[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            opposite_theme: {

                light: darkModeVariable ? teal[600] : teal[50],
                main: darkModeVariable ? teal[700] : teal[100],
                dark: darkModeVariable ? teal[800] : teal[200],
                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },


            static_variant: {

                light_1: teal[50],
                light_2: teal[100],
                light_3: teal[200],

                dark_1: teal[800],
                dark_2: teal[700],
                dark_3: teal[600]
            }


        }


    }

}