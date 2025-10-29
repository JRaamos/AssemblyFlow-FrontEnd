import styledCmp from 'styled-components'

import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input'; // standard (material)
import { InputLabel } from '@mui/material';
// import Input from '@mui/material/FilledInput'; 
// import Input from '@mui/material/OutlinedInput'; 


export const MaterialInput = styled(Input)(({ theme, type, small }) => ({
    background: theme.palette.colors.backgroundgrey,
    height: small ? 40 : 48,
    borderRadius: 4,
    padding: '0 8px',
    ...(type === 'textarea' ? {
        minHeight: 180,
        verticalAlign: "top",
        display: "block"
    } : {})
}));

export const InputIcon = styledCmp.img.attrs({
})`
`;


export const InputRequired = styledCmp.b.attrs({
})`
    font-size: 14px;
    color: ${p => p.theme.palette.colors.lightgrey};
`;

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: "1rem",
    transform: "translate(0, -8px) scale(1)",
    transformOrigin: "top left",
}));