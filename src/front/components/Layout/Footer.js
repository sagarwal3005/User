import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Link from 'next/link';
import Socials from '../Utility/SocialIcons/Socials'
{/* <li>
<Link href="/privacyandpolicy">
  <a className="m-color" target="_blank">Privacy and Policy</a>
</Link>
</li> */}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer_inner">
          <div className="pt-4 pb-4 inner">
            <Row className="justify-content-between align-items-center">
              <Col xs={12} lg={3} className="do">
                <ul>
                  <li>
                    <a href="/events" className="m-color">Events</a>
                  </li>
                  <li>
                    <a href="/fashion" className="m-color">Fashion</a>
                  </li>
                  <li>
                    <a href="/lifestyle" className="m-color">Lifestyle</a>
                  </li>
                  <li>
                    <a href="/festivals" className="m-color">Festivals</a>
                  </li>
                  <li>
                    <a href="/vip-parties" className="m-color">VIP Parties</a>
                  </li>
                  <li>
                    <a href="/outandabout" className="m-color">Out and About</a>
                  </li>
                </ul>
              </Col>

              <Col xs={12} lg={6} className="text-center">
                <a href="/" className="logo">FYI.</a>
                <Socials className="footer_social justify-content-center pt-1" />
                <p className="pt-2">© 2019, FEEDYOURIMAGE. All Rights Reserved.</p>
                <p className="pt-2 pb-2">Website by
                    <a href="https://frisdesign.co.uk/" target="_blank"> FrisDesign</a>
                </p>
                <Link href="mailto:hello@feedyourimage.co.uk?subject=I want to Advertise with Feed Your Image">
                  <a>
                    Advertise with us
                  </a>
                </Link>
              </Col>

              <Col xs={12} lg={3} className="text-right do">
                <ul>
                  <li>
                    <a href="/music" className="m-color">Music</a>
                  </li>
                  <li>
                    <a href="/contact" className="m-color">Contact</a>
                  </li>
                  <li>
                    <a href="/services" className="m-color">Services</a>
                  </li>
                  <li>
                    <a href="/influencers" className="m-color">Influencers</a>
                  </li>

                  <li>
                    <a href="/privacy-and-policy" className="m-color">Privacy Policy</a>
                  </li>
                </ul>
              </Col>

            </Row>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
