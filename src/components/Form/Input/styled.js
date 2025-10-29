import styledCmp from 'styled-components'  

import { styled } from '@mui/material/styles'; 
import Input from '@mui/material/Input'; // standard (material)
// import Input from '@mui/material/FilledInput'; 
// import Input from '@mui/material/OutlinedInput'; 


export const MaterialInput = styled(Input)(({ theme, type }) => ({  
    ...(type === 'textarea' ? {
        minHeight: 180,
        verticalAlign:"top",
        display:"block"
    } : {})
}));

export const InputIcon = styledCmp.img.attrs({ 
})`
`;


export const InputRequired = styledCmp.b.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.palette.colors.lightgrey };
`;