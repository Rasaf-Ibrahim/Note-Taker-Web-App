

//🎉 global variables
const halfPixel = 0.03125
const fourPixel = 0.25




// 🍪 main object, which is holding all the functions
const responsiveSpacing = {


    // ✅ sxProp function
    sxProp: function (type, space) {


        const multiplierOfFourPixel = Math.floor(space / fourPixel)

        const increase = multiplierOfFourPixel * halfPixel


        return {

            [`${type}`]: { xs: `${space}rem`, sm: `${space + (increase * 1)}rem`, md: `${space + (increase * 2)}rem`, lg: `${space + (increase * 3)}rem`, xl: `${space + (increase * 3)}rem` }

        }
    },



    // 🍪 styledComponent object
    styledComponent: {



        // ✅ cssSyntax function 
        cssSyntax: function (type, space) {


            const multiplierOfFourPixel = Math.floor(space / fourPixel)

            const increase = multiplierOfFourPixel * halfPixel

            return `
                @media (min-width: 0px) {
                    ${type}: ${space}rem;
                }
        
                @media (min-width: 640px) {
                    ${type}: ${space + (increase * 1)}rem;
                }
        
                @media (min-width: 960px) {
                    ${type}: ${space + (increase * 2)}rem;
                }
        
                @media (min-width: 1280px) {
                    ${type}: ${space + (increase * 3)}rem;
                }
        
                @media (min-width: 1600px) {
                    ${type}: ${space + (increase * 4)}rem;
                }
        
            `
        },







        // ✅ objectSyntax function (I am not going to use this function because it has limitation. In one component, you can only use this function once, not more than that. Why? Read about that in the sibling file of this file: responsive-spacing.md)
        objectSyntax: function (type, space) {


            const multiplierOfFourPixel = Math.floor(space / fourPixel)

            const increase = multiplierOfFourPixel * halfPixel


            return {

                "@media (min-width:0px)": {
                    [`${type}`]: `${space}rem`
                },

                "@media (min-width:640px)": {
                    [`${type}`]: `${space + (increase * 1)}rem`
                },

                "@media (min-width:960px)": {
                    [`${type}`]: `${space + (increase * 2)}rem`
                },

                "@media (min-width:1280px)": {
                    [`${type}`]: `${space + (increase * 3)}rem`
                },

                "@media (min-width:1600px)": {
                    [`${type}`]: `${space + (increase * 4)}rem`
                },

            }


        },






    }





}



export default responsiveSpacing