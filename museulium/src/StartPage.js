import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BrushIcon from '@material-ui/icons/Brush';
import Typography  from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const StartPage = () =>{
  return(
    <React.Fragment >
        <Box bgcolor="info.main">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={window.innerHeight *0.4}
          >
            <Typography variant="h2">
              Museulium
            </Typography>
          </Box>

          <Box height={window.innerHeight *0.1}> 
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography>有名絵画の模写をするゲーム</Typography>
              </Grid>
              <Grid item>
                <Typography>制限時間は30秒</Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={window.innerHeight *0.5}
          >
            <Link to="/play" >
              <Button variant="contained" color="primary">
                play
              </Button>
            </Link>            
          </Box>
        </Box>
    </React.Fragment>
  )

};

export default StartPage;