import React from "react";
import Link from "next/link";

const Breadcrumb = props => {
  const title = props.title ? props.title : '';
  const dataCat = props.category;
  // if(props.category == "Out & About"){
  //   urlString === "outandabout"
  // }
  var location = {
    "Out & About": 'outandabout',
    "Artists": "music",
  }
  return (
    <div className="f-breadcrumb">
      <div className="f-breadcrumb_inner">
        <div className="rotate">
          <ul>
            <li>
              <a href='/' className="m-color">Home / </a>
            </li>
            {
              props.title &&
              <li>
                <a
                  href={'/' + (location[props.category] ? location[props.category] : props.categorySlug)}
                  className="m-color text-capitalize"> {props.category} / </a>
              </li>
            }
            {
              !props.title &&
              <li className="m-color">
                {props.category}
              </li>
            }
            <li className="m-color text-truncate">{props.title}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb;
