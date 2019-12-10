import React from "react";
import { Col, Row } from "reactstrap";
import { withRouter } from 'next/router'
import MainLayout from "../components/Layout/MainLayout";
import Breadcrumb from "../components/Utility/Breadcrumb/index";
import API from '../services/api'
import PostContent from '../components/Utility/Content/PostContent'
import EventDetail from '../components/Utility/EventPost/EventDetail'
import EventDetailText from '../components/Utility/EventPost/EventDetailText'
import EventTopDetail from '../components/Utility/EventPost/EventTopDetail'


import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import ShareArticle from "../components/Utility/SocialIcons/ShareArticle";
import slugify from "slugify";
import Gallery from "../components/Utility/Gallery";
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

// <div className="des-container">
// <div className="position-absolute b-center">
//   <h6 className="text-uppercase pb-2 bold">Where ?</h6>
// </div>
// <div className="position-absolute b-center">
// <h6 className="text-uppercase pb-2 bold">Where ?</h6>
// <p className="text-uppercase pb-2 bold">{data.location}</p>
// </div>
// </div>
const tConvert = time => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];
  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
};
const addZero = t => {
  if (t < 10)
    return '0' + t;
  return t;
}
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hashtags: [],
      hashtagString: '',
      data: {
        title: '',
        createdAt: null,
        category: {
          title: ''
        },
        keywords: []
      },
      location: null
    }
  }
  componentDidMount() {
    API.post('posts/get', { "slug": this.props.router.asPath.substring(1) })
      .then(res => {
        let body = res.data.post.body;
        body.map((item) => {
          let newItem = item.content.split('__')
          let title = newItem[0];
          if (title === 'bookingUrl')
            this.setState({ bookingUrl: newItem[1] });
        })
        res.data.post.keywords.map((item) => {
          let hashtagString = this.state.hashtagString + ` #${slugify(item, '_')}`;
          let hashtags = this.state.hashtags;
          hashtags.push(slugify(item, '_'));
          this.setState({ hashtagString, hashtags })
        });
        this.setState({
          isLoading: false,
          data: res.data.post,
          location: res.data.post.location.set ? {
            lat: res.data.post.location.coordinates[1],
            lng: res.data.post.location.coordinates[0],
          } : null
        });
      })
      .catch(e => {
      })
  }

  render() {
    const { data, hashtags, hashtagString } = this.state;
    return (
      <div className="article inner event">
        {this.state.isLoading && <Preloader />}
        {data.category.slug &&
          <Breadcrumb categorySlug={data.category.slug} category={data.category.title} title={data.title} />
        }
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="align-items-strech align-items-center d-flex pb-5">
              <Col md={3} className="position-relative p-0">
                <div className="article_title">
                  <div>
                    <h1 className="pb-4 article_title-main">{data.title}</h1>
                    <p>{data.description}</p>
                    <ShareArticle
                      hashtags={hashtags}
                      hashtagString={hashtagString}
                      category={data.category.title}
                      url={this.props.router.asPath}
                      title={data.title}
                      className="share-article" />
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

        <Row className="position-relative d-block justify-content-center ">
          <Col md={10} className="m-auto">
            <div className="des-container d-flex">
              <Col md={6}>
                <h6 className="text-uppercase pb-2 bold">Where ?</h6>
                <p className="text-uppercase pb-2">{data.place}</p>
                <p className="text-uppercase pb-2">{data.city}</p>
              </Col>
              <Col md={6} className="">
                <h6 className="text-uppercase bold pb-3">When?</h6>
                <div className="d-flex justify-content-between">
                  <EventTopDetail data={data.body} />
                  <br />
                  {data.endDate ?
                    <>
                      {new Date(data.endDate).getDate() + ' ' + months[new Date(data.endDate).getMonth()] + ' ' + new Date(data.endDate).getFullYear()}
                      {' End ' + tConvert(new Date(data.endDate).getHours() + ':' + addZero(new Date(data.endDate).getMinutes()))}
                    </>
                    : ''}
                </div>
              </Col>
            </div>

            <Row style={{ marginTop: 50 }} >
              <EventDetailText data={data.body} />
              <Col lg={6} md={6} className="event-detail">
                <EventDetail data={data.body} />
                {this.state.data.keywords.length ?
                  <Col md={5} className="pt-2 p-0">
                    <p className="pb-0 article_small-desc">Tags :</p>
                    <p className="pb-5 d-block" style={{ padding: 0 }}>
                      {this.state.data.keywords.map((item, index) => {
                        return item + ((index + 1) !== this.state.data.keywords.length ? ', ' : '');
                      })}
                    </p>
                  </Col> : null}
                {(this.state.data.address && this.state.data.address !== "") ?
                  <Col md={5} className="pt-2 p-0">
                    <p className="pb-0 article_small-desc">Address :</p>
                    <p className="pb-5 d-block" style={{ padding: 0 }}>
                      {this.state.data.address}
                    </p>
                  </Col> : null}
              </Col>
              <Col lg={6} md={6} className="event-detail">
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

              {(data.gallery && data.gallery.length) ?
                < Col sm={12} style={{ marginTop: 20 }}>
                  <Gallery type={data.galleryType} images={data.gallery} />
                </Col>
                : null}
            </Row>

            {this.state.bookingUrl &&
              <div className="d-flex justify-content-center mt-5 pb-5">
                <a href={this.state.bookingUrl} target="_blank" className="f-btn"><span>Buy Tickets</span></a>
              </div>
            }
          </Col>
        </Row>
        <Cookies />
      </div >
    );
  }
}

export default withRouter(props => <MainLayout {...props} Content={Event} />)
