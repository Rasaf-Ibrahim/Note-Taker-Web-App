import { grey } from '@mui/material/colors';

// Color Interface
import { Color } from '@mui/material';




export function theme_palette_grey(darkModeVariable) {


    return {

        grey: {

            // static (the default theme has these following properties)
            50: grey[50],
            100: grey[100],
            200: grey[200],
            300: grey[300],
            400: grey[400],
            500: grey[500],
            600: grey[600],
            700: grey[700],
            800: grey[800],
            900: grey[900],


            /* 
            
                dynamic_variant: {
                    light: darkModeVariable ? grey[50] : grey[600],
                    main: darkModeVariable ? grey[100] : grey[700],
                    dark: darkModeVariable ? grey[200] : grey[800],
                }

            */



            /*⚠️⚠️⚠️  I tried to add the above  "dynamic_variant" to the "theme.palette.grey" object. But couldn't add the type for it even after tying several times!


                🍪 Code:

                    import { Color } from '@mui/material';

                    interface ExtendedColor extends Color {

                        dynamic_variant: {
                            light: string;
                            main: string;
                            dark: string;
                        }

                    }
    

                🍪 Explanation: 
                
                I was being able to extend the "Color" interface. But didn't understand where to use the  "ExtendedColor" to make the "theme.palette.grey" object have "dynamic_variant"


                🍪 Temporary Solution- Manually check theme state and use color:

                // light
                theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[600]

                // main
                theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[700]

                // dark
                theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[800]



            */


        }


    }

}