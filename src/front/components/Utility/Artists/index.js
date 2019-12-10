import React from "react";
import ArtistGrid from "./artistGrid";

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: sampleData,
    };
  }

  render() {
    return (
      <div className="d-flex flex-wrap">
        {this.state.items.map((ite, i) => (
          <ArtistGrid index={i} data={ite} key={i} col={4} />
        ))}
      </div>
    );
  }
}

export default Artist;
