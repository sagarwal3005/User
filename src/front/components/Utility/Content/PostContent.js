import React from 'react'
import {  Col } from 'reactstrap'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.defaultCenter}
  >
    <Marker position={props.defaultCenter} />
  </GoogleMap>
))

const tConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

const renderTextTitle = (item) => {
  var newItem = item.content.split('__')
  var title = newItem[0]

  switch (title) {
    case 'SDate':
      return null
 
    case 'video':
      return (
        <React.Fragment>
          <p className="pb-0 article_small-desc">Video :</p>
          <a className="pb-5 d-block" href={newItem[1]} target="_blank" style={{ padding: 0 }}>{newItem[1]}</a>
        </React.Fragment>
      )

    case 'location':
      return null;

    default:
      return <p className="small" dangerouslySetInnerHTML={{ __html: item.content }}/>
  }
}

const PostContent = props => {
  if (props.data) {
    return (
      <div className="justify-content-center article_content row pb-3">
        {props.data.map((item, index) => {
          switch (item.type) {
            case "image":
              return (
                <Col lg={8} key={index}>
                  <img src={item.content} className="img-fluid" />
                </Col>
              )
              break;
            case "text":
              return (
                <Col lg={10} key={index}>
                  {renderTextTitle(item)}
                </Col>
              )
              break;
            case "video":
              return (
                <Col lg={8} key={index}>
                  <div className="d-flex justify-content-center">
                    <iframe width="100%" height="400" src={item.content}>
                    </iframe>
                  </div>
                </Col>
              )
              break;
            case "link":
              return (
                <Col lg={10} key={index}>
                  <a href={item.url} target="_blank">{item.content}</a>
                </Col>
              )
              break;
            case "soundcloud":
              return (
                <Col lg={8} key={index}>
                  <div className="d-flex pt-4 justify-content-center">
                    <iframe width="100%" src={item.content}>
                    </iframe>
                  </div>
                </Col>
              )
              break;
            default:
              return (
                <Col lg={10} key={index}>
                  <p className="small">{item.content}</p>
                </Col>
              )
          }
        })}
      </div>
    )
  }
  return ""
}
export default PostContent