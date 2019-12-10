import React, { Component } from 'react'
import hoverEffect from '../assets/hover'
import "../style/app.scss";

export default class New extends Component {
  componentDidMount() {
    new hoverEffect({
      parent: document.querySelector('.my-div'),
      intensity: 0.3,
      image1: require('../assets/manchester-music-events.jpg'),
      image2: require('../assets/manchester-music-events.jpg'),
      displacementImage: require('../assets/manchester-music-events.jpg')
    })
  }

  render() {
    return (
      <div id="luxy">
        <div className="my-div" style={{ width: "100%", height: "400px" }}></div>
      </div>
    )
  }
}


/*** in view scroll ***/
// var animateHTML = function () {
//   var elems;
//   var windowHeight;
//   function init() {
//     elems = document.querySelectorAll('.grid');
//     windowHeight = window.innerHeight;
//     addEventHandlers();
//     checkPosition();
//   }
//   function addEventHandlers() {
//     window.addEventListener('scroll', checkPosition);
//     window.addEventListener('resize', init);
//   }
//   function checkPosition() {
//     for (var i = 0; i < elems.length; i++) {
//       var positionFromTop = elems[i].getBoundingClientRect().top;
//       if (positionFromTop - windowHeight <= 0) {
//         elems[i].className = elems[i].className.replace(
//           'grid',
//           'is-inview'
//         );
//       } else {
//         elems[i].className = elems[i].className.replace(
//           'is-inview',
//           'grid'
//         )
//       }
//     }
//   }
//   return {
//     init: init
//   };
// };
// animateHTML().init();