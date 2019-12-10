import React from "react";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import SideTitle from '../SideTitle/index';

class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h4 className="horizontal-text">About</h4>
        <div className="inner">
          <SideTitle title="About" name="t-about" />
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>
              <Row className="pt-md-4">
                <Col xs={12} md={8} >
                  <p className="pt-3 h5 regular">
                    We are the leading online <a href="/lifestyle">Lifestyle</a> destination for <a href="/fashion">Fashion</a>  & <a href="/music">Music</a> news.
                    With a dedicated team focused on the progression of fashion and being <a href="/outandabout">Out & About</a> in todays
                    trendiest social environments. Visual inspirations provide knowledge on the somewhat under
                    reported scene. Devotion and commitment will see us rise to becoming the premiere online lifestyle
                    magazine destination for news and engagement in the rapidly changing and ever-growing world of tomorrow,
                    whilst embracing the information our audience require.
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-end pt-3">
                <Col xs={12} md={8}>
                  <p>
                    Spanning a comprehensive range of both <a href="/events">Events</a> and <a href="/fashion">Fashion</a>,
                    from streetwear to high-end and bespoke to popular we will be there demonstrating and reporting.
                    The FYI team has sought to make a positive contribution to evolving todays culture that we all know and love.
                    FYI’s eye-catching image has been created in house, by our highly creative and technical team,
                    building a unique platform to showcase our brand and content.
                    Built from the ground with a passionate mindset and determination to provide the best quality,
                    we have developed outstanding relations with <a href="/influencers">Influencers</a> and clients.
                    We can now offer our <a href="/services">Services</a> to highlight your brand to achieve its potential.
                  </p>
                </Col>
              </Row>
              <div className="text-center">
                <a href="/services" className="f-btn">
                  <span>Services</span>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default About;
