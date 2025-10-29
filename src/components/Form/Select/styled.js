import styledCmp from 'styled-components' 

import { styled } from '@mui/material/styles'; 
import Select from '@mui/material/Select';

export const MaterialSelect = styled(Select)(({ theme, ...props }) => ({  
}));

export const InputRequired = styledCmp.b.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.palette.colors.lightgrey };
`;