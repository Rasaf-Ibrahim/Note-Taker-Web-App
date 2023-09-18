const light_1 = `hsl(262, 60%, 89%)` 
const light_2 = `hsl(262, 60%, 84%)` 
const light_3 = `hsl(262, 60%, 79%)` 

const dark_1 = `hsl(262, 40%, 12%)`  
const dark_2 = 'hsl(262, 40%, 15%)'  
const dark_3 = 'hsl(262, 40%, 18%)'  



export function theme_palette_secondary(darkModeVariable) {

   

    return {

        secondary: {

            /* The light should be the lightest, then main should be little bit darker than light, then dark should be little bit more darker than main. The dark gets used for hover. */

            light: darkModeVariable ? light_1 : dark_3,
            main: darkModeVariable ? light_2 : dark_2,
            dark: darkModeVariable ? light_3 : dark_1,
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            /* Suppose, we are in dark theme. The above properties would provide right color for the dark theme. But while we are in the dark theme, what would be the right color for the light theme? The following properties will provide that   */
            opposite_theme: {

                light: darkModeVariable ? dark_3 : light_1,
                main: darkModeVariable ? dark_2 : light_2,
                dark: darkModeVariable ? dark_1 : light_3,
                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },


            /* All above properties are dynamic. They work both in dark and light theme. But the following properties are static. */
            static_variant: {

                light_1: light_1,
                light_2: light_2,
                light_3: light_3,

                dark_1: dark_1,
                dark_2: dark_2,
                dark_3: dark_3
            }


        }


    }

}