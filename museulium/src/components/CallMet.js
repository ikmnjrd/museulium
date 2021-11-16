import React from 'react';
import Modal from '@mui/material/Modal';

const getModalStyle= () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: 'translate(0%, 25%)'
  };
}


const CallMet = ({metObj}) => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("https://us-central1-museulium-api-express3.cloudfunctions.net/api/met/"+metObj)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [metObj])

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
        <img 
          src={items.primaryImage}
          onClick={handleOpen}
          alt="met_pic"
          width="100px"
          height="100px"
        />
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