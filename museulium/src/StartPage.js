import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Typography  from '@material-ui/core/Typography';
import TopImage from './bijyutsu_paint_man2.png';
import { makeStyles } from '@material-ui/core/styles';
import GridListOfPieces from './GridListOfPieces';

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #3B00ED 30%, #3ABCE4 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    fontSize: 18,
    padding: '5px 25px',
  },
});



const StartPage = () =>{
  const classes = useStyles();

  return(
    <React.Fragment >
        <Box style={{backgroundColor: "#d3d3d3"}}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={window.innerHeight *0.3}
          >
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h2">Museulium</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  <Box fontStyle="italic">
                    You have to draw within the time limit.
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Box
            display="flex"
            justifyContent="center"
            height={window.innerHeight *0.1}
          >
            <Link to="/play" style={{textDecoration: "none"}}>
              <Button variant="contained" className={classes.button}>
                Play
              </Button>
            </Link>
          </Box>
          <Box display="flex" justifyContent="center">
            <Link to="/list" style={{textDecoration: "none"}}>
              <Button variant="contained" className={classes.button}>
                Look around
              </Button>
            </Link>
          </Box>
          
          <Box height={window.innerHeight *0.6}>
            <img src={TopImage} alt="playimage" width={window.innerWidth} style={{maxWidth: 552}}/>
          </Box>
          
        </Box>
    </React.Fragment>
  )

};

export default StartPage;