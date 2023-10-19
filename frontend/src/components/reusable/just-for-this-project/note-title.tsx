/*__________________________________________

 ✅ import
____________________________________________*/
// hook
import { useEffect } from "react"

// mui component
import { TextField} from "@mui/material"



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_note_title_state = {
    value: string
    validation_error: boolean
}
  
type type_of_update_note_title_state = (callback: (draft: type_of_note_title_state) => void) => void
  
type type_of_props = {
    note_title_state: type_of_note_title_state
    update_note_title_state: type_of_update_note_title_state
}
  

/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function NOTE_TITLE___REUSABLE(props: type_of_props) {


    const {
        note_title_state,
        update_note_title_state
    } = props


    // Update note_title_state when user types
    const handle_on_change_event_of_note_title = (event) =>{

        update_note_title_state(draft=>{
            draft.value = event.target.value
        }) 
    }


    // Update note_title_state when user passes invalid value
    useEffect(()=>{

        if(note_title_state.value === '') return 
       
        const shorter_than_60_characters = /^[^]{1,60}$/

        if(shorter_than_60_characters.test(note_title_state.value)) {
            update_note_title_state(draft=>{
                draft.validation_error = false
            }) 
        }

        else {

            update_note_title_state(draft=>{
                draft.validation_error = true
            }) 

        }

    },[note_title_state])



    // TSX
    return (

        <TextField
            label="Note Title"

            value={note_title_state.value} 
            
            onChange={handle_on_change_event_of_note_title}

            error={note_title_state.validation_error}

            helperText={note_title_state.validation_error ? 'The note title must not be longer than 60 characters' : null}

            variant="outlined"

            autoComplete="no-autocomplete-123456789"
      />

    )

}