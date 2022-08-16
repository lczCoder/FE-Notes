`use strict`;

import React from "react";
import ReactDom from "react-dom";
import './react.less'

class App extends React.Component {
  render() {
    return <h3 className='title'>组件渲染</h3>;
  }
}

ReactDom.render(
  <App></App>,
  document.getElementById("root")
)