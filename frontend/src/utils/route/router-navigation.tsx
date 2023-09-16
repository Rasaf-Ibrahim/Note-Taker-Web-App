
/*__________________________________________

✅ import  
____________________________________________*/

// types
import { type_of_anything, type_of_child_component } from '@/types/commonly-used-types'

// Link component of react router
import Link from 'next/link'

// styled-components
import { styled } from '@mui/material/styles'






/*__________________________________________

✅ types 
____________________________________________*/


type type_of_router_navigation_props = {
    href: string,
    replace?: boolean,
    prefetch?: boolean
    children: type_of_child_component
}


/*__________________________________________

 ✅ Functional component
____________________________________________*/
export default function ROUTER_NAVIGATION___COMPONENT(props: type_of_router_navigation_props) {

    // props
    const {
        href,
        replace = false,
        prefetch = false,
        ...rest
    } = props



    return (

        <LINK___STYLED
            href={href}
            replace={replace}
            prefetch={prefetch}
            {...rest}
        />
    )

}



/*__________________________________________

 ✅ Styled Components for
  <ROUTER_NAVIGATION___COMPONENT/>
____________________________________________*/


/* 🥔 */
const LINK___STYLED = styled((props: type_of_anything) =>

    <Link  {...props} />

)(({ theme }) => `

    text-decoration: none;
    color: inherit;
    cursor: pointer;
    
`)

