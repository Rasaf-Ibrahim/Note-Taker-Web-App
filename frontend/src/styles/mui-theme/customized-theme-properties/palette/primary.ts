




// 🍪 importing theme store
import { theme_store } from "@/store/theme-store"


// 🍪  theme_palette_primary function
export function theme_palette_primary(darkModeVariable) {


    // 🥔 get the state properties 
    const { primary_color } = theme_store(state => ({
        primary_color: state?.theme.primary_color
    }))



    // 🥔 selected_color function
    function selected_color() {


      


        const red = {

            light_1: `hsl(14, 60%, 89%)`,
            light_2: `hsl(14, 60%, 84%)`,
            light_3: `hsl(14, 60%, 79%)`,

            dark_1: `hsl(14, 40%, 17%)`,
            dark_2: 'hsl(14, 40%, 21%)',
            dark_3: 'hsl(14, 40%, 25%)'

        }


        const amber = {

            light_1: `hsl(45, 60%, 89%)`,
            light_2: `hsl(45, 60%, 84%)`,
            light_3: `hsl(45, 60%, 79%)`,

            dark_1: `hsl(45, 40%, 17%)`,
            dark_2: 'hsl(45, 40%, 21%)',
            dark_3: 'hsl(45, 40%, 25%)'
        }


        const light_green = {

            light_1: `hsl(88, 60%, 89%)`,
            light_2: `hsl(88, 60%, 84%)`,
            light_3: `hsl(88, 60%, 79%)`,

            dark_1: `hsl(88, 40%, 17%)`,
            dark_2: 'hsl(88, 40%, 21%)',
            dark_3: 'hsl(88, 40%, 25%)'
        }


        const indigo = {

            light_1: `hsl(262, 60%, 89%)`,
            light_2: `hsl(262, 60%, 84%)`,
            light_3: `hsl(262, 60%, 79%)`,

            dark_1: `hsl(262, 40%, 17%)`,
            dark_2: 'hsl(262, 40%, 21%)',
            dark_3: 'hsl(262, 40%, 25%)'
        }


        const cyan = {

            light_1: `hsl(187, 60%, 89%)`,
            light_2: `hsl(187, 60%, 84%)`,
            light_3: `hsl(187, 60%, 79%)`,

            dark_1: `hsl(187, 40%, 17%)`,
            dark_2: 'hsl(187, 40%, 21%)',
            dark_3: 'hsl(187, 40%, 25%)'
        }


        if (primary_color === 'red') return red

        else if (primary_color === 'amber') return amber

        else if (primary_color === 'light_green') return light_green

        else if (primary_color === 'cyan') return cyan

        else if (primary_color === 'indigo') return indigo


    }


    // 🥔 selected_color() returns the selected color object 
    const selected_color_obj = selected_color()



    // 🥔 at last, returning primary colors
    return {

        primary: {


            

            light: darkModeVariable ? selected_color_obj.light_1 : selected_color_obj.dark_3,

            main: darkModeVariable ? selected_color_obj.light_2 : selected_color_obj.dark_2,

            dark: darkModeVariable ? selected_color_obj.light_3 : selected_color_obj.dark_1,

            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


            
            opposite_theme: {

                light: darkModeVariable ? selected_color_obj.dark_3 : selected_color_obj.light_1,

                main: darkModeVariable ? selected_color_obj.dark_2 : selected_color_obj.light_2,

                dark: darkModeVariable ? selected_color_obj.dark_1 : selected_color_obj.light_3,

                contrastText: darkModeVariable ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },



            
            static_variant: {

                light_1: selected_color_obj.light_1,
                light_2: selected_color_obj.light_2,
                light_3: selected_color_obj.light_3,

                dark_1: selected_color_obj.dark_1,
                dark_2: selected_color_obj.dark_2,
                dark_3: selected_color_obj.dark_3
            }


        }


    }

}