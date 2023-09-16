'use client'

// useSearchParams hook 
import { useSearchParams } from 'next/navigation';


export default function useRouterQueryStringParams() {

    // useSearchParams returns a read-only object
    const search_params = useSearchParams()

    // convert the search_params object into a plain object
    const values = Object.fromEntries(search_params);

    // return the values object
    return values
}
