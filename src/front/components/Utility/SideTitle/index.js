import React from "react";

const SideTitle = props => {
  const {title,name} = props;
  return (
    <h4 className={`vertical-text ${name}`}>
      {title}
    </h4>
  )
}

export default SideTitle;
