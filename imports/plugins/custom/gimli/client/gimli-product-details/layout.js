import React, { Component, PropTypes } from "react";

class Layout extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log(props);
    return (
      <h2>I'm here</h2>
    );
  }
}

export default Layout;
