import React from 'react';
import Slider from "react-slick";
import "../../../style/slick.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Masonry from 'react-masonry-component';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        position: 'absolute',
        top: "49%",
        right: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3cc0ce',
        zIndex: 25
      }}
      onClick={onClick}
    >
      <IoIosArrowForward size={40} color="#fff" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        position: 'absolute',
        top: "49%",
        left: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3cc0ce',
        zIndex: 25
      }}
      onClick={onClick}
    >
      <IoIosArrowBack size={40} color="#fff" />
    </div>
  );
}

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images ? this.props.images : [],
            type: this.props.type ? this.props.type : 'carrousel',
            isOpen: false,
            photoIndex: 0
        }
    }

    render() {
        const settings = {
            dots: false,
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        };
        return (
            <div style={{ marginTop: 20, paddingBottom: 20, direction: 'rtl' }}>
                <h3 className="regular">Gallery</h3>
                {this.state.type === 'carrousel' ?
                    <Slider centerPadding={'25px'} {...settings}>
                        {this.state.images.map((item, index) => {
                            return (
                                <div className="gallery-carousel-item" key={index}>
                                    <div id="gallery-carousel-img"
                                        style={{ backgroundImage: `url(${item})` }}>
                                        <style>{`
                                        .gallery-carousel-item {
                                            padding: 10px !important;
                                            height: 600px !important;
                                        }
                                        #gallery-carousel-img {
                                            height: 580px;
                                            background-position: center;
                                            background-size: cover;
                                            background-repeat: no-repeat !important;
                                        }
                                    `}</style>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider> :
                    <div>
                        <Masonry
                            className="gallery-row"
                            elementType={'ul'} // default 'div'
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {this.props.images.map((item, index) => {
                                return (
                                    <li
                                        onClick={() => this.setState({ photoIndex: index, isOpen: true})}
                                        style={{ padding: 3, cursor: 'pointer' }}
                                        className="col-12 col-sm-4 col-md-3"
                                        key={index}  >
                                        <img className="img-fluid" src={item} />
                                    </li>
                                )
                            })}
                        </Masonry>
                    </div>
                }

                {this.state.isOpen && (
                    <Lightbox
                        reactModalStyle={{overlay: {zIndex: 99999999}}}
                        mainSrc={this.props.images[this.state.photoIndex]}
                        nextSrc={this.props.images[(this.state.photoIndex + 1) % this.props.images.length]}
                        prevSrc={this.props.images[(this.state.photoIndex + this.props.images.length - 1) % this.props.images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + this.props.images.length - 1) % this.props.images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + 1) % this.props.images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}