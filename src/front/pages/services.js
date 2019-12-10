import React from "react";
import { Col, Row } from "reactstrap";
import { ParallaxProvider } from "react-scroll-parallax";
import MainLayout from "../components/Layout/MainLayout";
import AOS from 'aos';
// import 'aos/dist/aos.css';
import classnames from 'classnames';
import BannerPages from '../components/Utility/BannerPages';
import Link from "next/link";
import Cookies from '../components/Utility/Cookies';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
      cookie: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        transition: true
      })
    }, 100)
    AOS.init();
  }

  render() {
    let classes = classnames({ addAnimation: this.state.transition });
    return (
      <ParallaxProvider style={{ width: "100%" }}>
        <BannerPages image="/static/services.jpg" text="Services" classes={`services ${classes}`} left="-25.5vw" />
        <div className="m-color inner">
          <Row className="align-items-center justify-content-between pt-5 pb-3">
            <Col lg={6}>
              <img src={"/static/camera.jpg"} className="img-fluid" />
            </Col>
            <Col lg={5}
              data-aos-easing="ease-out-back"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-once="true"
              data-aos-duration="800">
              <h3 className="services_title">Event <br /> Coverage</h3>
              <p className=" pt-2">
              Creating exceptional visual content from an event is the best way to promote future
events going forward. We can film and photograph any event using the latest High-
quality equipment to ensure professional output for your business to use going forward.
              </p>
              <div>
                  <a href="mailto:hello@feedyourimage.co.uk?subject=Feed Your Image Production Query" className="f-btn">
                    <span>Contact us</span>
                  </a>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center justify-content-between pt-3 pb-3">
            <Col lg={6} className="mb">
              <img src={'/static/services-media-management.jpg'} className="img-fluid" />
            </Col>
            <Col lg={5}
              data-aos-easing="ease-out-back"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-once="true"
              data-aos-duration="800">
              <h3 className="services_title">Media <br /> Management</h3>
              <p className=" pt-2">
              Brands, Businesses and Events all require bespoke packages to engage people with
there product. We can create this engaging content across all social media platforms to
ensure users get the message instantly. As social media is ever changing, we have
developed methods and ideas to keep engagement at its highest. Management of social
media accounts and the skills required to make them stand out from your competitors
are available in several packages.
              </p>
              <div>
                <Link href="mailto:hello@feedyourimage.co.uk?subject=Feed Your Image Production Query">
                  <a className="f-btn">
                    <span>Contact us</span>
                  </a>
                </Link>
              </div>

            </Col>
            <Col lg={6} className="do">
              <img src={"/static/services-media-management.jpg"} className="img-fluid" />
            </Col>
          </Row>

          <Row className="align-items-center justify-content-between pt-3 pb-3">
            <Col lg={6}>
              <img src={"/static/Production-Manchester.jpg"} className="img-fluid" />
            </Col>
            <Col lg={5}
              data-aos-easing="ease-out-back"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-once="true"
              data-aos-duration="800">
              <h3 className="services_title">Content Creation</h3>
              <p className=" pt-2">
              FYI can film and photograph your business to create promotional material to showcase.
Research shows that, Users retain 95% of the message when they watch it in a
video and 33% of all online activity is spent watching video globally.
We have an experienced team that will film and edit spectacular footage to meet your
needs.
              </p>
              <div>
                <Link href="mailto:hello@feedyourimage.co.uk?subject=Feed Your Image Production Query">
                  <a className="f-btn">
                    <span>Contact us</span>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center justify-content-between pt-3">
            <Col lg={5}
              data-aos-easing="ease-out-back"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-once="true"
              data-aos-duration="800">
              <h3 className="services_title">Influencers</h3>
              <p className=" pt-2">
              FYI find you the right influencers to achieve your goals. The influencer market is
competitive and finding the correct one can be challenging. By understanding your
needs, we can connect you with the right people, therefore eliminating the risk of
wasting money. Our goal is to make the perfect match between influencer and client to
achieve long standing relationships.
              </p>
              <div>
                <Link as="/influencers" href="/influencers">
                  <a className="f-btn">
                    <span>View Influencers</span>
                  </a>
                </Link>
              </div>
            </Col>
            <Col lg={4}>
              <img src={"/static/services-4.jpg"} className="img-fluid" />
            </Col>
          </Row>

        </div>
        <Cookies />
      </ParallaxProvider>
    );
  }
}
export default () => <MainLayout Content={Services} />;

