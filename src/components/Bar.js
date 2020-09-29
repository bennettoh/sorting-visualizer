import React from 'react';
import "./Bar.css"

function Bar(props) {
  let style = props.length;
  return (
    <div className="bar" style={{ height: style }} ></div>
  )
}

export default Bar;