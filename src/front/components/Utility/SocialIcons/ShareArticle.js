import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';
import slugify from 'slugify';


const ShareArticle = props => {
  return (
    <ul className={`d-flex footer_social social-icons ${props.className}`}>
      <li>
        <FacebookShareButton
          quote={props.title}
          url={'https://feedyourimage.co.uk' + props.url}
          hashtag={`#FYI #${slugify(props.category, '_')} #${props.title} ${props.hashtagString}`}  
          >
          <FaFacebookF />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton
          url={'https://feedyourimage.co.uk' + props.url}
          hashtags={['FYI', slugify(props.category, '_'), slugify(props.title, '_')].concat(props.hashtags)}
          title={props.title}>
          <FaTwitter />
        </TwitterShareButton>
      </li>
      <li>
        <EmailShareButton url={'https://feedyourimage.co.uk' + props.url} subject={props.title} body="Check This Out!!">
          <FaEnvelope />
        </EmailShareButton>
      </li>

    </ul>
  )
}
export default ShareArticle