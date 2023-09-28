/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import { useTheme } from '@mui/material/styles';

// styled-components
import { styled } from '@mui/material/styles';

// utils
import css_media_queries from '@/styles/css-utils/media-queries';

// colors
import { blueGrey, pink, teal } from "@mui/material/colors";

// components
import { SvgIcon } from '@mui/material';

/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_svg_illustration_header_props = {

    background_is_always_light?: boolean,
    background_is_always_dark?: boolean,
    background_has_opposite_theme_color?: boolean
}



/*__________________________________________

✅ Functional Component 
____________________________________________*/
function SVG_ILLUSTRATION_HEADER___COMPONENT(props: type_of_svg_illustration_header_props) {

    //  useTheme
    const { background_is_always_dark, background_is_always_light, background_has_opposite_theme_color } = props

    // useTheme
    const theme = useTheme()


    // color
    let first_color
    let second_color
    let third_color
    let fourth_color
    let fifth_color
    let sixth_color
    let seventh_color
    let eighth_color
    let ninth_color



    if (
        // theme is either dark or light, background is always light. So, svg should always be dark
        (background_is_always_light && !background_is_always_dark && !background_has_opposite_theme_color) ||

        // theme is dark but background is light. So, svg should be dark
        (theme.palette.mode === 'dark' && background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark) ||

        //  theme is light and background is also light. So, svg should be dark
        (theme.palette.mode !== 'dark' && !background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark)
    ) {

        first_color = '#dcdcdc'
        second_color = '#b1b1b1'
        third_color = '#c9c9c9'
        fourth_color = '#e0e0e0'
        fifth_color = theme.palette.primary.light
        sixth_color = '#2e2c46'
        seventh_color = '#ff9999'
        eighth_color = '#1d1c30'
        ninth_color = '#8a5060'

    }


    else if (
        // theme is either dark or light, background is always dark. So, svg should always be light
        (background_is_always_dark && !background_is_always_light && !background_has_opposite_theme_color) ||

        // theme is dark and background is  also dark. So, svg should be light
        (theme.palette.mode === 'dark' && !background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark) ||

        //  theme is light but background is dark. So, svg should be light
        (theme.palette.mode !== 'dark' && background_has_opposite_theme_color && !background_is_always_light && !background_is_always_dark)
    ) {

        first_color = theme.palette.background.variation_2
        second_color = '#343434'
        third_color = theme.palette.background.variation_2
        fourth_color = theme.palette.background.default
        fifth_color =  theme.palette.primary.light
        sixth_color = '#c0c2a9'
        seventh_color = '#a5726a' 
        eighth_color = '#d0d1be'
        ninth_color = '#8a615a' 
    }


    /*__________________________________________
    ✅ JSX
    ____________________________________________*/
    return (

        <SVG_STYLED
            width="892"
            height="500.75"
            data-name="Layer 1"
            viewBox="0 0 892 500.75"
        >
            <path
                fill={first_color}
                d="M985.58 671.222a96.071 96.071 0 01-4.489 26.557c-.06.2-.128.396-.193.596h-16.749c.018-.179.036-.379.054-.596 1.116-12.838-5.263-90.042-12.961-103.404.674 1.084 35.636 36.055 34.338 76.847z"
                data-name="Path 133"
                transform="translate(-154 -199.625)"
            ></path>
            <path
                fill={first_color}
                d="M984.323 697.78c-.14.199-.286.398-.435.595h-12.565l.333-.596c2.076-3.746 8.22-14.946 13.922-26.557 6.126-12.478 11.751-25.428 11.278-30.116.146 1.057 4.387 33.285-12.533 56.673z"
                data-name="Path 134"
                transform="translate(-154 -199.625)"
            ></path>
            <path
                fill={first_color}
                d="M200.35 678.209a71.351 71.351 0 003.334 19.724c.045.148.095.294.144.442h12.438a26.01 26.01 0 01-.04-.442c-.829-9.535 3.91-66.874 9.627-76.798-.501.805-26.467 26.778-25.503 57.074z"
                data-name="Path 133"
                transform="translate(-154 -199.625)"
            ></path>
            <path
                fill={first_color}
                d="M201.284 697.933c.104.148.212.296.323.442h9.332l-.248-.442c-1.542-2.782-6.104-11.1-10.34-19.724-4.55-9.267-8.727-18.886-8.375-22.367-.11.785-3.259 24.72 9.308 42.09z"
                data-name="Path 134"
                transform="translate(-154 -199.625)"
            ></path>
            <path
                fill={second_color}
                d="M654.047 351.25c-93.947-39.814-178.942-38.3-259-14-123.352-21.543-207.82-18.21-262 14v-100h521z"
            ></path>
            <path
                fill={third_color}
                d="M654.047 323.75c-86.552-39.217-173-41.75-260.75 0-89.878-25.878-176.764-25.607-260.75 0v-304c89.294-26.65 176.154-26.01 260.75 0 89.362-25.92 176.356-26.743 260.75 0z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 57.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.973 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.819-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 85.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.972 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.819-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 113.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.973 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.819-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 141.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.972 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.819-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 169.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.973 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.82-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M156.002 197.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.972 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.82-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fifth_color}
                d="M417.002 256.476l-2.911-7.452c1.141-.445 28.408-10.986 68.424-16.363 36.996-4.972 92.115-6.16 144.612 16.414l-3.16 7.35c-50.741-21.82-104.231-20.67-140.17-15.865-39.116 5.231-66.522 15.81-66.795 15.916z"
            ></path>
            <path
                fill={fourth_color}
                d="M414.547 202.739V49.809l2.808-.877c71.143-22.223 141.941-22.219 210.427.013l2.765.898v152.692l-5.412-2.043c-71.27-26.898-140.26-26.914-205.056-.047zm105.563-30.45q50.228 0 102.437 18.725V55.67c-65.114-20.535-132.377-20.524-200 .033v135.125a266.356 266.356 0 0197.563-18.54z"
            ></path>
            <path
                fill={fifth_color}
                d="M622.713 252.514l1.048-25.452 35.946-71.469a10.368 10.368 0 014.704-4.677 10.49 10.49 0 018.104-.529 10.486 10.486 0 016.54 6.628 10.847 10.847 0 01.455 2.035 10.387 10.387 0 01-1.042 5.979l-35.995 71.566z"
            ></path>
            <path
                fill={sixth_color}
                d="M668.888 150.315l-39.02 77.58-2.975-1.496 37.74-75.034a9.945 9.945 0 014.255-1.05zM679.014 159.114l-37.532 74.623-2.975-1.497 38.939-77.419a9.998 9.998 0 011.134 2.35 10.328 10.328 0 01.434 1.943zM675.278 152.455l-39.451 78.437-2.975-1.496 39.5-78.536a9.688 9.688 0 011.229.517 10.198 10.198 0 011.697 1.078zM627.226 248.237l-3.97 3.197.333-8.429c1.363.473 2.839 2.525 3.637 5.232z"
            ></path>
            <path
                fill={fifth_color}
                d="M235.674 340.104l-4.752-14.416 5.063-47.4a6.178 6.178 0 011.643-3.596 6.25 6.25 0 014.41-1.994 6.248 6.248 0 015.037 2.325 6.463 6.463 0 01.68 1.04 6.19 6.19 0 01.673 3.553l-5.07 47.466z"
            ></path>
            <path
                fill={sixth_color}
                d="M239.999 273.418l-5.496 51.454-1.973-.21 5.315-49.766a5.926 5.926 0 012.154-1.478zM247.492 276.202l-5.286 49.493-1.974-.21 5.485-51.348a5.957 5.957 0 011.126 1.073 6.153 6.153 0 01.649.992zM244.012 273.272l-5.557 52.022-1.973-.21 5.563-52.088a5.773 5.773 0 01.794.03 6.077 6.077 0 011.173.246zM237.295 336.772l-1.544 2.616-1.582-4.771c.86-.022 2.113.813 3.126 2.155z"
            ></path>
            <g data-name="Group 23">
                <path
                    fill={seventh_color}
                    d="M904.44 522.824a8.305 8.305 0 11-14.42-8.245l.056-.097a8.938 8.938 0 01.782-1.11l-6.986-49.795-.21-1.492-1.418-10.161-.21-1.465.774.037 13.536.618 3.63.164.454 9.27 2.575 52.115a8.294 8.294 0 011.437 10.161z"
                    data-name="Path 385"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={second_color}
                    d="M883.703 462.536l17.188-1.576a3.393 3.393 0 003.06-3.673l-3.184-35.743a13.032 13.032 0 00-25.96 2.318q.033.37.087.736l5.154 35.059a3.388 3.388 0 003.346 2.894 2.402 2.402 0 00.309-.015z"
                    data-name="Path 386"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={second_color}
                    d="M896.731 433.66a23.939 23.939 0 00-8.805-27.552c-6.481-4.435-15.35-6.027-24.902 5.344a118.912 118.912 0 00-24.106 47.758l39.116 6.368s13.302-16.26 18.697-31.918z"
                    data-name="Path 387"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={seventh_color}
                    d="M833.466 689.83h-11.153l-5.305-43.016h16.46z"
                    data-name="Path 388"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={eighth_color}
                    d="M800.808 700.185h35.05v-13.542H814.35a13.542 13.542 0 00-13.542 13.542z"
                    data-name="Path 389"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={seventh_color}
                    d="M925.156 680.103l-10.589 3.5-18.539-39.177 15.628-5.166z"
                    data-name="Path 390"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={eighth_color}
                    d="M897.395 700.185l33.28-11-4.25-12.858-20.422 6.75a13.542 13.542 0 00-8.608 17.108z"
                    data-name="Path 391"
                    transform="translate(-154 -199.625)"
                ></path>
                <circle
                    cx="718.176"
                    cy="172.861"
                    r="22.343"
                    fill={seventh_color}
                    data-name="Ellipse 65"
                ></circle>
                <path
                    fill={eighth_color}
                    d="M852.614 677.857l10.356-68.358a3.184 3.184 0 016.243-.273l15.772 65.144a4.124 4.124 0 004.628 3.079l43.505-6.992a4.094 4.094 0 003.269-5.23l-56.729-187.03a3.184 3.184 0 01-.055-1.637l1.888-8.187a4.079 4.079 0 00-2.116-4.562c-7.725-3.941-27.29-12.136-42.056-3.16a4.14 4.14 0 00-1.89 2.663l-44.317 208.288a4.094 4.094 0 003.639 4.93l53.45 4.787q.182.016.364.016a4.1 4.1 0 004.046-3.48z"
                    data-name="Path 392"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={eighth_color}
                    d="M886.991 356.7a16.902 16.902 0 01-4.416-3.838 5.731 5.731 0 01-.883-5.55c1.13-2.49 4.483-3.274 7.083-2.429s4.608 2.886 6.507 4.851c1.673 1.729 3.394 3.54 4.185 5.814s.385 5.156-1.589 6.536c-1.937 1.354-4.723.8-6.586-.654a16.8 16.8 0 01-4.116-5.703z"
                    data-name="Path 393"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={eighth_color}
                    d="M894.559 350.335c.124-6.295 7.3-10.81 13.497-9.694s10.96 6.4 13.345 12.227c5.038 12.313 1.256 26.362-3.598 38.753s-10.862 24.96-10.153 38.245a39.958 39.958 0 0023.21 33.658c-6.993 3.17-15.353-.105-21.23-5.047-13.052-10.975-18.09-30.516-11.973-46.433 3.018-7.852 8.336-14.569 12.487-21.884s7.199-15.935 5.055-24.069-11.267-14.717-19.065-11.57z"
                    data-name="Path 394"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={eighth_color}
                    d="M870.836 382.4c1.948-3.29 3.912-7.611.353-10.489a7.336 7.336 0 00-5.503-1.455c-4.014.484-8.385.683-12.27-.775a11.502 11.502 0 01-6.672-5.996c-2.002-4.752.505-10.526 4.698-13.53a15.828 15.828 0 0117.519-.31c5.43-2.4 12.02-1.332 16.953 1.97s8.31 8.59 10.144 14.236a27.478 27.478 0 01.84 15.115 22.462 22.462 0 01-13.933 15.354 8.089 8.089 0 01-7.989-1.183 15.027 15.027 0 01-4.042-5.925c-.742-2.49-1.137-5.253-.098-7.011z"
                    data-name="Path 395"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={seventh_color}
                    d="M804.556 402.337a9.573 9.573 0 01.217 1.492l39.077 22.544 9.498-5.468 10.125 13.256-15.873 11.314a7.277 7.277 0 01-8.733-.213l-40.299-31.79a9.552 9.552 0 115.982-11.135z"
                    data-name="Path 397"
                    transform="translate(-154 -199.625)"
                ></path>
                <path
                    fill={second_color}
                    d="M845.157 427.44l12.63 16.37a4.094 4.094 0 006.186.339l14.297-14.847a11.371 11.371 0 10-13.577-18.244q-.186.138-.365.283l-17.932 10.027a4.094 4.094 0 00-1.242 6.073z"
                    data-name="Path 398"
                    transform="translate(-154 -199.625)"
                ></path>
            </g>
            <path
                fill={ninth_color}
                d="M208.552 488.809L220.675 488.808 226.443 442.047 208.55 442.048 208.552 488.809z"
            ></path>
            <path
                fill={eighth_color}
                d="M205.46 484.85h23.875a15.216 15.216 0 0115.216 15.215v.494l-39.09.001z"
            ></path>
            <path
                fill={ninth_color}
                d="M114.156 483.561L126.143 485.373 138.836 439.999 123.121 437.325 114.156 483.561z"
            ></path>
            <path
                fill={eighth_color}
                d="M111.69 479.185l23.607 3.568a15.216 15.216 0 0112.77 17.319l-.074.488-38.651-5.842z"
            ></path>
            <path
                fill={ninth_color}
                d="M151.535 257.07l13.46 3.527-.895 21.824-.11 39.734a7.963 7.963 0 11-10.54 1.324l-4.136-39.88z"
            ></path>
            <path
                fill={second_color}
                d="M149.192 232.073a10.988 10.988 0 016.793-9.772 10.273 10.273 0 0111.12 1.789 9.795 9.795 0 013.265 7.575c.035 12.784-2.85 31.42-2.88 31.606l-.046.296-19.675 6.626z"
            ></path>
            <path
                fill={eighth_color}
                d="M184.372 268.364l30.094-7.79 13.91 46.85.495 174.535-23.013-.144-9.62-141.263-61.31 130.53-24.72-2.967L164.1 328.191s-2.966-24.722 6.428-37.083l-1.978-12.855z"
            ></path>
            <path
                fill={second_color}
                d="M164.08 280.02a4.611 4.611 0 01-.983-3.709l-13.727-41.18a10.477 10.477 0 012.89-11.059l5.958-5.416 4.039-16.153 23.21 5.673-1.913 7.65 10.505-1.91 22.125 49.277-46.247 18.486-2.278.035a4.61 4.61 0 01-3.579-1.693z"
            ></path>
            <path
                fill={ninth_color}
                d="M196.295 245.25l13.262-4.214 10.909 18.923 21.145 33.64a7.963 7.963 0 11-8.199 6.753L208.6 268.86z"
            ></path>
            <path
                fill={second_color}
                d="M180.953 225.376a10.987 10.987 0 01.518-11.888 10.279 10.279 0 0110.354-4.433 9.795 9.795 0 016.809 4.657c6.863 10.785 14.385 28.078 14.46 28.25l.12.276-13.088 16.116z"
            ></path>
            <circle cx="179.429" cy="181.056" r="18.441" fill={ninth_color}></circle>
            <circle cx="146.839" cy="155.514" r="17.764" fill={eighth_color}></circle>
            <path
                fill={eighth_color}
                d="M131.517 170.223a17.765 17.765 0 0027.432-9.327 17.765 17.765 0 11-34.652-7.285 17.758 17.758 0 007.22 16.612z"
            ></path>
            <path
                fill={eighth_color}
                d="M201.62 170.243c-3.1-5.552-4.287-7.871-8.286-11.247-3.535-2.986-7.885-3.863-11.393-1.034a21.008 21.008 0 1012.676 19.284 21.183 21.183 0 00-.143-2.375c3.05-.429 4.097-4.2 7.146-4.628z"
            ></path>
            <path
                fill={second_color}
                d="M382 500.75H1a1 1 0 010-2h381a1 1 0 010 2zM891 500.75H510a1 1 0 010-2h381a1 1 0 010 2z"
            ></path>
            <path fill={second_color} d="M392.297 19.75H394.297V322.788H392.297z"></path>
        </SVG_STYLED>
    )


}





/*__________________________________________
✅ Styled Components for <SVG_ILLUSTRATION_HEADER___COMPONENT/>
____________________________________________*/

const SVG_STYLED = styled(SvgIcon)
    (({ theme }) => `
          
    ${css_media_queries.name_xs_sm_md_lg('height', '15rem', '18rem', '20rem', '22rem')}

    ${css_media_queries.name_xs_sm_md_lg('width', '15rem', '18rem', '20rem', '22rem')}
`)







export default SVG_ILLUSTRATION_HEADER___COMPONENT