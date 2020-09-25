// import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';
import CursedTimerULiLTtf from '../public/static/fonts/CursedTimerULiL/CursedTimerULiL.ttf'; // '../public/static/fonts/CursedTimerULiL/CursedTimerULiL.ttf;
// import { esES } from '@material-ui/core/locale';

const cursedTimerULiL = {
  fontFamily: 'Cursed Timer ULiL',
  fontStyle: 'normal',
  fontWeight: 100,
  src: `
  url(${CursedTimerULiLTtf})
  `,
};

const themeDark = createMuiTheme({
  palette: {
    primary: { main: '#192029' },
    secondary: { main: '#4e99c9' },
    background: {
      default: '#060606',
      paper: '#0f1319',
    },
    text: {
      primary: '#ddd',
      secondary: '#999',
    },
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [cursedTimerULiL],
      },
    },
  },
});

const themeLight = createMuiTheme({
  palette: {
    primary: { main: '#192029' },
    secondary: { main: '#008eb5' },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    type: 'light',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [cursedTimerULiL],
      },
    },
  },
  // overrides: {
  //   MuiIconButton: {
  //     // Name of the component ⚛️ / style sheet
  //     root: {
  //       // Name of the rule
  //       color: 'white', // Some CSS
  //     },
  //     label: {
  //       color: '#000',
  //     },
  //   },
  // },
  // spacing: 6,
  // typography: {
  //   // Tell Material-UI what's the font-size on the html element is.
  //   // htmlFontSize: 18,
  //   fontSize: 14,
  // },
});

export { themeDark, themeLight };
