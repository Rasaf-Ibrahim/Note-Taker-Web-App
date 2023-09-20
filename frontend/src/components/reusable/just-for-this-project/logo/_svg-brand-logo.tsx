// types
import { type_of_obj_with_any_values } from '@/types/commonly-used-types'

// MUI
import { styled, useTheme } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';

// utils
import css_media_queries from '@/styles/css-utils/media-queries';



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_svg_brand_logo_props = {

    background_is_always_light: boolean,
    background_is_always_dark: boolean,
    background_has_opposite_theme_color: boolean
}





/*__________________________________________

✅ Functional Component 
____________________________________________*/
export default function SVG_BRAND_LOGO___COMPONENT(props: type_of_svg_brand_logo_props) {


    // 🍪 props
    const {
        background_is_always_light,
        background_is_always_dark,
        background_has_opposite_theme_color
    } = props



    // 🍪 useTheme hook
    const theme = useTheme()


    /* 🍪 color 🍪  */
    let first_color


    if (
        // theme is either dark or light, background is always light. So, svg should always be dark
        (background_is_always_light && !background_is_always_dark && !background_has_opposite_theme_color) ||

        // theme is dark but background is light. So, svg should be dark
        (theme.palette.mode === 'dark' && background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark) ||

        //  theme is light and background is also light. So, svg should be dark
        (theme.palette.mode !== 'dark' && !background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark)
    ) {

        first_color = theme.palette.primary.static_variant.dark_1
    }


    else if (
        // theme is either dark or light, background is always dark. So, svg should always be light
        (background_is_always_dark && !background_is_always_light && !background_has_opposite_theme_color) ||

        // theme is dark and background is  also dark. So, svg should be light
        (theme.palette.mode === 'dark' && !background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark) ||

        //  theme is light but background is dark. So, svg should be light
        (theme.palette.mode !== 'dark' && background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark)
    ) {

        first_color = theme.palette.primary.static_variant.light_1
    }





    /*__________________________________________

    ✅ JSX
    ____________________________________________*/
    return (

        <SVG___STYLED viewBox="0 0 44 48">

            <path
                d="M25.8 35.787c-3.5-1.3-7.1-1.5-10.4-.6-2.3.6-4.5 1.8-6.5 3.3l-1.4 1.2-.4.4.9.8c.1 0 .1.1.2.2.2.2.4.3.7.5l.6.4.6-.5c.1-.1.3-.3.5-.4 1.8-1.5 3.8-2.5 5.9-3 2.7-.7 5.6-.6 8.5.5 2.4.9 7.3 2 13.2-.5l.2-.1.3-.3c0-.1.1-.1.2-.2.5-.6 1-1.2 1.4-1.9l2-3.1-3.2 1.8c-4.7 2.6-9 3.1-13.3 1.5ZM12.1 24.988c2.7-.7 5.6-.6 8.5.5 3.2 1.2 11.4 2.9 20.6-5.4l1.5-1.5.1-.1.4-.4-.2-.5c-.1-.4-.3-.9-.5-1.4l-.5-1.4-1 1c-.1.2-.3.3-.5.5-4.4 4.5-11.2 9.1-19 6.3-3.5-1.3-7.1-1.5-10.4-.6-3.2.9-6 2.6-8.6 5v-.1l-1.5 1.6c0 .1-.1.1-.2.2l-.3.3.1.4c.1.5.3 1 .4 1.5l.6 1.6 1-1.3c.1-.2.3-.3.4-.5 2.1-1.9 5-4.6 9.1-5.7Z"
                fill={first_color}
            />
            <path
                d="M2.4 23.187c2.3-2.4 4.9-3.9 7.7-4.7 2.7-.7 5.6-.6 8.5.5 9 3.3 16.8-2.1 20.2-5l1.3-1.3.5-.4-.4-.6c-.3-.3-.5-.7-.8-1.1l-.6-.8-.7.7-.4.4c-4.2 4-10.7 8.1-18.1 5.3-3.5-1.3-7.1-1.5-10.4-.6-2.1.6-4.1 1.6-6.1 2.9l-2.1 1.7-.5.5-.2.2v.3c-.1.7-.1 1.4-.2 2l-.1 2.5 1.7-1.8c.2-.2.4-.5.7-.7ZM28.7 42.587l-.2.6.2-.6c-.3-.1-.5-.2-.8-.3-3.5-1.3-7.1-1.5-10.4-.6-.7.2-1.4.4-2.1.7l-2.4 1.1-.6.3 2 .7 1.8.6.3.1.3-.1c.3-.1.6-.3.9-.3.2 0 .4-.1.6-.2 2.4-.6 5-.6 7.8.3.3.1.5.2.8.3l.5.2.3-.1c.7-.2 1.5-.4 2.1-.7l2.8-1-2.9-.7c-.3-.1-.7-.2-1-.3ZM44 21.887l-1.5 1.5-.6.6c-4.1 3.9-10.7 8.1-18.1 5.3-3.5-1.3-7.1-1.5-10.4-.6-3.1.9-5.9 2.5-8.4 4.9l-1.3 1.4-.4.5.4.6c.3.4.5.7.7 1.1l.6.9.7-.9.4-.4c2.4-2.6 5-4.2 8-5 2.7-.7 5.6-.6 8.5.5 2.5.9 5.1 1.2 7.7.9 4.6-.5 9.2-3.1 12.6-6 .2-.2.4-.3.6-.5l.3-.3v-.3c0-.6.1-1.3.1-1.9l.1-2.3Z"
                fill={first_color}
            />
            <path
                d="m6 12.688-.3-.6.3.6c.6-.3 1.3-.5 1.9-.7 2.7-.7 5.6-.6 8.5.5 1.9.7 3.8 1 5.9 1 4.2 0 8.4-1.5 12.3-4.4l1.5-1.2.5-.4-.9-.7c-.3-.3-.7-.6-1.1-.8l-.6-.4-.5.4c-.2.1-.3.3-.5.4-5.3 4-10.6 5.1-15.6 3.2-3.6-1.3-7.2-1.6-10.8-.5-.3.1-.6.2-1 .3l-.2.1-.3.3c0 .1-.1.1-.2.2-.4.6-.9 1.1-1.3 1.7l-1.9 2.9 3.1-1.6c.5 0 .9-.2 1.2-.3ZM14.2 5.887l.3.1c1.3.5 3.3 1 5.8 1 2.6 0 5.1-.6 7.6-1.6l3.1-1.5-2.1-.7c-.6-.2-1.2-.4-1.9-.5h-.3l-.3.1c-.3.1-.6.3-.9.4-3 1.1-6 1.3-8.9.5l-.9-.3-.3-.1-.3.1c-.6.2-1.2.4-1.8.7l-2.3 1 2.4.7c.2-.1.5 0 .8.1Z"
                fill={first_color}
            />

        </SVG___STYLED>
    )
}




/*__________________________________________

✅ Styled Components for 
<SVG_BRAND_LOGO___COMPONENT/>
____________________________________________*/


const SVG___STYLED = styled((props: type_of_obj_with_any_values) =>

    <SvgIcon {...props} />

)(({ theme }) => `

    ${css_media_queries.name_xs_sm_md_lg_xl('height', '1.8rem', '1.8rem', '1.8rem', '1.8rem', '1.8rem')}

    ${css_media_queries.name_xs_sm_md_lg_xl('width', '1.8rem', '1.8rem', '1.8rem', '1.8rem', '1.8rem')}

`)






