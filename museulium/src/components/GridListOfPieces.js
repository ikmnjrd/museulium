import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import firebase from '../firebase'

const useStyles = makeStyles((theme) => ({
  pieces_area: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
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


  React.useEffect(() => {
    (async() => {
      const pieces = await getPieces();
    
      const images = await Promise.all(pieces.map(async(img) => {
      const url = await getStorageItem(img.url);

        return {url: url, metObjID: img.metObjID}
      }));

      setImages(images);
    })();
  }, []);
  
  
  return (
    <div className={classes.pieces_area}>
      <ImageList cols={6} className={classes.gridList}>
        {images.map((item) => (
          <ImageListItem key={item.url}>
            <img src={item.url} alt={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
export default ImageListOfPieces;