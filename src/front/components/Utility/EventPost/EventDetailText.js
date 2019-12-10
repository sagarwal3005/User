import React from 'react'
import { Col } from "reactstrap";

const EventDetailText = (props) => {
  if (props.data) {
    return (
      props.data.map((item, index) => {
        if (item.content.toLowerCase().indexOf("__") === -1) {
          return (
            <Col lg={12} md={12} className="event-detail">
              <p className="small" dangerouslySetInnerHTML={{ __html: item.content }} />
            </Col>
          )
        }
        else {
          return (null)
        }
      })
    )
  }
  return null
}



export default EventDetailText