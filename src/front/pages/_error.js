import React from 'react';
import Head from 'next/head';
import "../style/app.scss";

export default class ErrorHandler extends React.Component {
    static async getInitialProps({ res }) {
        return { notFound: res.statusCode === 404 }
    }
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Feed Your Image | Not Found</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                        key="viewport"
                    />
                    <link rel="icon"
                        type="image/png"
                        href="https://fyi-media.s3.eu-west-2.amazonaws.com/favicon.ico" />
                </Head>
                <div className="d-flex" style={{justifyContent: 'center', alignItems: 'center',width: '100%', height: '100vh'}}>
                    <h3 className="bold" style={{color: '#3cc0ce'}}>{this.props.notFound ? '404 - Page Not Found' : '500 - Unexpected Error'}</h3>
                </div>
            </React.Fragment>
        )
    }
}