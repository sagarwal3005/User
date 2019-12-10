import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../style/app.scss";
import Head from 'next/head';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: true,
    //   transition: false
    // };
    // this.handleLoad = this.handleLoad.bind(this);
    // window.addEventListener('load', this.handleLoad);
    // console.log("loadinggggg")
    //     {this.state.isLoading ? <Loading />: }
  }


  // componentWillUpdate(){
  //   console.log("Loading 22222")
  // }

  // componentDidMount() {
    //<Loading className={` ${classes}`}  />
  // }

  // handleLoad(){
  //   this.setState({
  //     isLoading: false,
  //     transition: true
  //   },()=>{document.getElementsByTagName("body")[0].className = "loaded";});
  // }

  render() {
    const { Content } = this.props;
    // let classes = classnames({ loaded: this.state.transition });
    return (
      <React.Fragment>
        <Head>
          <title>Feed Your Image</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <link rel="icon"
            type="image/png"
            href="https://fyi-media.s3.eu-west-2.amazonaws.com/favicon.ico"/>
        </Head>

        <div className="d-flex flex-column h-100 main-container">
          <main className="flex-shrink-0">
            <Header />
       
            <Content {...this.props} />
          </main>
          <Footer />
        </div>
      </React.Fragment>
        );
      }
    }
  
