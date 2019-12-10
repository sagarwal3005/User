import React from 'react';
import API from '../../../services/api'
import {
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import classnames from "classnames";
import EventGridItem from '../EventPost/EventGridItem';
import LoadMore from '../LoadMore';

export default class FestivalList extends React.Component {
    constructor(props) {
        super(props);
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
            isMore: false
        }
    }

    componentDidMount() {
        this.getCategouries()
    }

    getCategouries() {
        API.post('categories/list')
            .then(res => {
                this.setState({ categories: res.data.categories }, () => {
                    this.findId()
                })
            }).catch(e => { })
    }

    fetchCities(id) {
        API.post('posts/filters/cities', {
            categoryid: this.state.categoryId
        })
            .then(response => {
                this.setState({ cities: response.data.cities });
            });
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

    findId() {
        const { categories } = this.state;
        if (!categories) return
        var id = null;
        var pageLocation = window.location.href.split("/")
        pageLocation = pageLocation[pageLocation.length - 1];
        var location = {
            "festivals": "Festivals",
        }
        categories.map(c => {
            return c.title === location[pageLocation] ? id = c._id : null
        });
        this.setState({ categoryId: id }, () => {
            this.fetchCities();
            this.getPostsList(id)
        });
        if (!id) return;
    }

    getPostsList() {
        API.post('posts/list', {
          page: this.state.activePage,
          size: 10,
          categoryid: this.state.categoryId,
          city: this.state.activeCity
        })
          .then(res => {
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
            if (this.props.onLoad)
              this.props.onLoad()
          })
          .catch(error => {})
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

    render() {
        return (
            <div className="inner">
                <Row className="justify-content-center pb-3">
                    <Col md={10}>

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
                           
                            {this.renderPosts()}
                            {this.state.isMore &&
                                <LoadMore loadMoreFunc={() => {
                                    this.setState({ activePage: this.state.activePage + 1 }, () => {
                                        this.getPostsList()
                                    })
                                }} />
                            }
                            
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}