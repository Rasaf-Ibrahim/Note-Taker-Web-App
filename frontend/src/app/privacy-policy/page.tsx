
/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";


// dynamic component import
import dynamic from 'next/dynamic'

const PRIVACY_POLICY___COMPONENT = dynamic(
    () => import('./_privacy-policy'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Privacy Policy',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function PRIVACY_POLICY___PAGE() {

    return (

        <DYNAMIC___LAYOUT
            auth_layout={true}
            no_navigation_drawer={true}>

            <PRIVACY_POLICY___COMPONENT />

        </DYNAMIC___LAYOUT>

    )
}