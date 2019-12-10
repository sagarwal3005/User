import React, { Component } from 'react'
import MainLayout from '../components/Layout/MainLayout'
import { ParallaxProvider } from 'react-scroll-parallax';
import EventList from '../components/Utility/EventPost'
import classnames from 'classnames';
import API from '../services/api';
import BannerPages from '../components/Utility/BannerPages';
import Preloader from '../components/Utility/Preloader';
import Cookies from '../components/Utility/Cookies';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transition: false,
      data: [],
      image: null,
      eventId: null
    }
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
          this.findEventId()
        })
      })
      .catch(e => {
      })
  }

  findEventId() {
    const { categories } = this.state;
    if (!categories) return;

    if (!categories) return
    var foundCategory = null;
    var pageLocation = window.location.href.split("/")
    pageLocation = pageLocation[pageLocation.length - 1];
    var location = {
      "events": "Events",
      "featured-events": "Featured Events"
    }
    categories.map(c => {
      if (c.title === location[pageLocation]) {
        foundCategory = c;
      }
      return null;
    });
    if (!foundCategory) return null;
    this.setState({
      categoryLoaded: true,
      image: foundCategory.image,
      eventId: foundCategory._id,
    }, () => { this.removeLoader() })
  }

  removeLoader() {
    if (this.state.categoryLoaded && this.state.eventsLoaded)
      setTimeout(() => {
        this.setState({ transition: true });
      })
  }

  render() {
    const { image } = this.state;

    return (
      <ParallaxProvider style={{ width: "100%" }}>
        {(!this.state.categoryLoaded && !this.state.eventsLoaded) ? <Preloader /> : null}
        {this.state.categoryLoaded &&
          <BannerPages
            image={image} text="Events"
            classes={`events ${classnames({ addAnimation: this.state.transition })}`}
            left="-22vw" />
        }
        <EventList onLoad={() => { this.setState({ eventsLoaded: true }, () => this.removeLoader()) }} col={4} />
        <Cookies />
      </ParallaxProvider>
    )
  }
}

export default () => <MainLayout Content={Events} />