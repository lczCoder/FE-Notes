`use strict`;

import React from "react";
import ReactDom from "react-dom";
import "./react.less";
import iconImg from "./assets/find2.png";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="box">
          <h3 className="title">组件渲染</h3>
          <img src={iconImg} width="50px"></img>
        </div>
      </>
    );
  }
}

ReactDom.render(<App></App>, document.getElementById("root"));
