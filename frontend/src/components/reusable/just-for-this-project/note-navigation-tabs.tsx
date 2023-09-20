import config_obj from "@/config";
import NAVIGATION_TABS___REUSABLE from "../for-any-project/navigation-tabs/navigation-tabs";



export default function NOTE_NAVIGATION_TABS___REUSABLE() {

    return (
        <>

            <NAVIGATION_TABS___REUSABLE

                tabs_info={[

                    {
                        label: 'All Notes',
                        href: config_obj.page_path.all_notes
                    },


                    {
                        label: 'Create Note',
                        href: config_obj.page_path.create_note
                    },

                ]}

            />

        </>
    )


}