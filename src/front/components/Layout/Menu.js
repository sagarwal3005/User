import React from "react";
import Link from "next/link";
import Socials from '../Utility/SocialIcons/Socials'


export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outsideWidth: "0"
    };
  }
  iconClickHandler = () => {
    document.getElementById("menuWrapper").classList.toggle("opened");
    document.getElementById("menu").classList.toggle("animate");
    this.setState({
      outsideWidth: this.state.outsideWidth == "0" ? "10rem" : "0"
    });
  };
  closeMenu = () => {
    document.getElementById("menuWrapper").classList.remove("opened");
    document.getElementById("menu").classList.remove("animate");
    this.setState({
      outsideWidth: "0"
    });
  };

  render() {
    return (
      <div className="menu">
        <div
          onClick={this.closeMenu}
          style={{ width: this.state.outsideWidth, height: "100vh" }}
        />
        <div id="menuWrapper" className="menu--items">
          <button className="menu-wrapper" onClick={this.iconClickHandler}>
            <div id="menu" className="hamburger-menu" />
          </button>
          <ul className="menu_main">

            <li>
              <a href="/" className="m-color">Home</a>
            </li>
            <li>
              <a href="/music" className="m-color">Music</a>
            </li>
            <li>
              <a href="/artist" className="m-color">Artist</a>
            </li>
            <li>
              <a href="/fashion" className="m-color">Fashion</a>
            </li>

            <li>
              <a href="/lifestyle" className="m-color">Lifestyle</a>
            </li>

            <li>
              <a href="/events" className="m-color">Events</a>
            </li>

            <li>
              <a href="/festivals" className="m-color">Festivals</a>
            </li>

            <li>
              <a href="/outandabout" className="m-color">Out & About</a>
            </li>

            <li>
              <a href="/vip-parties" className="m-color">VIP PARTIES</a>
            </li>

            <li>
              <a href="/influencers" className="m-color">Influencers</a>
            </li>

            <li>
              <a href="/services" className="m-color">Services</a>
            </li>
          </ul>

          <div className="menu_soical">
            <Socials />
            <p>© 2019, FEED YOUR IMAGE. All Rights Reserved. </p>
          </div>
        </div>
      </div>
    );
  }
}
