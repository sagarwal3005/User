import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import API from '../../../services/api'
import Slide from './slides'
import SideTitle from '../SideTitle/index';

class UpcomingEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      activeClass: " "
    }
  }

  componentDidMount() {
    this.getCategouries();
  }

  getCategouries() {
    API.post('categories/list')
      .then(res => {
        this.setState({
          categories: res.data.categories
        }, () => {
          this.findId()
        })
      })
      .catch(e => {
      })
  }

  findId() {
    const { categories } = this.state;
    if (!categories) return
    var id = null
    categories.map(c => {
      if (c.title === "Featured Events") {
        id = c._id
      }
    })
    this.getPostsList(id)
  }

  getPostsList(id) {
    API.post('posts/list', {
      "page": 0,
      "size": 4,
      "categoryid": id
    })
      .then(res => {
        console.log('dataaaaa',res.data)
        this.setState({
          data: res.data.posts
        });
        if (this.props.onLoad)
          return this.props.onLoad()
      })
      .catch(error => {
      })
  }

  renderSlides() {
    return this.state.data.map((item, index) => {
      if (index > 3) return
      return (
        <Slide className="d-flex justify-content-start" key={index} item={item} index={index} />
      );
    });
  }

  render() {
    return (
      <div className="up-event" id="event">
        <h4 className="horizontal-text">
          Featured Events
        </h4>
        <div className="inner">
        <SideTitle title="Featured Events" name="t-event"/>
          <Row className="justify-content-center">
            <Col xs={12} lg={10} className="position-static md-pt-4">
              <Row>{this.renderSlides()}</Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UpcomingEvents;
