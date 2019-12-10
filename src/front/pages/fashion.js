import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
//import ParallaxComponent from "../components/Utility/ParallaxComponent";
import MainLayout from "../components/Layout/MainLayout";
import Post from "../components/Utility/Post";
import classnames from 'classnames';
import API from '../services/api';
import BannerPages from '../components/Utility/BannerPages';
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

class Fashion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      transition: false,
      fashionId: null,
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
          this.findFashionId()
        })
      })
      .catch(e => { })
  }

  findFashionId() {
    const { categories } = this.state;
    if(!categories) return
    var image = null
    var fashionId = null

    categories.map(c => {
      if(c.title === "Fashion") {
        image = c.image
        fashionId = c._id
      }
    })

    this.setState({
      image,
      fashionId,
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
    const { image, fashionId } = this.state;
    let classes = classnames({ addAnimation: this.state.transition });

    return (
      <ParallaxProvider style={{ width: "100%" }}>
        {(!this.state.categoryLoaded && !this.state.postsLoaded) ? <Preloader /> : null}
        <BannerPages image={image} text="Fashion" classes={`events ${classes}`} left="-23vw" />
        <Post onLoad={() => this.setState({ postsLoaded: true }, () => this.removeLoader())} categoryid={fashionId} col={4} items={this.state.data} />
        <Cookies />
      </ParallaxProvider>
    );
  }
}
export default () => <MainLayout Content={Fashion} />;
