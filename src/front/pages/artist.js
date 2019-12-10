import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import MainLayout from "../components/Layout/MainLayout";
import classnames from 'classnames';
import API from '../services/api';
import BannerPages from '../components/Utility/BannerPages';
import MusicTabs from '../components/Utility/MusicTabs'
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

class Music extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      transition: false,
      image: null
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
      if(c.title === "Music") {
        image = c.image
        lifestyleId = c._id
      }
    })
    //console.log(image)
    this.setState({
      image,
      lifestyleId,
      categoryLoaded: true
    }, () => this.removeLoader())
  }

  removeLoader() {
    if (this.state.categoryLoaded)
      setTimeout(() => {
        this.setState({ transition: true });
      })
  }

  render() {
    const { image } = this.state;

    return (
      <ParallaxProvider style={{ width: "100%" }}>
        {(!this.state.categoryLoaded) ? <Preloader /> : null}
        <BannerPages image={image} text="Music" classes={`events ${classnames({ addAnimation: this.state.transition })}`} left="-18vw" />
        <MusicTabs />
        <Cookies />
      </ParallaxProvider>
    );
  }
}
export default () => <MainLayout Content={Music} />;
