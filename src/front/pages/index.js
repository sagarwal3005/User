import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import classnames from 'classnames';
import MainLayout from '../components/Layout/MainLayout';
import LatestArticle from '../components/Utility/LatestArticle';
import BannerHome from '../components/Utility/BannerHome';
import UpcomingEvents from '../components/Utility/UpcomingEvents';
import About from '../components/Utility/About';
import Preloader from '../components/Utility/Preloader';
import Cookies from '../components/Utility/Cookies';
import Socials from '../components/Utility/SocialIcons/Socials'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
      articlesLoaded: false,
      eventsLoaded: false
    }
  }

  removeLoader() {
    if (this.state.articlesLoaded && this.state.eventsLoaded)
      setTimeout(() => {
        this.setState({ transition: true })
      }, 1000);
  }

  render() {
    return (
      <ParallaxProvider style={{ width: "100%" }}>
        <React.Fragment>
          <div className={`main ${classnames({ addAnimation: this.state.transition })}`}>
            <BannerHome />

            <Socials className="main-page_socials" />
            <div className="pt-2 mt-2 do" />
            <LatestArticle onLoad={() => { this.setState({ articlesLoaded: true }); this.removeLoader() }} />


            <UpcomingEvents onLoad={() => { this.setState({ eventsLoaded: true }); this.removeLoader() }} />

            <div className="pt-5 mt-md-5" />
            <About />
            {(!this.state.articlesLoaded && !this.state.eventsLoaded) && <Preloader />}

          </div>
          <Cookies />
        </React.Fragment>
      </ParallaxProvider>
    )

  }
}

export default () => <MainLayout Content={Home} />