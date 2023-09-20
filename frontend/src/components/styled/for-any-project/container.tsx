/*__________________________________________

 ✅ import
____________________________________________*/

// type
import { ReactNode } from 'react'
import type * as CSS from 'csstype';
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// css in js
import { useTheme, Theme } from '@mui/material/styles'

// component
import { Box } from '@mui/material';





/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_elevation = {

    light: {
        value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        no_blur?: boolean
        colorful?: boolean,
        inset?: boolean,
        custom?: never
    } | {
        custom: CSS.Properties['boxShadow']
        value?: never
        no_blur?: never
        colorful?: never,
        inset?: never
    }


    dark: {
        value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        no_blur?: boolean
        colorful?: boolean,
        inset?: boolean,
        custom?: never
    } | {
        custom: CSS.Properties['boxShadow']
        value?: never
        no_blur?: never
        colorful?: never,
        inset?: never
    }
}


type type_of_paper_color = {

    light: 0 | 1 | 2 | 3 | 'inherit',
    dark: 0 | 1 | 2 | 3 | 'inherit'
}


export type type_of_css_transform = `translateY(${number}rem)`;


type type_of_container_props = {

    elevation: type_of_elevation,
    background_color: type_of_paper_color,


    size?: 'small' | 'medium' | 'large' | 'extra_large' | 'user_will_define_manually'

    center?: {
        horizontal?: boolean,
        vertical?: true,
        transform?: type_of_css_transform
    } |
    {
        horizontal?: boolean,
        vertical: false,
        transform?: never
    },
    sx?: type_of_obj_with_any_values,
    children: ReactNode

}







