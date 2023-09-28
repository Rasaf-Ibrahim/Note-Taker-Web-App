/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";



// dynamic component import
import dynamic from 'next/dynamic'

const TERMS_OF_SERVICE___COMPONENT = dynamic(
    () => import('./_terms-of-service'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Terms of Service',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function TERMS_OF_SERVICE___PAGE() {

    return (

        <DYNAMIC___LAYOUT
            auth_layout={true}
            no_navigation_drawer={true}>

            <TERMS_OF_SERVICE___COMPONENT />

        </DYNAMIC___LAYOUT>

    )
}