import { amber } from '@mui/material/colors';


export function theme_palette_warning(darkModeVariable) {

     

    return {

        warning: {


            light: darkModeVariable ? amber[50] : amber[600],
            main: darkModeVariable ? amber[100] : amber[700],
            dark: darkModeVariable ? amber[200] : amber[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            opposite_theme: {

                light: darkModeVariable ? amber[600] : amber[50],
                main: darkModeVariable ? amber[700] : amber[100],
                dark: darkModeVariable ? amber[800] : amber[200],
                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },


            static_variant: {

                light_1: amber[50],
                light_2: amber[100],
                light_3: amber[200],

                dark_1: amber[800],
                dark_2: amber[700],
                dark_3: amber[600]
            }


        }


    }

}