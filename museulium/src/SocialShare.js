import React from 'react';
import {useParams} from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const SocialShare = (props) =>{
  let pieceId = useParams().id;

  return(
    <React.Fragment>
      <ul>
        <TwitterShareButton 
          url= {"https://museulium.com/p/"+pieceId}
        >
          <TwitterIcon size="32" round/>
        </TwitterShareButton>
      </ul>
      <ul>
        <FacebookShareButton 
          url={"https://museulium.com/p/"+pieceId}
        >
          <FacebookIcon size="32" round/>
        </FacebookShareButton>
      </ul>
      <ul>
        <LineShareButton 
          url= {"https://museulium.com/p/"+pieceId}
        >
          <LineIcon size="32" round/>
        </LineShareButton>
      </ul>
    </React.Fragment>
  )
};
export default SocialShare;