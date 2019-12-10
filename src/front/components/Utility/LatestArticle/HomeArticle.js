import React, { Component } from "react";
import { Col } from 'reactstrap';
// import Link from "next/link";
// import { ParallaxBanner } from 'react-scroll-parallax';
import AOS from "aos";
import 'aos/dist/aos.css';
// import slugify from 'slugify';

export default class HomeArticle extends Component {
  componentDidMount() {
    AOS.init({
      disable: 'mobile',
    });
  }

  render() {
    const dataTitle = this.props.title;
    // const urlString = dataTitle.split(" ").join("-")
    return (
      <article className={`home-article d-flex ${this.props.justify}`}>
        <a href={`/${this.props.slug}`} className="article-link"></a>
        <Col xs={12} lg={7}
          data-aos-offset="5"
          data-aos={this.props.aosAnimation}
          data-aos-delay="100"
          data-aos-duration="1000"
          className="aos-main"
        >
          <img
            className="d-none"
            src={this.props.background}
            alt={this.props.title}
          />
          <div
            className="home-article_bg"
            style={{height:'30vw',backgroundImage:`url(${this.props.background})`}}
          >
          </div>
        </Col>

        <Col xs={12}  lg={5} className={`m-color ${this.props.side}`}>
          <div>
            <h4 className="home-article_cat">{this.props.category}</h4>
            <h3 className="home-article_title">{this.props.title}</h3>
            <div className="home-article_content">
              <div>
                {this.props.content}
              </div>
            </div>
            <div className="btn-container">
                <a className="f-btn" href={`/${this.props.slug}`}>
                  <span>Read More</span>
                </a>
            </div>
          </div>
        </Col>
      </article>
    );
  }
}
