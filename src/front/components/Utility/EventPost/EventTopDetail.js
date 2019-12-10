import React from "react";
import { Col } from "reactstrap";

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

const renderDate = (item, index) => {
  var newItem = item.content.split("__");
  var title = newItem[0];
  switch (title) {
    case "SDate":
      console.log(newItem)
      var splitDate = newItem[1].split("-");
      if (splitDate.length < 1) return null;
      return (
        <React.Fragment key={index + 'f'}>
          {`${Number(splitDate[0])} ${splitDate[1]} ${splitDate[2]}.`}
        </React.Fragment>
      );
    case "STime":
      return <React.Fragment key={index + 'r'} > Start {tConvert(newItem[1])}</React.Fragment>;

    default:
      return null;
  }
};

const EventTopDetail = props => {
  if (props.data) {
    return (
      <React.Fragment>
        {props.data.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <React.Fragment key={index}>
                  {renderDate(item,index)}
                </React.Fragment>
              );
              break;
            default:
              return (
                null
              );
          }
        })}
      </React.Fragment>
    );
  }
  return null;
};

export default EventTopDetail;
//https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/639645135&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true