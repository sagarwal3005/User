import React from 'react'
import { Col } from 'reactstrap'
import { Parallax } from 'react-scroll-parallax'
import Masonry from '../../../services/Masonry'
import Link from "next/link";
//<Link href={`https://www.instagram.com/${props.data.title}`} ><a classNameName="link" target="_blank">{props.data.content}</a></Link>
//<div className="image" style={imageStyle} />

const InfluencerGridItem = props => {
  const height = [ '25vw','28vw']
  const width = ['24vw', '26vw']
  const className = 'post d-flex ' + Masonry.locationInRow()
  //const imageStyle = Masonry.imageSize(width, height, { backgroundImage: `url(${props.data.cover})`, margin: "auto" })
  const imageStyle = Masonry.imageSize(width, height,{margin: "auto" })
  const centerPostParallax = props.index % 2 === 0 ? [0, 15] : [0, 0]
  
  return (
    <Col md={props.col} className={className}>
      <div className="post_image d-flex flex-column align-items-center justify-content-start ">
        <Parallax styleOuter={{ maxWidth: '100%' }} y={centerPostParallax} tagOuter="div">
          <div className="gallery">
            <div className="gallery-item">
              <div className="gallery-item-content">
                <Link href="mailto:bookings@feedyourimage.co.uk?subject=Feed Your Image Book an Influencer Query">
                  <a className="gallery-item-content-inner">
                    <img className="image" style={imageStyle} src={props.data.cover} />
                  </a>
                </Link>
             
                <div className="item-title">
                  <div className="content">
                    <h3>{props.data.description}</h3>
                    <span>{props.data.title}</span>
                  </div>
                  <div className="hover-title">
                    <h3>To Book an Influencer</h3>
                    <span>click image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    </Col>
  )
}

export default InfluencerGridItem

