import React from "react";
// import PostDetail from '../Post/postDetail'
import API from '../../../services/api';
import EventGridItem from './EventGridItem'
import LoadMore from "../LoadMore"

class MainEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: null,
      eventId: null,    
      items:[],
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
          this.findMainEventId()           
        })
      })
      .catch(e => {
      })
  }

  findMainEventId() {
    const { categories } = this.state;
    if (!categories) return
    var image = null
    var eventId = null
    categories.map(c => {
      if (c.title === "Events") {
        image = c.image
        eventId = c._id
      }
    })

    this.setState({
      image,
      eventId
    })
    this.getPostsList(eventId)
  }

  getPostsList(id, page = 0, size = 9) {
    API.post('posts/list', {
      "page": page,
      "size": size,
      "categoryid": id
    })
      .then(res => {
        if(res.data.posts.length === 0) return

        this.setState((prevState, props) => {
          const items = this.state.items.length > 0 ? [this.state.items, ...res.data.posts] : res.data.posts
          console.log(res.data.posts)
          return {
            items:res.data.posts
          }
        })
      })
      .catch(error => {
      })
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 6 };
    });
  }
  
  render() {
    const { items } = this.state;
    return (
      <React.Fragment>
        {items.slice(0, this.state.visible).map((ite, i) => <EventGridItem index={i} data={ite} key={i} col={4} />)}
        {this.state.visible < items.length &&
          <LoadMore loadMoreFunc={this.loadMore} />  
        }
        </React.Fragment>
    );
  }
}

export default MainEvents