/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function CONTAINER___STYLED(props: type_of_container_props) {



    // 🍪 props
    const {
        elevation,
        background_color,
        size = 'user_will_define_manually',
        center = { horizontal: false, vertical: false },
        sx,
        children
    } = props



    // 🍪 theme
    const theme: Theme = useTheme()







    type type_of_box_shadow_generator_payload = {
        size: string
        color: string
        no_blur: boolean
    }


    function box_shadow_generator(payload: type_of_box_shadow_generator_payload) {

        const { size, color, no_blur } = payload

        const offset_x = '0px'
        const offset_y = '0px'
        const blur_radius = no_blur ? '0px' : size
        const spread_radius = size

        const inset = theme.palette.mode === 'dark' ? elevation.dark.inset : elevation.light.inset

        if (inset) {
            return `inset ${offset_x} ${offset_y} ${blur_radius} ${spread_radius} ${color}`
        }

        else {
            return `${offset_x} ${offset_y} ${blur_radius} ${spread_radius} ${color}`
        }

    }


    // 🍪 elevation_in_light_mode
    const elevation_in_light_mode = () => {

        const color = elevation.light.colorful ? theme.palette.primary.static_variant.dark_2 : 'rgba(0, 0, 0, 0.15)'

        const no_blur = elevation.light.no_blur

        const elevations_obj = {

            0: box_shadow_generator({ size: '0px', color: color, no_blur: no_blur }),

            1: box_shadow_generator({ size: '0.5px', color: color, no_blur: no_blur }),

            2: box_shadow_generator({ size: '1px', color: color, no_blur: no_blur }),

            3: box_shadow_generator({ size: '1.5px', color: color, no_blur: no_blur }),

            4: box_shadow_generator({ size: '2px', color: color, no_blur: no_blur }),

            5: box_shadow_generator({ size: '2.5px', color: color, no_blur: no_blur }),

            6: box_shadow_generator({ size: '3px', color: color, no_blur: no_blur }),

            7: box_shadow_generator({ size: '3.5px', color: color, no_blur: no_blur }),

            8: box_shadow_generator({ size: '4px', color: color, no_blur: no_blur }),

            9: box_shadow_generator({ size: '4.5px', color: color, no_blur: no_blur }),

            10: box_shadow_generator({ size: '5px', color: color, no_blur: no_blur }),

            11: box_shadow_generator({ size: '5.5px', color: color, no_blur: no_blur }),

            12: box_shadow_generator({ size: '6px', color: color, no_blur: no_blur }),


        }

        return `${elevations_obj[elevation.light.value]}`
    }



    // 🍪 elevation_in_light_mode
    const elevation_in_dark_mode = () => {


        const color = elevation.dark.colorful ? theme.palette.primary.static_variant.light_2 : 'rgba(255, 255, 255, 0.15)'

        const no_blur = elevation.dark.no_blur


        const elevations_obj = {

            0: box_shadow_generator({ size: '0px', color: color, no_blur: no_blur }),

            1: box_shadow_generator({ size: '0.5px', color: color, no_blur: no_blur }),

            2: box_shadow_generator({ size: '1px', color: color, no_blur: no_blur }),

            3: box_shadow_generator({ size: '1.5px', color: color, no_blur: no_blur }),

            4: box_shadow_generator({ size: '2px', color: color, no_blur: no_blur }),

            5: box_shadow_generator({ size: '2.5px', color: color, no_blur: no_blur }),

            6: box_shadow_generator({ size: '3px', color: color, no_blur: no_blur }),

            7: box_shadow_generator({ size: '3.5px', color: color, no_blur: no_blur }),

            8: box_shadow_generator({ size: '4px', color: color, no_blur: no_blur }),

            9: box_shadow_generator({ size: '4.5px', color: color, no_blur: no_blur }),

            10: box_shadow_generator({ size: '5px', color: color, no_blur: no_blur }),

            11: box_shadow_generator({ size: '5.5px', color: color, no_blur: no_blur }),

            12: box_shadow_generator({ size: '6px', color: color, no_blur: no_blur })

        }

        return `${elevations_obj[elevation.dark.value]}`
    }






    // 🍪 variation_in_light_mode
    const variation_in_light_mode = () => {

        const variations_obj = {

            'inherit': 'inherit',

            0: theme.palette.background.static_variant.light_default,

            1: theme.palette.background.static_variant.light_variation_1,

            2: theme.palette.background.static_variant.light_variation_2,

            3: theme.palette.background.static_variant.light_variation_3,

        }


        return `${variations_obj[background_color.light]}`
    }




    // 🍪 variation_in_dark_mode
    const variation_in_dark_mode = () => {

        const variations_obj = {

            'inherit': 'inherit',

            0: theme.palette.background.static_variant.dark_default,

            1: theme.palette.background.static_variant.dark_variation_1,

            2: theme.palette.background.static_variant.dark_variation_2,

            3: theme.palette.background.static_variant.dark_variation_3,

        }


        return `${variations_obj[background_color.dark]}`
    }





    return (


        // 🍪 wrapper of the container
        <Box sx={{

            // child layout
            display: 'flex',
            flexDirection: 'column',

            alignItems: center.horizontal ? 'center' : 'stretch',

            ...center.vertical ? {
                justifyContent: 'center',
                transform: center.transform
            } : {}

        }}>



            {/* 🍪 container */}
            <Box sx={(theme) => ({

                // 🍪 appearance
                backgroundColor: theme.palette.mode === 'dark' ? variation_in_dark_mode() : variation_in_light_mode(),

                color: theme.palette.text.primary,

                boxShadow: theme.palette.mode === 'dark' ?
                    `${elevation.dark.custom ? elevation.dark.custom : elevation_in_dark_mode()}` :

                    `${elevation.light.custom ? elevation.light.custom : elevation_in_light_mode()}`,



                // 🍪 size

                ...size !== 'user_will_define_manually' ? {

                    width: {

                        xs: size === 'small' ? '15rem' : (
                            size === 'medium' ? '16rem' : (
                                size === 'large' ? '17rem' : (
                                    size === 'extra_large' && '18rem'
                                ))),


                        sm: size === 'small' ? '22rem' : (
                            size === 'medium' ? '24rem' : (
                                size === 'large' ? '26rem' : (
                                    size === 'extra_large' && '28rem'
                                ))),


                        md: size === 'small' ? '28rem' : (
                            size === 'medium' ? '29rem' : (
                                size === 'large' ? '32rem' : (
                                    size === 'extra_large' && '35rem'
                                ))),


                        lg: size === 'small' ? '35rem' : (
                            size === 'medium' ? '38rem' : (
                                size === 'large' ? '41rem' : (
                                    size === 'extra_large' && '44rem'
                                ))),


                        xl: size === 'small' ? '44rem' : (
                            size === 'medium' ? '47rem' : (
                                size === 'large' ? '50rem' : (
                                    size === 'extra_large' && '53rem'
                                ))),

                    }

                } : {},


                // 🍪 extra styles
                ...sx

            })}>

                {children}

            </Box>

        </Box>

    )

}