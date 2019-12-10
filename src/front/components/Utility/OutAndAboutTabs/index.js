import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Col
} from "reactstrap";
import { ParallaxProvider } from "react-scroll-parallax";
import API from '../../../services/api';
import classnames from "classnames";
import LoadMore from "../LoadMore";
import EventGridItem from '../EventPost/EventGridItem';


class OutAndAboutTabs extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.fetchCities()
    this.state = {
      items: [],
      hasMore: true,
      categories: [],
      activeTab: 0,
      cities: [],
      categoryId: '',
      activePage: 0,

      total: 0,
      posts: [],
      isMore: false,

      activeLetter: undefined
    };
  }


  toggle(tab, city) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        activeCity: city,
        activePage: 0
      }, () => {
        this.getPostsList();
      });
    }
  }

  fetchCities() {
    API.post('posts/filters/cities', {
      categoryid: this.props.categoryid
    })
      .then(response => {
        console.log('cities', response.data);
        this.setState({ cities: response.data.cities }, () => {
          this.getPostsList()
        });
      });
  }

  getPostsList() {
    API.post('posts/list', {
      page: this.state.activePage,
      size: 10,
      categoryid: this.props.categoryid,
      city: this.state.activeCity,
      letter: this.state.activeLetter ? this.state.activeLetter.toLowerCase() : undefined
    })
      .then(res => {
        if (this.props.onLoad)
          this.props.onLoad()
        let posts = this.state.posts;
        if (this.state.activePage === 0)
          posts = res.data.posts;
        else
          posts = posts.concat(res.data.posts);
        this.setState({
          posts,
          total: res.data.total,
          isMore: (res.data.total !== posts.length)
        });
      })
      .catch(error => { })
  }

  renderCities() {
    return this.state.cities.map((item, index) => {
      return (
        <NavItem style={{ margin: 3 }} key={index}>
          <NavLink
            className={classnames({ active: this.state.activeTab === (index + 1) })}
            onClick={() => { this.toggle(index + 1, item); }}> {item}
          </NavLink>
        </NavItem>
      )
    })
  }

  renderPosts() {
    return this.state.posts.map((item, index) => {
      return (
        <EventGridItem index={index} data={item} key={index} col={4} />
      )
    })
  }

  renderAlphabet() {
    return ALPHABET.map((item, index) => {
      return (
        <NavItem style={{ margin: 3 }} key={index}>
          <NavLink
            onClick={() => { this.setState({ activeLetter: item }, () => this.getPostsList()) }}
            className={classnames({ active: this.state.activeLetter === item })}
          > {item}
          </NavLink>
        </NavItem>
      )
    })
  }

  render() {
    return (
      <ParallaxProvider style={{ width: "100%" }}>
        <div className="inner pb-4">
          <Col lg={10} className="m-auto">
            <Nav tabs className="d-flex justify-content-center">
              <NavItem style={{ margin: 3 }} >
                <NavLink
                  className={classnames({ active: this.state.activeTab === 0 })}
                  onClick={() => { this.toggle(0); }}>
                  All
                  </NavLink>
              </NavItem>
              {this.renderCities()}
            </Nav>
            <div className="d-flex flex-wrap post-row">
              {this.state.posts.length ?
                this.renderPosts() :
                <p
                  className="m-color"
                  style={{ textAlign: 'center', padding: 35, width: '100%', marginTop: 25 }}>NO RESULTS WERE FOUND!</p>
              }
              {this.state.isMore &&
                <LoadMore loadMoreFunc={() => {
                  this.setState({ activePage: this.state.activePage + 1 }, () => {
                    this.getPostsList()
                  })
                }} />
              }
            </div>
          </Col>
        </div>
      </ParallaxProvider>
    );
  }
}
export default OutAndAboutTabs;
