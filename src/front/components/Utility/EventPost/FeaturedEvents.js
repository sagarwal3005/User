import React from "react";
// import PostDetail from '../Post/postDetail'
import API from '../../../services/api';
import EventGridItem from './EventGridItem'

class FeaturedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: null,
      musicId: null,    
      items:[]
    };
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
          this.findMusicId()           
        })
      })
      .catch(e => {
      })
  }

  findMusicId() {
    const { categories } = this.state;
    if (!categories) return
    var image = null
    var musicId = null
    categories.map(c => {
      if (c.title === "Featured Events") {
        image = c.image
        musicId = c._id
      }
    })

    this.setState({
      image,
      musicId
    })
    this.getPostsList(musicId)
  }

  getPostsList(id, page = 0, size = 10) {
    API.post('posts/list', {
      "page": page,
      "size": size,
      "categoryid": id
    })
      .then(res => {
        if(res.data.posts.length === 0) return

        this.setState((prevState, props) => {
          const items = this.state.items.length > 0 ? [this.state.items, ...res.data.posts] : res.data.posts

          return {
            items:res.data.posts
          }
        })
      })
      .catch(error => {
      })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.items.map((ite, i) => <EventGridItem index={i} data={ite} key={i} col={4} />)}
      </React.Fragment>
    );
  }
}

export default FeaturedEvents
