import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const custom_theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        color: 'white',
      },
    },

  },
});

const useStyles = makeStyles((theme) => ({
  selectButton: {
    // margin: 0,
    // left: 'auto',
    // right: 10,
    // position: 'fixed',
    backgroundColor: 'primary',
  },
  selectLabel: {
    color: 'white',
  },
}));


const Tools = ({getToolChild, setToolChild}) => {


  const classes = useStyles();


  return (
    <ThemeProvider theme={custom_theme}>
      <FormControl variant="outlined" className={classes.selectButton}>
        <InputLabel className={classes.selectLabel}>Tools</InputLabel>
        <Select
          value={getToolChild().tool}
          onChange={ e => {setToolChild(e.target.value)}}
        >
          <MenuItem value="pen">Pen</MenuItem>
          <MenuItem value="eraser">Eraser</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>

  );
}

export default Tools;