import React from 'react';
import Box from '@material-ui/core/Box';
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

  return(
    <React.Fragment>
      <ul>
        <TwitterShareButton 
          url="https://museulium-cb08f.web.app/"
        >
          <TwitterIcon size="32" round/>
        </TwitterShareButton>
      </ul>
      <ul>
        <FacebookShareButton 
          url="https://museulium-cb08f.web.app/"
        >
          <FacebookIcon size="32" round/>
        </FacebookShareButton>
      </ul>
      <ul>
        <LineShareButton 
          url="https://museulium-cb08f.web.app/"
        >
          <LineIcon size="32" round/>
        </LineShareButton>
      </ul>
    </React.Fragment>
  )
};
export default SocialShare;