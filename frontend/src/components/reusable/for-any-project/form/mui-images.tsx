/*__________________________________________

 ✅ import
____________________________________________*/

// nanoid
import { nanoid } from 'nanoid'

// types
import { type_of_obj_with_any_values } from "../../../../types/commonly-used-types"

// hook
import { useState, useEffect, useRef } from "react";

// utils
import { form_empty_field_func } from "@/utils/form/form-empty-field-func";


// icon
import CollectionsIcon from '@mui/icons-material/Collections';

// styled components
import { WRAPPER_OF_SELECTED_IMAGES___STYLED } from "./styled-components/wrapper-of-selected-image"

// components
import { Box, Button, InputLabel, Typography } from '@mui/material'
import SELECTED_IMAGE___REUSABLE from "./reusable-components/selected-image"
import ERROR_MESSAGE___REUSABLE from "./reusable-components/error-message";




/*__________________________________________

 ✅ types
____________________________________________*/

type types_of_mui_images = {
    label: string
    input_name: string

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_IMAGES___COMPONENT(props: types_of_mui_images) {


    // 🍪 props 🍪 
    const {
        label,
        input_name,
        state,
        actions,
        validation_info
    } = props




    // 🍪 state to trigger validation  🍪 
    const [trigger_validation_check_state, set_trigger_validation_check] = useState('')


    // 🍪input_field_ref 🍪
    const input_field_ref = useRef<any>();


    // 🍪 When you click on the button, logically you also click on the input field 🍪
    const handle_logically_click_the_input_on_button_click = () => {

        return input_field_ref.current.click()
    }



    // 🍪 function to execute when input change either on selecting or dropping images

    const execute_this_when_input_changes = (files: FileList | null) => {

        if (files === null) {
            console.error("No files provided.");
            return
        }

        const current_selected_images = Array.from(files);
        const current_selected_images_array = Array.from(current_selected_images)


        // this time's selected images' link's array
        const current_selected_images_link_array = current_selected_images_array.map((file: any) => {

    

            return {
                link: (URL as any).createObjectURL(file),
                name: file.name
            }

        })


        /* 🥔🥔 Updating Input Value 🥔🥔 */

        actions.update_image_value({
            input_name: [input_name],

            new_value: [...state.form_data[input_name].value, ...current_selected_images_array],

            new_preview_link: [...state.form_data[input_name].additionally_tracking.preview_link, ...current_selected_images_link_array]
        })





        /* 🥔🥔 Removing Duplicated Image 🥔🥔 */


        // checking for duplicated image
        if (state.form_data[input_name].value.length !== 0 && state.form_data[input_name].additionally_tracking.preview_link.length !== 0) {


            //step-1: remove the duplicated image
            state.form_data[input_name].value.map((alreadySelected) => {

                current_selected_images_array.map((tryingToSelect: type_of_obj_with_any_values) => {

                    if (alreadySelected.name === tryingToSelect.name) {

                        let filtered_selected_images_array = state.form_data[input_name].value.filter((image) => image !== tryingToSelect)


                        actions.update_image_value({
                            input_name: [input_name],

                            new_value: [...filtered_selected_images_array],

                            new_preview_link: [...state.form_data[input_name].additionally_tracking.preview_link]
                        })

                    }

                })

            })



            // step-2: remove the duplicated image's link
            state.form_data[input_name].additionally_tracking.preview_link.map((alreadySelected) => {


                current_selected_images_link_array.map((tryingToSelect: type_of_obj_with_any_values) => {

                    if (alreadySelected.name === tryingToSelect.name) {

                        let filtered_selected_images_link_array = state.form_data[input_name].additionally_tracking.preview_link.filter((link) => link !== tryingToSelect)


                        actions.update_image_value({
                            input_name: [input_name],

                            new_value: [...state.form_data[input_name].value],

                            new_preview_link: [...filtered_selected_images_link_array]
                        })


                    }

                })

            })

        }



        /* 🥔🥔 Triggering validation check on input change 🥔🥔 */
        set_trigger_validation_check(nanoid(8))

    }



    // 🍪 handle input change on selecting an image 🍪
    const handle_input_change_on_selecting_image = (event) => {

        execute_this_when_input_changes(event.target.files)

    }



    // 🍪 handle drag over 🍪
    const handle_drag_over = (event) => {
        event.preventDefault();
    }

    // 🍪 handle input change on drag & dropping an image 🍪
    const handle_input_change_on_dropping_image = (event) => {

        event.preventDefault();

        execute_this_when_input_changes(event.dataTransfer.files)

    }



    // 🍪 handle delete change 🍪
    const handle_delete_selected_image = (deleteThis) => {

        /* 🥔🥔 deleting an image 🥔🥔 */
        let new_image_array_after_deleting_an_image = state.form_data[input_name].value.filter((image) => image.name !== deleteThis.name)

        let new_image_link_array_after_deleting_an_image = state.form_data[input_name].additionally_tracking.preview_link.filter((linkObj) => linkObj !== deleteThis)



        actions.update_image_value({
            input_name: [input_name],

            new_value: [...new_image_array_after_deleting_an_image],

            new_preview_link: [...new_image_link_array_after_deleting_an_image]
        })


  
        // set_trigger_validation_check(!trigger_validation_check_state)
    }



    // 🍪 validation function 🍪
    const validation_func = () => {

        /* 🥔🥔 Required Field Validation 🥔🥔 */
        //  only proceed to required field validation if this field is a required field.
        if (validation_info[input_name].is_required) {

            if (form_empty_field_func(state.form_data[input_name].value)) {

                actions.required_field_error({
                    input_name: [input_name],
                })
            }

            else {

                actions.no_required_field_error({
                    input_name: [input_name],
                })

            }

        }



        /* 🥔🥔 input validation  🥔🥔 */
        //  only proceed to input validation if we want to validate this field
        if (validation_info[input_name].validation.is_validating) {

            // 🧅 file limit error 
            let file_limit_error = false


            if (validation_info[input_name].validation.hasOwnProperty('accepted_total_files')) {

                const accepted_total_files = validation_info[input_name].validation.accepted_total_files

                if (state.form_data[input_name].value.length > accepted_total_files) {
                    file_limit_error = true
                }

            }



            // 🧅 file format error 
            let file_format_error = false

            if (validation_info[input_name].validation.hasOwnProperty('accepted_file_formats')) {


                const accepted_file_formats = validation_info[input_name].validation.accepted_file_formats

                const array_of_format_of_uploaded_files = state.form_data[input_name].value.map((item) => {

                    return item.name.split('.')[1]
                })


                array_of_format_of_uploaded_files.map((uploaded_file_format) => {

                    if (!accepted_file_formats.includes(uploaded_file_format)) {
                        return file_format_error = true
                    }
                })


            }




            // 🧅 file size error 
            let file_size_error = false



            if (validation_info[input_name].validation.hasOwnProperty('accepted_maximum_file_size')) {


                const accepted_maximum_file_size = validation_info[input_name].validation.accepted_maximum_file_size


                const array_of_size_of_uploaded_files = state.form_data[input_name].value.map((item) => {

                    return Math.round(item.size / 1024)
                })


                array_of_size_of_uploaded_files.map((uploaded_file_size) => {

                    if (uploaded_file_size > accepted_maximum_file_size) {
                        return file_size_error = true
                    }

                })

            }


            // 🧅  Dispatching based on error  
            if (file_limit_error || file_format_error || file_size_error) {


                actions.remove_image({
                    input_name: [input_name]
                })


                actions.validation_error({
                    input_name: [input_name]
                })
            }

            // on input change, if there is no invalid image
            else {

                actions.no_validation_error({
                    input_name: [input_name]
                })

            }


            /* ⚠️⚠️⚠️ couldn't make logic to check all the selected images dimension!*/

        }


    }



    // 🍪 executing validation function 🍪
    useEffect(() => {

        if(trigger_validation_check_state === '') return

        validation_func()

    }, [trigger_validation_check_state])




    /*__________________________________________

     ✅ JSX
    ____________________________________________*/
    return (

        <Box sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '1rem'
        })}>

            <InputLabel>{label}</InputLabel>


            <DRAG_OR_SELECT_IMAGES___CHILD
                handle_drag_over={handle_drag_over}
                handle_input_change_on_dropping_image={handle_input_change_on_dropping_image}
                handle_input_change_on_selecting_image={handle_input_change_on_selecting_image}
                input_field_ref={input_field_ref}
                handle_logically_click_the_input_on_button_click={handle_logically_click_the_input_on_button_click}
            />


            <ERROR_MESSAGE___REUSABLE
                has_a_required_field_error={state.required_field_error[input_name] === true}
                has_a_validation_error={state.validation_error[input_name] === true}
                validation_error_message={validation_info[input_name].validation.error_message()}
            />


            <IMAGE_PREVIEW___CHILD
                state={state}
                input_name={input_name}
                handle_delete_selected_image={handle_delete_selected_image}
            />


        </Box>

    )

}



