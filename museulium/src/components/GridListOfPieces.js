import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import firebase from '../firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  // },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));



const getPieces = async() =>{
  return firebase.database().ref('/p').orderByValue().once('value').then((snapshot) => {

    const results = [];
    snapshot.forEach((data) => {
      results.push({url: data.val().piece , metObjID: data.val().metObjID });
    });
    return results;
  });
}

const getStorageItem = async (id) =>{
  const test = await firebase.storage().ref('p/'+id+'.jpg').getDownloadURL();
  return test
}




const GridListOfPieces = () => {
  const classes = useStyles();
  const [images, setImages] = React.useState([]);


  React.useEffect(async() => {
    const pieces = await getPieces();
    
    const images = await Promise.all(pieces.map(async(img) => {
      const url = await getStorageItem(img.url);

      return {url: url, metObjID: img.metObjID}
    }));

    setImages(images);
  }, []);
  
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={540} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {images.map((item) => (
          <GridListTile key={item.url}>
            <img src={item.url} alt={item.title} />
            {/* <GridListTileBar
              title="title"
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default GridListOfPieces;