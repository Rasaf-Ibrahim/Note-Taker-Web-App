
import { useEffect, useState } from 'react'
import { auth_store } from '../auth-store'
import { note_store } from '../note-store'
import { theme_store } from './../theme-store'




export default function useZustandRehydration() {

    const [isZustandRehydrated, setIsZustandRehydrated] = useState(false)

    useEffect(() => {

        // Rehydrate auth_store
        auth_store.persist.rehydrate()

        // Rehydrate theme_store
        theme_store.persist.rehydrate()

        // Rehydrate note_store
        note_store.persist.rehydrate()


        // Set isZustandRehydrated to true once rehydration is complete
        setIsZustandRehydrated(true)
    }, [])




    return isZustandRehydrated;
}
