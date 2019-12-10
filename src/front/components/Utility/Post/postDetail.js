import React from 'react'
import { Col } from 'reactstrap'
import { Parallax } from 'react-scroll-parallax'
import Masonry from '../../../services/Masonry'

const PostDetail = props => {
  const height = [ '26vw','28vw']
  const width = ['25vw', '24vw']
  const className = 'post ' + Masonry.locationInRow()
  const imageStyle = Masonry.imageSize(width, height)
  const centerPostParallax = props.index % 2 === 0 ? [0, 15] : [0, 0]

  return (
    <Col className={className}  style={imageStyle}>
      <div className="post_image">
        <Parallax styleOuter={{ maxWidth: '100%' }} y={centerPostParallax} tagOuter="div">
         
            <a href={`/${props.data.slug}`}>
              <div className="image"  style={{ backgroundImage: `url(${props.data.cover})`}}/>
            </a>
            <div className="text-center">
              <a href={`/${props.data.slug}`} style={{ color: 'unset' }}>
                <h3 className="post_title"> {props.data.title}</h3>
              </a>
              <a href={`/${props.data.slug}`} style={{ color: 'unset' }}>
                <h3 className="post_dt text-truncate">{props.data.description}</h3>
              </a>
            </div>
        
        </Parallax>
      </div>
    </Col>
  )
}

export default PostDetail