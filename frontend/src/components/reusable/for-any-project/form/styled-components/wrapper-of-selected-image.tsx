// import
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'



export const WRAPPER_OF_SELECTED_IMAGES___STYLED = styled(Box)
(({ theme }) => `

    width: 100%;
    height: auto;
    padding: 1rem;

    border-width: 2px;
    border-style: dotted;
    border-color: ${theme.palette.divider};
    border-radius: 15px;
    overflow: hidden;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`)