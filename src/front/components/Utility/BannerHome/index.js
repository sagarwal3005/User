import React from 'react';
import ParallaxComponent from '../ParallaxComponent'

class BannerHome extends React.Component {
  render() {
    return (
      <div className="home-banner main-banner" >
        <div className="d-flex h-100">
          <div className="home-banner_main">
            <div className="banner">
              <div className="banner_container">
                <div className="banner_main">
                  <ParallaxComponent text='Fashion X' x={['0px', '-100px']} style={{ top: '42%', position: "absolute", zIndex: 6, left: "-24vw" }} />
                  <ParallaxComponent text='Lifestyle' x={['0px', '0px']} style={{ top: '42%', position: "absolute", zIndex: 6, left: "5.5vw" }} />
                  <ParallaxComponent text='X music' x={['0px', '100px']} style={{ top: '42%', position: "absolute", zIndex: 6, right: "-17vw" }} />
                </div>
              </div>
              <ParallaxComponent text='Fashion X' x={['0px', '-100px']} style={{top: '42%', position: "absolute", zIndex: 7, left: "-24vw" }} />
              <ParallaxComponent text='Lifestyle' x={['0px', '0px']} style={{ top: '42%', position: "absolute", zIndex: 7, left: "5.5vw" }} />
              <ParallaxComponent text='X music' x={['0px', '100px']} style={{ top: '42%', position: "absolute", zIndex: 7, right: "-17vw" }} />
            </div>
            <div className="mb">
              <h2 className="h2">Music</h2>
              <h2 className="h2">Fashion</h2>
              <h2 className="h2">Lifestyle</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default BannerHome