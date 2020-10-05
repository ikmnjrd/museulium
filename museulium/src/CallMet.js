import React from 'react';

const met_json = require('./metId.json');
const metObjs = met_json.metObjIds;

function CallMet() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);


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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <img src={items.primaryImage} alt="met_pic" width="500px" height="500px" />
      </div>  
    );
  }
}

export default CallMet;