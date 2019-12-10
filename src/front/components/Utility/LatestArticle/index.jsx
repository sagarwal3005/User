import React, { Component } from "react";
import HomeArticle from "./HomeArticle";
import API from "../../../services/api";
import { Row, Col } from "reactstrap";
import SideTitle from '../SideTitle/index';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

export default class LatestArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ids: [],
    };
  }

  componentDidMount() {
    this.getCategouries();
  }

  getCategouries() {
    API.post("categories/list")
      .then(res => {
        this.setState({ categories: res.data.categories },
          () => { this.findIds(); }
        );
      })
      .catch(e => { });
  }

  findIds() {
    const { categories } = this.state;
    if (!categories) return;
    var ids = [];
    categories.map(c => {
      if (c.title === "Music") {
        ids.push(c._id);
        this.setState({
          musicId: c._id
        });
      }

      if (c.title === "Lifestyle") {
        ids.push(c._id);
        this.setState({
          lifestyleId: c._id
        });
      }

      if (c.title === "Fashion") {
        ids.push(c._id);
        this.setState({
          fashionId: c._id
        });
      }
    });

    this.setState(
      {
        ids,
        transition: true
      },
      () => {
        this.getLatest();
      }
    );
  }

  getLatest() {
    const { ids } = this.state;
    const model = {
      categoryids: [...ids]
    };

    API.post("posts/latests", model).then(res => {
      this.setState({
        data: res.data
      });
      if (this.props.onLoad)
        return this.props.onLoad();
    });
  }

  renderMusic() {
    const { data, musicId } = this.state;
    return isArray(data) && data.map(item => {
      return item.categoryid === musicId && this.renderMusicContent(item);
    });
  }

  renderMusicContent(data) {
    if (!data.posts || !data.posts.length) return;
    const value = {
      title: data.posts ? data.posts[0].title : null,
      content: data.posts ? data.posts[0].description : null,
      background: data.posts ? data.posts[0].cover : null,
      id: data.posts ? data.posts[0]._id : null,
      slug: data.posts ? data.posts[0].slug : null,
    };
    return (
      <HomeArticle
        id={"Music"}
        justify="justify-content-end"
        background={value.background}
        side="left"
        aosAnimation="slide-up"
        category="Music"
        slug={value.slug}
        title={value.title}
        content={value.content}
        urlId={value.id}
        key={value.id}
      />
    );
  }

  renderFashion() {
    const { data, fashionId } = this.state;
    return isArray(data) && data.map(item => {
      return item.categoryid === fashionId && this.renderFashionContent(item);
    });
  }

  renderFashionContent(data) {
    if (!data.posts || !data.posts.length) return;
    const value = {
      title: data.posts ? data.posts[0].title : null,
      content: data.posts ? data.posts[0].description : null,
      background: data.posts ? data.posts[0].cover : null,
      id: data.posts ? data.posts[0]._id : null,
      slug: data.posts ? data.posts[0].slug : null,
    };

    return (
      <HomeArticle
        id={"Fashion"}
        justify="justify-content-start"
        side="right"
        aosAnimation="slide-up"
        background={value.background}
        category="Fashion"
        title={value.title}
        slug={value.slug}
        content={value.content}
        urlId={value.id}
        key={value.id}
      />
    );
  }

  renderLifestyle() {
    const { data, lifestyleId } = this.state;
    return isArray(data) && data.map(item => {
      return (
        item.categoryid === lifestyleId && this.renderLifestyleContent(item)
      );
    });
  }

  renderLifestyleContent(data) {
    if (!data.posts || !data.posts.length) return;
    const value = {
      title: data.posts ? data.posts[0].title : null,
      content: data.posts ? data.posts[0].description : null,
      background: data.posts ? data.posts[0].cover : null,
      id: data.posts ? data.posts[0]._id : null,
      slug: data.posts ? data.posts[0].slug : null,
    };

    return (
      <HomeArticle
        id={"Lifestyle"}
        side="left"
        aosAnimation="slide-up"
        justify="justify-content-end"
        category="Lifestyle"
        background={value.background}
        title={value.title}
        slug={value.slug}
        content={value.content}
        urlId={value.id}
        key={value.id}
      />
    );
  }

  render() {
    return (
      <div className="latest">
        <h4 className="horizontal-text">Latest</h4>
        <div className="inner">
          <SideTitle title="Latest" name="t-latest" />
          <Row className="justify-content-center">
            <Col sm={12} lg={10} className="p-0 position-static sm-pt-5">
              {this.renderMusic()}
              {this.renderFashion()}
              {this.renderLifestyle()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

LatestArticle.defaultProps = {
  data: []
}
LatestArticle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};