import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: blue[900],
    },
    primary: {
      main: blue[900],
    },
    secondary: {
      main: blue[700],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;