import React, { Component } from "react";
import Menu from "./Menu";
import Link from "next/link";
import Head from 'next/head';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: " "
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", event => {
      this.setState({
        activeClass: window.pageYOffset < 50 ? "" : "scroll"
      });
    });
  }

  render() {
    return (
      <header className={`header ${this.state.activeClass}`}>
          <a href="/" className="logo">
            <span className="f">F</span>
            <span className="e">e</span>
            <span className="e">e</span>
            <span className="e">d</span>
            <span className="space"> </span>
            <span className="y">Y</span>
            <span className="e">o</span>
            <span className="e">u</span>
            <span className="e">r</span>
            <span className="space"> </span>
            <span className="i">I</span>
            <span className="e">m</span>
            <span className="e">a</span>
            <span className="e">g</span>
            <span className="e">e</span>
            <span className="dot">.</span>
          </a>
        <Menu />
      </header>
    );
  }
}

export default MainLayout;
