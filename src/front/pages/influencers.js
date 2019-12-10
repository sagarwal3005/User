import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import MainLayout from "../components/Layout/MainLayout";
import classnames from 'classnames';
import BannerPages from '../components/Utility/BannerPages';
import InfluencersList from '../components/Utility/InfluencersPost'
import Link from "next/link";
import API from '../services/api';
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

class Influencers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
    };
  }
  componentDidMount() {
    this.getCategouries()
  }

  getCategouries() {
    API.post('categories/list')
      .then(res => {
        this.setState({
          categories: res.data.categories
        }, () => {
          this.findLifestyleId()
        })
      })
      .catch(e => {
      })
  }

  findLifestyleId() {
    const { categories } = this.state;
    if(!categories) return
    var image = null
    var lifestyleId = null
    categories.map(c => {
      if(c.title === "Influencers") {
        image = c.image
        lifestyleId = c._id
      }
    })
    this.setState({
      image,
      lifestyleId,
      categoryLoaded: true
    }, () => this.removeLoader())
  }

  removeLoader() {
    if (this.state.categoryLoaded && this.state.postsLoaded)
      setTimeout(() => {
        this.setState({ transition: true });
      })
  }

  render() {
    const { image } = this.state;
    let classes = classnames({ addAnimation: this.state.transition });
    return (
      <ParallaxProvider style={{ width: "100%" }}>
        {(!this.state.postsLoaded && !this.state.categoryLoaded) ? <Preloader /> : null}
        <BannerPages image={image} text="Influencers" classes={`influencers ${classes}`} left="-30.5vw" />
        <h4 className="m-color bold text-center p-3">To book an influencer contact us</h4>
        <div className="d-flex justify-content-center pb-5">
          <div>
            <Link href="mailto:bookings@feedyourimage.co.uk?subject=Book an influencer">
              <a className="f-btn m-auto">
                <span>Contact us</span>
              </a>
            </Link>
          </div>

        </div>
        <InfluencersList onLoad={() => this.setState({ postsLoaded: true }, () => this.removeLoader())}  />
        <Cookies />
      </ParallaxProvider>
    );
  }
}

export default () => <MainLayout Content={Influencers} />;