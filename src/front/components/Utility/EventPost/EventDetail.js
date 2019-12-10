import React from 'react'
import { Col } from 'reactstrap'

const renderTextTitle = (item, index) => {
  var newItem = item.content.split('__')
  var title = newItem[0]
  switch (title) {
    case 'Website':
      return (
        (newItem[1] === 'null' || !newItem[1]) ? null :
        <Col key={index + 100 + 'website'} md={5} className="pt-3 p-0">
          <p className="p-0 article_small-desc">Website:</p>
          <a target="_blank" href={newItem[1]} style={{ padding: 0 }}>{newItem[1]}</a>
        </Col>
      )
    case 'video':
      return (
        (newItem[1] === 'null' || !newItem[1]) ? null :
          <Col key={index + 100 + 'video'} md={5} className="pt-2 p-0">
            <p className="pb-0 article_small-desc">Video :</p>
            <a className="pb-5 d-block" href={newItem[1]} target="_blank" style={{ padding: 0 }}>{newItem[1]}</a>
          </Col>
      )

    default:
      return null
  }
}

const EventDetail = (props) => {
  if (props.data) {
    return (
      <div className="">
        {props.data.map((item, index) => {
          switch (item.type) {
            case "image":
              return (
                !item.content ? null :
                <Col md={8} key={index + 'image'}>
                  <img src={item.content} className="img-fluid" />
                </Col>
              )
              break;
            case "text":
              return (
                <div>
                  {renderTextTitle(item, index)}
                </div>
              )
              break;
            case "video":
              return (
                !item.content ? null :
                <Col className="p-0" xs={12} key={index + 'video'}>
                  <div className="d-flex justify-content-center" style={{flexDirection: 'column'}}>
                    
                    <iframe style={{ border: 'none'}} width="100%" height="400" src={item.content}>
                    </iframe>
                  </div>
                </Col>
              )
              break;
            case "link":
              return (
                !item.content ? null :
                <Col md={10} key={index + 'link'}>
                  <a href={item.url} target="_blank">{item.content}</a>
                </Col>
              )
              break;
            case "soundcloud":
              return (
                !item.content ? null :
                <Col className="col" xs={12} style={{padding: 0, marginTop: 15}} key={index + 'soundcloud'}>
                  <div className="d-flex pt-4 justify-content-center pb-2" style={{flexDirection: 'column'}}>
                    <p className="pb-0 article_small-desc">Soundcloud :</p>
                    <iframe style={{ border: 'none'}} width="100%" src={item.content}>
                    </iframe>
                  </div>
                </Col>
              )
              break;
            default:
              return (
                !item.content ? null :
                <Col className="col" md={10} key={index + 'default'}>
                  <p className="small">{item.content}</p>
                </Col>
              )
          }
        })}
      </div>
    )
  }
  return null
}



export default EventDetail