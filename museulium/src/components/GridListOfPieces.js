import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
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




const ImageListOfPieces = () => {
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
      <ImageList cellHeight={540} className={classes.gridList}>
        {/* <ImageListItem key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem> */}
        {images.map((item) => (
          <ImageListItem key={item.url}>
            <img src={item.url} alt={item.title} />
            {/* <ImageListItemBar
              title="title"
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            /> */}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
export default ImageListOfPieces;