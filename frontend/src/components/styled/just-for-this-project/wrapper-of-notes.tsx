/*__________________________________________

 ✅ import
____________________________________________*/

// styled component
import CONTAINER___STYLED from "@/components/styled/for-any-project/container"





/*__________________________________________

 ✅ Styled Component
____________________________________________*/

export default function WRAPPER_OF_NOTES___STYLED({ children }) {

    return (

        <CONTAINER___STYLED
            elevation={{ light: { value: 1 }, dark: { value: 1 } }}

            background_color={{ light: 0, dark: 1 }}

            size='extra_large'

            center={{ horizontal: true, vertical: false }}

            sx={{
                /* Layout */
                padding: '1rem',


                /* Child Layout */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>

            {children}

        </CONTAINER___STYLED>

    )
}


