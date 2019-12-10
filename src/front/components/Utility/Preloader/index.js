import React from 'react';

export default class Preloader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                zIndex: 999999999,
                top: 0,
                left: 0,
                background: '#222',
                width: '100vw',
                height: '100vh'
            }} >
                <style>{`* {overflow: hidden;}`}</style>
                <svg
                    width="400px" height="400px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    className="lds-stroke"
                    style={{background: "none"}}>
                    <text
                        x="50" y="50"
                        textAnchor="middle" dy="0.38em"
                        fill="none" strokeLinecap="round"
                        strokeLinejoin="round" ng-attr-stroke="{{config.c1}}"
                        ng-attr-stroke-width="{{config.width}}"
                        ng-attr-font-size="{{config.fontSize}}"
                        ng-attr-font-family="{{config.fontFamily}}"
                        stroke="#fff" strokeWidth="0.8"
                        fontSize="24" fontFamily="arial">
                        FYI
                        <animate
                            attributeName="stroke-dasharray" calcMode="spline"
                            values="0 100;100 100;0 100" keyTimes="0;0.5;1"
                            dur="2.3" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                            begin="0s" repeatCount="indefinite"></animate>
                        <animate
                            attributeName="stroke-dashoffset"
                            calcMode="linear" values="0;0;-100"
                            keyTimes="0;0.5;1" dur="2.3"
                            begin="0s" repeatCount="indefinite"></animate>
                    </text>
                </svg>
            </div>
        )
    }
}