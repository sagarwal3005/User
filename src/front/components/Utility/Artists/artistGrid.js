import React from 'react'
import { Col } from 'reactstrap'
import { Parallax } from 'react-scroll-parallax'
import Masonry from '../../../services/Masonry'
import Link from "next/link";

const ArtistGrid = props => {
  const height = ['380px', '300px']
  const width = ['415px', '300px']
  const className = 'post d-flex mt-3 mb-5 ' + Masonry.locationInRow()
  const imageStyle = Masonry.imageSize(width, height, { backgroundImage: `url(${props.data.img})`, margin: "auto" })
  const centerPostParallax = props.index % 2 === 0 ? [0, 15] : [0, 0]

  return (
    <Col md={props.col} className={className}>
      <div className="post_image d-flex flex-column align-items-center justify-content-start ">
        <Parallax styleOuter={{ maxWidth: '100%' }} y={centerPostParallax} tagOuter="div">
          <div className="image" style={imageStyle} />
          <div className="text-center">
            <h3 className="post_title">{props.data.title}</h3>
          </div>
          <Link><a className="link" href="/article"></a></Link>
        </Parallax>
      </div>
    </Col>
  )
}

export default ArtistGrid