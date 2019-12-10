import React, { Component } from 'react'
import { Col } from 'reactstrap';
// import hoverEffect from '../../assets/hover';
// import hoverEffect from 'hover-effect'
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class Distortion extends Component {
  componentDidMount() {
    // new hoverEffect({
    //     parent: document.getElementById(this.props.id),
    //     intensity: 0.9,
    //     image1: 'https://i.ytimg.com/vi/_SKVzodhvu4/maxresdefault.jpg',
    //     image2: 'https://i.ytimg.com/vi/_SKVzodhvu4/maxresdefault.jpg',
    //     displacementImage: 'https://i.ytimg.com/vi/_SKVzodhvu4/maxresdefault.jpg'
    // })
    AOS.init()
  }


  render() {
    // const Background = 'https://i.ytimg.com/vi/_SKVzodhvu4/maxresdefault.jpg'
    return (
      <article className={`f-article row ${this.props.justify}`}>
        <Col md={9} className="aos-container">
          <div data-aos-easing="ease-out-back"
            data-aos={this.props.aosAnimation}
            data-aos-delay="300"
            data-aos-duration="1000"
            data-aos-once="true">
            <div className="p-0">
              <div className="distorion" style={{ backgroundImage: `url(${this.props.background})`, width: "100%", height: "13rem" }} id={this.props.id} />
              {/* <div className={`m-color difference ${this.props.side}`}>
                        <h4 className="f-article_cat">
                            <Link href="/new">{this.props.category}</Link>
                        </h4>
                        <h3 className="f-article_title">{this.props.title}</h3>
                        <p className="f-article_text">
                            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    </p>
                        <div>
                            <a href="/blogs/carbon-journey" className="f-btn">
                                <span>Read More</span>
                            </a>
                        </div>
                    </div> */}
            </div>
          </div>
        </Col>


        <Col md={3} className={`m-color ${this.props.side}`}>
          <h4 className="f-article_cat">
            <Link href="/new">{this.props.category}</Link>
          </h4>
          <h3 className="f-article_title">{this.props.title}</h3>
          <p className="f-article_text">
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    </p>
          <div>
            <a href="/blogs/carbon-journey" className="f-btn">
              <span>Read More</span>
            </a>
          </div>
        </Col>
      </article>
    )
  }
}