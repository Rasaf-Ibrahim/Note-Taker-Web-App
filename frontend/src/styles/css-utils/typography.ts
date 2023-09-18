// importing type
import {Theme} from '@mui/material'

// type
type type_of_typography_payload = {
    theme: Theme
    typography: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' |  'caption' | 'overline'
}


const css_typography = (payload: type_of_typography_payload) => {

    const {theme, typography} = payload

    return `
        font-size: ${theme.typography[typography].fontSize};
        font-weight: ${theme.typography[typography].fontWeight};
        font-family: ${theme.typography[typography].fontFamily};
        line-height: ${theme.typography[typography].lineHeight};
        letter-spacing: ${theme.typography[typography].letterSpacing};
    `
}


export default css_typography