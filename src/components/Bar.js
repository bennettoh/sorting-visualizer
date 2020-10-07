import React from 'react';
import "./Bar.css"

function Bar({ length, color }) {
  let style = {
    height: length,
    backgroundColor: color ? "green" : "black",
  }

  return (
    <div className="bar" style={style} ></div>
  )
}

export default Bar;