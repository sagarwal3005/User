import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from 'prop-types';
import InfluencerGridItem from "./InfluencerGridItem";
import API from "../../../services/api";
import LoadMore from "../LoadMore"

class InfluencersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      image: null,
      influencersId: null,

      items: [],
      visible: 9,
      error: false
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.getCategouries();
  }

  getCategouries() {
    API.post("categories/list")
      .then(res => {
        this.setState(
          {
            categories: res.data.categories
          },
          () => {
            this.findInfluencersId();
          }
        );
      })
      .catch(e => { });
  }

  findInfluencersId() {
    const { categories } = this.state;
    if (!categories) return;
    var image = null;
    var influencersId = null;
    categories.map(c => {
      if (c.title === "Influencers") {
        image = c.image;
        influencersId = c._id;
      }
    });

    this.setState({
      image,
      influencersId
    });
    this.getPostsList(influencersId);
  }

  getPostsList(id, page = 0, size = 10) {
    API.post("posts/list", {
      page: page,
      size: size,
      categoryid: id
    })
      .then(res => {
        if (this.props.onLoad)
          this.props.onLoad()
        if (res.data.posts.length === 0) return;
        this.setState((prevState, props) => {
          const items =
            this.state.items.length > 0
              ? [this.state.items, ...res.data.posts]
              : res.data.posts;
          return {
            items: res.data.posts
          };
        });
      })
      .catch(error => { });
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 9 };
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="inner">
        <Row className="pb-5 justify-content-center">
          <Col md={10}>
            <div className="d-flex flex-wrap post-row">
              {items.slice(0, this.state.visible).map((ite, i) => (
                <InfluencerGridItem index={i} data={ite} key={i} col={4} />
              ))}
              {this.state.visible < items.length &&
                <LoadMore loadMoreFunc={this.loadMore} />
              }
            </div>
          </Col>

        </Row>
      </div>
    );
  }
}

export default InfluencersList;

InfluencersList.defaultProps = {
  data: []
}
InfluencersList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};