/*__________________________________________

 ✅ Sections of <MUI_IMAGES___COMPONENT/>
____________________________________________*/


/* 🥔 */
function DRAG_OR_SELECT_IMAGES___CHILD({
    handle_drag_over,
    handle_input_change_on_dropping_image,
    handle_input_change_on_selecting_image,
    input_field_ref,
    handle_logically_click_the_input_on_button_click,

}) {

    return (

        <Box
            onDragOver={handle_drag_over}
            onDrop={handle_input_change_on_dropping_image}
            sx={(theme) => ({
                padding: '1rem',
                border: `2px dotted ${theme.palette.divider}`,
                borderRadius: '0.5rem',

                textAlign: 'center',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            })}>

            <CollectionsIcon
                sx={(theme) => ({
                    fontSize: '1.8rem',
                    color: theme.palette.primary.light
                })}
            />

            <Typography
                variant='body2'
                color='primary.light'
            >
                Drag & Drop or,
            </Typography>

            <input
                type="file"
                multiple
                onChange={handle_input_change_on_selecting_image}
                hidden
                ref={input_field_ref}
            />

            <Button
                onClick={handle_logically_click_the_input_on_button_click}
                variant='outlined'
                size='small'
                sx={(theme) => ({
                    color: theme.palette.primary.light,
                    ...theme.typography.body2
                })}
            >
                Select
            </Button>

        </Box>


    )

}





/* 🥔 */
function IMAGE_PREVIEW___CHILD({
    state,
    input_name,
    handle_delete_selected_image
}) {
    return (
        <>
            {!state.validation_error[input_name] && state.form_data[input_name].additionally_tracking.preview_link.length > 0 &&

                <WRAPPER_OF_SELECTED_IMAGES___STYLED>

                    {state.form_data[input_name].additionally_tracking.preview_link.map((item) => (

                        <Box key={item.link}>

                            <SELECTED_IMAGE___REUSABLE
                                src={item.link}
                                handle_click_on_remove_button={() => handle_delete_selected_image(item)}
                            />

                        </Box>

                    ))}

                </WRAPPER_OF_SELECTED_IMAGES___STYLED>


            }
        </>
    )
}


