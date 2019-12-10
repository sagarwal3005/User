import React from "react";
import LoadMore from '../LoadMore';
import PostDetail from '../Post/postDetail'
import API from '../../../services/api';

class Manchester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: null,
      outId: null,
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
    API.post('categories/list')
      .then(res => {
        this.setState({
          categories: res.data.categories,

        }, () => {
          this.findOutId()
        })
      })
      .catch(e => {
      })
  }

  findOutId() {
    const { categories } = this.state;
    if (!categories) return
    var image = null
    var outId = null
    categories.map(c => {
      if (c.title === "Out & About") {
        image = c.image
        outId = c._id
      }
    })

    this.setState({
      image,
      outId
    })
    this.getPostsList(outId)
  }

  getPostsList(id, page = 0, size = 10) {
    API.post('posts/list', {
      "page": page,
      "size": size,
      "categoryid": id
    })
      .then(res => {
        if (res.data.posts.length === 0) return
        let filterLocation = res.data.posts.filter(function(item){
          return item.location =="Manchester"
        })
        this.setState((prevState, props) => {
          const items = this.state.items.length > 0 ? [this.state.items, ...res.data.posts] : res.data.posts
          return {
            items: filterLocation
          }

        })
      })
      .catch(error => {
      })
  }


  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 9 };
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="d-flex flex-wrap pb-5">
        {items.slice(0, this.state.visible).map((ite, i) => <PostDetail index={i} data={ite} key={i} col={4} />)}
        {this.state.visible < items.length &&
          <LoadMore loadMoreFunc={this.loadMore} />
        }
      </div>
    );
  }
}

export default Manchester
