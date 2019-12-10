import React from "react";
//import { Container, Row } from "reactstrap";
import { ParallaxProvider } from "react-scroll-parallax";
import MainLayout from "../components/Layout/MainLayout";
import classnames from 'classnames';
import API from '../services/api';
import BannerPages from '../components/Utility/BannerPages';
import OutAndAboutTabs from '../components/Utility/OutAndAboutTabs';
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

class OutAbout extends React.Component {
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
    var categoryid = null
    categories.map(c => {
      if(c.title === "Out & About") {
        image = c.image
        categoryid = c._id
      }
    });
    this.setState({
      image,
      categoryid,
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
        {(!this.state.categoryLoaded && !this.state.postsLoaded) ? <Preloader /> : null}
        <BannerPages image={image} text="Out & About"  classes={`out ${classes}`} left="-30vw"/>
        {this.state.categoryid && <OutAndAboutTabs onLoad={() => this.setState({ postsLoaded: true }, () => this.removeLoader())} categoryid={this.state.categoryid} />}
        <Cookies />
      </ParallaxProvider>
    );
  }
}
export default () => <MainLayout Content={OutAbout} />;