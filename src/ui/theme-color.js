import { createTheme } from '@mui/material/styles'; 

export const theme = createTheme({
  mode: 'light',
  palette: {
    primary: {
      main: '#06346b', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#e86c30',
      contrastText: '#fff',
    },
    white: {
      main: '#ffffff',
      contrastText: '#06346b',
    },
    error: {
      main: '#dd4952',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#a4a4a4',
      contrastText: '#fff',
    },
    success: {
      main: '#66bb6a',
    },
    colors:{
        white: '#ffffff',
        black: '#000000',
        grey: '#4C4C4C',
        backgroundgrey: '#F7F7F7',
        lightgrey: '#A4A4A4',
        shadow: 'rgba(0,0,0,.16)',
        lightshadow: 'rgba(112,112,112,.06)'
    }
  },
});  