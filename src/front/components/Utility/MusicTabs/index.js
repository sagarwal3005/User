import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import { ParallaxProvider } from "react-scroll-parallax";
// import { Redirect } from 'react-router';
// import Post from "../components/Utility/Post";
// import API from '../services/api';
import classnames from 'classnames';
import Profiles from './Profiles'
import News from './News';
import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

class MusicTabs extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (tab === '2') {
      <Redirect to='artist' />
      return;
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  nextPath(path) {
    let history = useHistory();
    history.push("/home");
  }

  render() {
    return (
      <ParallaxProvider style={{ width: "100%" }}>
        <div className="inner">
          <Col lg={10} className="m-auto">
            <Nav tabs className="d-flex justify-content-center">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { window.location.href='/music' }}
                >
                  News
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { window.location.href='/artist' }}
                >
                  Artists
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12" className="p-0">
                    <News />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12" className="p-0">
                    <Profiles />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>

        </div>
      </ParallaxProvider>
    );
  }
}
export default MusicTabs;
