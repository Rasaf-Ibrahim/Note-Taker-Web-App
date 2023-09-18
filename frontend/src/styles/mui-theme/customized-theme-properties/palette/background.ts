// white
const light_1 = 'hsl(0, 0%, 99%)' //#fcfcfc
const light_2 = 'hsl(0, 10%, 96%)' //#f6f4f4
const light_3 = 'hsl(0, 10%, 93%)' //#efebeb
const light_4 = 'hsl(0, 10%, 90%)' //#e8e3e3

// black
const dark_1 = 'hsl(200, 10%, 10%)'  //#171a1c
const dark_2 = 'hsl(200, 10%, 13%)'  //#1e2224
const dark_3 = 'hsl(200, 10%, 16%)'  //#252a2d
const dark_4 = 'hsl(200, 10%, 19%)' //#2c3235



export function theme_palette_background(darkModeVariable) {


    return {

        background: {

            default: darkModeVariable ? dark_1 : light_1,

            // when the paper's elevation is 0, it will have same color as the background
            paper: darkModeVariable ? dark_1 : light_1,


            // adding 3 custom variations property here
            variation_1: darkModeVariable ? dark_2 : light_2,
    
            variation_2: darkModeVariable ? dark_3 : light_3,

            variation_3: darkModeVariable ? dark_4 : light_4,
    
    


            static_variant: {

                light_default: light_1,
                light_variation_1: light_2,
                light_variation_2: light_3,
                light_variation_3: light_4,

                dark_default: dark_1,
                dark_variation_1: dark_2,
                dark_variation_2: dark_3,
                dark_variation_3: dark_4
            }

        }


    }

}