import React from "react";
import { Col, Row } from "reactstrap";
import { withRouter } from 'next/router'
import MainLayout from "../components/Layout/MainLayout";
import Breadcrumb from "../components/Utility/Breadcrumb/index";
import API from '../services/api'
import PostContent from '../components/Utility/Content/PostContent'

import BookingForm from "../components/Utility/Form";
import ShareArticle from '../components/Utility/SocialIcons/ShareArticle'
import slugify from "slugify";
import Gallery from "../components/Utility/Gallery";

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import Preloader from "../components/Utility/Preloader";
import Cookies from "../components/Utility/Cookies";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.defaultCenter}
  >
    <Marker position={props.defaultCenter} />
  </GoogleMap>
))

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postid: '',
      hashtagString: '',
      hashtags: [],
      data: {
        title: '',
        createdAt: null,
        category: {
          title: ''
        }
      }
    }
  }
  componentDidMount() {
    API.post('posts/get', { slug: this.props.router.asPath.substring(1) })
      .then(res => {
        console.log('response', res.data.post);
        res.data.post.keywords.map((item) => {
          let hashtagString = this.state.hashtagString + ` #${slugify(item, '_')}`;
          let hashtags = this.state.hashtags;
          hashtags.push(slugify(item, '_'));
          this.setState({ hashtagString, hashtags })
        })
        this.setState({
          isLoading: false,
          data: res.data.post,
          postid: res.data.post._id,
          location: res.data.post.location.set ? {
            lat: res.data.post.location.coordinates[1],
            lng: res.data.post.location.coordinates[0],
          } : null
        })
      })
      .catch(e => {
      })
  }

  render() {
    const { data, hashtags, hashtagString } = this.state;
    return (
      <div className="article inner event">
        {this.state.isLoading ? <Preloader /> : null}
        {data.category.slug &&
          <Breadcrumb categorySlug={data.category.slug} category={data.category.title} title={data.title} />
        }
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="align-items-strech align-items-center d-flex pb-5">
              <Col md={3} className="position-relative p-0 ">
                <div className="article_title">
                  <div>
                    <h1 className="pb-4 article_title-main">{data.title}</h1>
                    <h6 className="pb-1 small">{data.category.title}</h6>
                    <ShareArticle
                      hashtags={hashtags}
                      hashtagString={hashtagString}
                      category={data.category.title}
                      url={this.props.router.asPath}
                      title={data.title}
                      className="share-article" />
                    {/* <p className="small">{data.createdAt}</p> */}
                  </div>
                </div>
              </Col>

              <Col md={9} className="p-0">
                <div className="postion-relative">
                  <div
                    className="article_banner"
                    style={{ backgroundImage: `url(${data.cover})` }}
                  />
                  <img className="img-hidden" src={data.cover} />
                </div>
              </Col>
            </div>
          </Col>
        </Row>

        <PostContent data={data.body} />

        {(this.state.location && data.gallery.length) ?
        <Row style={{ justifyContent: 'center' }}>
          <Col lg={10}>
            {(data.gallery && data.gallery.length) ?
              <Gallery type={data.galleryType} images={data.gallery} /> : null}
          </Col>
          <Col lg={10} className="pt-5 pb-5">
            {this.state.location &&
              <MyMapComponent
                defaultCenter={{ lat: this.state.location.lat, lng: this.state.location.lng }}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing&key=AIzaSyAWvJfNGs-9g6bBiY3i7tf2bSlW7odl_DQ"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            }
          </Col>
        </Row>
        : null}

        {(data.category.title === "Out & About" || data.category.title === "VIP Parties") ?
        <Row className="align-items-center justify-content-center pb-4">
          <Col lg={10}>
              <BookingForm category={data.category.title} postid={this.state.postid} venue={data.title} />
          </Col>
        </Row>
        : null}

        <Cookies />
      </div>
    );
  }
}

export default withRouter(props => <MainLayout {...props} Content={Article} />)
