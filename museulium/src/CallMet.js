import React from 'react';
import Modal from '@material-ui/core/Modal';

const met_json = require('./metId.json');
const metObjs = met_json.metObjIds;

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: 'translate(0%, 25%)'
  };
}


function CallMet() {
  // API part
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  // Modal part
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  // API part
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    const random_obj = metObjs[Math.floor( Math.random() * metObjs.length)];
    fetch("https://us-central1-museulium-api-express3.cloudfunctions.net/api/met/"+random_obj)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  //Modal part
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
      <img src={items.primaryImage} onClick={handleOpen} alt="met_pic" width="100px" height="100px" />

        <Modal
          open={open}
          onClose={handleClose}
        >
          <img 
            src={items.primaryImage} 
            alt="met_pic" 
            width={window.innerWidth} 
            height={window.innerHeight *0.6}
            style={modalStyle}
            
          />
        </Modal>
      </React.Fragment>  
    );
  }
}

export default CallMet;