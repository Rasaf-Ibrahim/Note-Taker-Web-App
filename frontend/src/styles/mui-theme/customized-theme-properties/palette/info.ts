import { indigo } from '@mui/material/colors';


export function theme_palette_info(darkModeVariable) {

     

    return {

        info: {


            light: darkModeVariable ? indigo[50] : indigo[600],
            main: darkModeVariable ? indigo[100] : indigo[700],
            dark: darkModeVariable ? indigo[200] : indigo[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            opposite_theme: {

                light: darkModeVariable ? indigo[600] : indigo[50],
                main: darkModeVariable ? indigo[700] : indigo[100],
                dark: darkModeVariable ? indigo[800] : indigo[200],
                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },


            static_variant: {

                light_1: indigo[50],
                light_2: indigo[100],
                light_3: indigo[200],

                dark_1: indigo[800],
                dark_2: indigo[700],
                dark_3: indigo[600]
            }


        }


    }

}