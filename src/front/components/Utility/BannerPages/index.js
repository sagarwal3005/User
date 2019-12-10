import React from 'react';
import ParallaxComponent from '../ParallaxComponent'
import { Row } from "reactstrap";

class BannerPages extends React.Component {
  render() {
    const { text, classes,left,image } = this.props;
    console.log(image)
    return (
      <div className={`${classes}`}>
        <div className="home-banner">
         
            <div className=" banner_parent">
              <div className="d-flex h-100 justify-content-end">
                <div className="banner_holder">
                  <div className="banner">
                    <div className="banner_container">
                      <div id="#banner_pages" className="banner_main">
                        <style>{`
                          .home-banner .banner_main:after {
                            background-image: url(${image}) !important;
                          }
                        `}</style>
                        <ParallaxComponent
                          text={text}
                          x={["0%", "50%"]}
                          style={{
                            top: "40%",
                            position: "absolute",
                            zIndex: 6,
                            left: left,
                            color:'white'
                          }}
                        />
                      </div>
                    </div>

                    <ParallaxComponent
                      text={text}
                      x={["0%", "50%"]}
                      style={{
                        top: "40%",
                        position: "absolute",
                        zIndex: 7,
                        left: left,
                        color:'#3cc0ce'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
       
        </div>
      </div>
    )
  }
}
export default BannerPages