import styledCmp from 'styled-components' 
import { RingLoader } from "react-spinners";

import { styled } from '@mui/material/styles'; 
import Button from '@mui/material/Button'; 

export const Load = styledCmp(RingLoader).attrs( props => ({
    color:  props.theme.palette[ props.theme.palette[props?.color] ? props?.color : "primary"]?.[props.outline ? "main" : "contrastText"],
    loading: true,
    cssOverride:{},
    size:20,
    'aria-label':"Loading Spinner"
}))`
`;

export const ColorButton = styled(Button)(({ theme, nospace }) => ({
    width:'100%',
    minHeight: '45px',
    marginTop: nospace ? '0px' : '12px'
}));