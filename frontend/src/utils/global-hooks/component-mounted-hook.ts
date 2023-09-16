/*__________________________________________

 ✅ import 
____________________________________________*/
import { useState } from 'react'
import { useMount } from "react-use"



export default function useComponentMounted() {

    const [mounted, set_mounted] = useState(false)

    useMount(() => {
        set_mounted(true)
    })

    return { mounted }
}

