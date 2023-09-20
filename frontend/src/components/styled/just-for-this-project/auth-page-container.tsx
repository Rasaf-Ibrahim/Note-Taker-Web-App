import CONTAINER___STYLED, { type_of_css_transform } from '../for-any-project/container'


// using this in couple of auth related pages
export default function AUTH_PAGE_CONTAINER___STYLED(
    {
        children,
        paddingTop
    }: {
        children: React.ReactNode,
        paddingTop: string
    }) {

    return (

        <CONTAINER___STYLED

            elevation={{ light: { value: 4 }, dark: { value: 4 } }}

            background_color={{ light: 0, dark: 0 }}

            size='medium'

            center={{
                horizontal: true
            }}

            sx={{
                /* Layout */
                padding: '2rem',

                marginTop: paddingTop,
                marginBottom: '2rem',


                /* Child Layout */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>

            {children}

        </CONTAINER___STYLED>

    )

}
