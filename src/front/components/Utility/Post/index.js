import React from 'react'
// import { postItems } from '../../../data'
//import InfiniteScroll from "react-infinite-scroll-component";
import PostDetail from './postDetail'
import LoadMore from '../LoadMore';
import API from '../../../services/api'
import { Row, Col } from 'reactstrap'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      hasMore: true,
      categories: [],
      visible: 9,
      error: false
    }
    this.loadMore = this.loadMore.bind(this);
  }

  // a fake async api call like which sends
  // 20 more records in 1.5 secs
  // fetchMoreData = () => {
  //   // setTimeout(() => {
  //   //     this.setState({
  //   //         items: this.state.items.concat(this.state.items, this.state.items)
  //   //     });
  //   // }, 1500);
  // };

  componentDidMount() {
    this.getCategouries()
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
    var id = null;
    var pageLocation = window.location.href.split("/")
    pageLocation = pageLocation[pageLocation.length - 1];

    var location = {
      outandabout: "Out & About",
      fashion: "Fashion",
      lifestyle: "Lifestyle",
    }

    categories.map(c => {
      return c.title === location[pageLocation] ? id = c._id : null
    })

    if (!id) return

    this.setState({
      id
    })

    this.getPostsList(id)
  }

  getPostsList(id, page = 0, size = 10) {
    this.setState({ loading: true })

    API.post('posts/list', {
      "page": page,
      "size": size,
      "categoryid": id
    })
      .then(res => {
        if (this.props.onLoad)
          this.props.onLoad()
        if (res.data.posts.length === 0) return
        this.setState((prevState, props) => {
          const items = this.state.items.length > 0 ? [this.state.items, ...res.data.posts] : res.data.posts
          return {
            items
          }
        })
      })
      .catch(error => {

      })
      .finally(res => {
        this.setState({ loading: false })
      }

      )
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 9 };
    });
  }

  render() {
    const { items, loading } = this.state;

    return (

      <div className="inner">
        {
          loading ? <div><h1>Loading ....</h1></div>
            : <Row className="justify-content-center pb-5">
              <Col lg={10}>
                <div className="d-flex flex-wrap post-row pt-5">
                  {items.slice(0, this.state.visible).map((ite, i) => <PostDetail index={i} data={ite} key={i} />)}
                  {this.state.visible < items.length &&
                    <LoadMore loadMoreFunc={this.loadMore} />
                  }
                </div>
              </Col>
            </Row>
        }
      </div>
    )
  }
}

export default Post

