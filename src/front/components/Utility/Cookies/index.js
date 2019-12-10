import React from 'react'
import Link from "next/link";
import { Button } from 'reactstrap';

class Cookies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       cookie:true,
       disply:'block',
    } 
    this.handleCookie = this.handleCookie.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem('cookie')){
      this.setState({
        disply:'none'
      })
    }
  }

  handleCookie = () => {
    localStorage.setItem('cookie', false);
    this.setState({
      disply:'none'
    })
  }

  render() {
    return (
      <div className="cookies" id="cook" style={{display:this.state.disply, padding: 0}}>
        <div className="cookies_inner">
          <p>
            If you continue to browse this website you are allowing all third-party services.  <Link href="/privacyandpolicy"><a>Privacy Policy</a></Link>
          </p>
          <Button info onClick={this.handleCookie}>Ok</Button>
        </div>
      </div>
    )
  }
}

export default Cookies