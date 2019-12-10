import React from "react";
import { ParallaxProvider} from "react-scroll-parallax";
import MainLayout from "../components/Layout/MainLayout";
import Post from "../components/Utility/Post";
// import { postItems } from "../data";
import classnames from 'classnames';
import API from '../services/api';
import BannerPages from '../components/Utility/BannerPages';
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

class Lifestyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
      data: []
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
      if(c.title === "Lifestyle") {
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
    const { image, lifeStyleId } = this.state;
    let classes = classnames({ addAnimation: this.state.transition });

    return (
      <ParallaxProvider style={{ width: "100%" }}>
        {(!this.state.categoryLoaded && !this.state.postsLoaded) ? <Preloader /> : null}
        <BannerPages image={image} text="Lifestyle" classes={`lifestyle ${classes}`}  left="-25vw"/>
        <Post onLoad={() => this.setState({ postsLoaded: true }, () => this.removeLoader())} categoryid={lifeStyleId} col={4} items={this.state.data} />
        <Cookies />
      </ParallaxProvider>
    );
  }
}
export default () => <MainLayout Content={Lifestyle} />;
