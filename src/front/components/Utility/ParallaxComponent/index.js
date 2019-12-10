import React from 'react';
import { Parallax } from 'react-scroll-parallax';


const ParallaxComponent = props => {
  const style = props.style
  return (
    <Parallax x={props.x} styleOuter={style}>
      <h2 className="h1">
        <span>{props.text}</span>
      </h2>
    </Parallax>
  )
}
export default ParallaxComponent