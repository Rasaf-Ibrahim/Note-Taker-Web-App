import ALL_PAGE_WRAPPER___COMPONENT from "./all-page-wrapper"


// metadata
export const metadata = {
    title: 'Basic Functionalities',
    description: 'This project is made by Rasaf Ibrahim, it has almost all the basic functionalities that he knows about React.',
}


export default function ROOT_LAYOUT___COMPONENT({ children }) {

  return (

    <html lang="en">

        <body>

            <ALL_PAGE_WRAPPER___COMPONENT>
    
                {children}
                        
            </ALL_PAGE_WRAPPER___COMPONENT>

        </body>

    </html>
  )

}
