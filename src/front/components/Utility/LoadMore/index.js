import React from 'react'

const LoadMore = props => {
  return (
    <div className="text-center w-100 pt-5">
      <a className="f-btn" onClick={props.loadMoreFunc}>
        <span>Show Me More</span>
      </a>
    </div>
  )
}

export default LoadMore
