import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  mode: 'light',
  palette: {
    primary: {
      main: '#06346b',
      contrastText: '#fff',
    },
    blue: {
      main: '#40B2FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e86c30',
      contrastText: '#fff',
      warning: 'rgba(255, 59, 48, 0.1)'
    },
    lightBlue: {
      main: '#3885B9',
      contrastText: '#fff',
    },
    white: {
      main: '#ffffff',
      contrastText: '#06346b',
    },
    light: {
      main: '#ffffff',
      contrastText: '#000',
    },
    error: {
      main: '#FF3B30',
      contrastText: '#000',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#a4a4a4',
      contrastText: '#fff',
    },
    action: {
      main: '#EDEDED',
      contrastText: '#000'
    },
    black: {
      main: '#000',
      contrastText: '#000'
    },
    success: {
      main: '#66bb6a',
    },
    tertiary: {
      main: '#58B49A'
    },
    chart: {
      main: '#00E396'
    },
    red: {
      main: '#FF3B30',
      contrastText: '#fff'
    },
    background: {
      primary: '#E6E6E6'
    },
    status: {
      'example': '#20D356',
      'status1': '#20D356',
      'status2': '#009DB0',
      'status3': '#EEAE00',
      'status4': '#FF004D',
      'Concluido': '#20D356',
      'Aberto': '#009DB0',
      'Em andamento': '#EEAE00',
      'Inativado': '#FF004D',

      other: '#E6E6E6'
    },
    report: {
      main: '#CCCCCC',
      contrastText: '#000'
    },
    severity: {
      main: 'rgba(219, 189, 107, 0.2)',
      contrastText: '#000',
      alto: 'rgba(255, 0, 77, 0.2)',
      medio: 'rgba(238, 174, 0, 0.2)',
      baixo: 'rgba(32, 211, 86, 0.2)'
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      grey: '#666666',
      backgroundgrey: '#F7F7F7',
      inputbackground: '#F2F2F2',
      lightgrey: '#A4A4A4',
      shadow: 'rgba(0,0,0,.16)',
      lightshadow: 'rgba(112,112,112,.06)'
    }
  },
});

export const darkTheme = createTheme({
  mode: 'dark',
  palette: {
    primary: {
      main: '#40B2FF',
      contrastText: '#000',
    },
    secondary: {
      main: '#e86c30',
      contrastText: '#000',
    },
    white: {
      main: '#1E1E1E',
      contrastText: '#fff',
    },
    light: {
      main: '#2A2A2A',
      contrastText: '#fff',
    },
    error: {
      main: '#FF3B30',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffa726',
      contrastText: '#000',
    },
    info: {
      main: '#a4a4a4',
      contrastText: '#000',
    },
    action: {
      main: '#333333',
      contrastText: '#fff',
    },
    black: {
      main: '#ffffff',
      contrastText: '#000',
    },
    success: {
      main: '#66bb6a',
      contrastText: '#000',
    },
    tertiary: {
      main: '#58B49A',
      contrastText: '#000'
    },
    chart: {
      main: '#00E396'
    },
    background: {
      primary: '#121212'
    },
    status: {
      status1: '#20D356',
      status2: '#009DB0',
      status3: '#EEAE00',
      status4: '#FF004D',
    },
    report: {
      main: '#333333',
      contrastText: '#fff'
    },
    severity: {
      main: 'rgba(219, 189, 107, 0.2)',
      contrastText: '#fff',
      primary: 'rgba(255, 0, 77, 0.2)',
      secondary: 'rgba(238, 174, 0, 0.2)',
      tertiary: 'rgba(32, 211, 86, 0.2)'
    },
    colors: {
      white: '#1e1e1e',
      black: '#ffffff',
      grey: '#aaaaaa',
      backgroundgrey: '#1c1c1c',
      inputbackground: '#2b2b2b',
      lightgrey: '#888888',
      shadow: 'rgba(0, 0, 0, 0.6)',
      lightshadow: 'rgba(255, 255, 255, 0.06)'
    }
  },
});