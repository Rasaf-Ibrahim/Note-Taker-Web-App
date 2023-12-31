const light_primary = `hsla(0, 0%, 100%, 1)`
const light_secondary = `hsla(0, 0%, 100%, 0.7)`
const light_disabled = `hsla(0, 0%, 100%, 0.4)`
const dark_primary = `hsla(0, 0%, 0%, 0.87)`
const dark_secondary = `hsla(0, 0%, 0%, 0.6)`
const dark_disabled = `hsla(0, 0%, 0%, 0.38)`


export function theme_palette_text(darkModeVariable) {


    return {

        text: {
            primary: darkModeVariable ? light_primary : dark_primary,
            secondary: darkModeVariable ? light_secondary : dark_secondary,
            disabled: darkModeVariable ? light_disabled : dark_disabled,
            icon: darkModeVariable ? light_secondary : dark_secondary,
            primaryChannel: darkModeVariable ? "255 255 255" : "0 0 0",
            secondaryChannel: darkModeVariable ? "255 255 255" : "0 0 0",


            opposite_theme: {
                primary: darkModeVariable ? dark_primary : light_primary,
                secondary: darkModeVariable ? dark_secondary : light_secondary,
                disabled: darkModeVariable ? dark_disabled : light_disabled,
            },


            static_variant: {
                light_primary: light_primary,
                light_secondary: light_secondary,
                light_disabled: light_disabled,

                dark_primary: dark_primary,
                dark_secondary: dark_secondary,
                dark_disabled: dark_disabled,
            }

        }

    }

}