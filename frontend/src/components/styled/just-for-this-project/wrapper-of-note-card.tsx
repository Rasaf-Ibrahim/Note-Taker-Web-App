/*__________________________________________

 ✅ import
____________________________________________*/
import CONTAINER___STYLED from "@/components/styled/for-any-project/container"



/*__________________________________________

 ✅ Styled Component
____________________________________________*/
export default function WRAPPER_OF_NOTE_CARD___STYLED({ children }) {

    return (

        <CONTAINER___STYLED
            elevation={{ light: { value: 1 }, dark: { value: 1 } }}

            background_color={{ light: 0, dark: 0 }}

            size='large'

            sx={{
                /* Layout */
                padding: '1rem',


                /* Child Layout */
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' },
                alignItems: { xs: 'stretch', md: 'center' },
                gap: '1.5rem'
            }}>

            {children}

        </CONTAINER___STYLED>

    )
}

