import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Typography  from '@material-ui/core/Typography';
import TopImage from './bijyutsu_paint_man2.png';



const StartPage = () =>{
  return(
    <React.Fragment >
        <Box bgcolor="info.main">
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
                <Typography variant="h6">You have to draw within the time limit.</Typography>                        
              </Grid>
            </Grid>
          </Box>
          
          <Box
            display="flex"
            justifyContent="center"
            height={window.innerHeight *0.1}
          >
            <Link to="/play" >
              <Button variant="contained" color="primary">
                play
              </Button>
            </Link>
          </Box>
          
          <Box height={window.innerHeight *0.6}>
            <img src={TopImage} alt="playimage" width={window.innerWidth}/>
          </Box>
          
        </Box>
    </React.Fragment>
  )

};

export default StartPage;