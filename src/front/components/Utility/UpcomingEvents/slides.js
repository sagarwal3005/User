import React from 'react'
import { Col } from 'reactstrap'
import { Parallax } from 'react-scroll-parallax';
import slugify from 'slugify';

const Slide = props => {
  const oddClass = props.index % 2 === 1 ? "odd" : "";
  const dataTitle = props.item.title;

  return (
    <Col md={3} xs={6} key={props.index}>
      <Parallax y={[-10, 10]} tagOuter="div">
        <div className={`gallery ${oddClass}`}>
          <div className="gallery-item">
            <div className="gallery-item-content">
              <a href={`/${(props.item.slug)}`} className="gallery-item-content-inner">
                <img
                  className="image"
                  src={props.item.cover}
                  alt={props.item.altText}
                />
              </a>
            </div>
          </div>
        </div>
        <a href={`/${(props.item.slug)}`} style={{color: 'unset'}}>
          <h3 className="pt-3 h6 text-center">{props.item.title}</h3>
        </a>
        <a href={`/${slugify(props.item.slug)}`} style={{color: 'unset'}}>
          <h4 className="small text-truncate text-center">{props.item.description}</h4>
        </a>
      </Parallax>
    </Col>
  );
};

export default Slide