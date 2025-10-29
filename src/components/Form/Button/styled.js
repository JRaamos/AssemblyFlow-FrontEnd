import styledCmp from 'styled-components'
import { RingLoader } from "react-spinners";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const Load = styledCmp(RingLoader).attrs(props => ({
    color: props.theme.palette[props.theme.palette[props?.color] ? props?.color : "primary"]?.[props.outline ? "main" : "contrastText"],
    loading: true,
    cssOverride: {},
    size: 20,
    'aria-label': "Loading Spinner"
}))`
`;

export const ColorButton = styled(Button)(({ theme, nospace, small, light, black, full }) => ({
    width: full && '100%',
    minHeight: small ? '40px' : '45px',
    marginTop: nospace ? '0px' : '12px',
    fontFamily: 'Fira Sans',
    fontWeight: light ? 400 : 600,
    fontSize: '16px',
    textTransform: 'none',
    boxShadow: 'none',
    whiteSpace: 'nowrap',
    color: black && theme.palette.colors.black
}));