import React from 'react';
import Modal from 'react-modal';
import Backdrop from '@material-ui/core/Backdrop';

const met_json = require('./metId.json');
const metObjs = met_json.metObjIds;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function CallMet() {
  // API part
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  // Modal part
  const [modalIsOpen,setIsOpen] = React.useState(false);

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

  // Modal part
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <img src={items.primaryImage} onClick={openModal} alt="met_pic" width="100px" height="100px" />

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Odaimoku-Modal"
        >
          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>お題</h2> */}
          <img src={items.primaryImage} alt="met_pic" width={window.innerWidth} height={window.innerHeight *0.6} />
        </Modal>

      </React.Fragment>  
    );
  }
}

export default CallMet;