import { pink } from '@mui/material/colors';


export function theme_palette_error(darkModeVariable) {

     
    return {

        error: {


            light: darkModeVariable ? pink[50] : pink[600],
            main: darkModeVariable ? pink[100] : pink[700],
            dark: darkModeVariable ? pink[200] : pink[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            opposite_theme: {

                light: darkModeVariable ? pink[600] : pink[50],
                main: darkModeVariable ? pink[700] : pink[100],
                dark: darkModeVariable ? pink[800] : pink[200],
                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },


            static_variant: {

                light_1: pink[50],
                light_2: pink[100],
                light_3: pink[200],

                dark_1: pink[800],
                dark_2: pink[700],
                dark_3: pink[600]
            }


        }


    }

}