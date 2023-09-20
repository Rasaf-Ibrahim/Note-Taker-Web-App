
/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_anything } from "@/types/commonly-used-types"

// hook
import { useCallback } from "react";
import { useTheme } from "@mui/material/styles";

// particles
import Particles from "react-particles";
import { loadFull } from "tsparticles";




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function PARTICLES___REUSABLE() {


    // we will pass the following variable as prop
    const particlesInit = useCallback(async engine => {

        // console.log(engine);
        await loadFull(engine);
    }, []);


    // we will pass the following variable as prop
    const particlesLoaded = useCallback(async container => {
        // await console.log(container);
    }, []);



    //  theme 
    const theme = useTheme()







    // we will pass the following variable as prop
    const particles_configuration:type_of_anything = {

        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {

                // on click, pushing 2
                push: {
                    quantity: 1,
                },

                // on hover, repulsing, means clearing particles
                repulse: {
                    distance: 100,
                    duration: 0.8,
                },
            },
        },
        particles: {


            // shape of the particle
            shape: {
                type: "circle",
            },

            // size of different particles, we will have 1 to 4 size
            size: {
                value: { min: 1, max: 4 },
            },


            // color of a particle
            color: {
                value: theme.palette.primary.main
            },

            //  opacity of a particle
            opacity: {
                value: 0.3,
            },

            // how many particles
            number: {


                value: 50,

                // if we don't set density, then the above setup will be valid for any screen size

                // but as we are setting area size to be 1000px, so there will be 50 particles on 1000px  
                // on a mobile screen may have about 20-25 based on the width
                density: {
                    enable: true,
                    area: 1000,
                },
            },





            // how particles move
            move: {

                // we can disable the animation just by making the following option false
                enable: true,

                // particles will not move towards any specific direction as we have set none
                direction: "none",

                // speed of the animation/speed of the particles
                speed: 0.5,


                outModes: {
                    default: "bounce",
                },
                random: false,

                straight: false,
            },


            // do particles collide?
            collisions: {
                enable: true,
            },


            // when two particles links
            links: {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                distance: 50,
                enable: true,
                opacity: 0.2,
                width: 0.5,
            },


        },
        detectRetina: true,
    }



    // ✅ TSX
    return (

        //  the following component is imported from package,
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particles_configuration}
        />


    )
}