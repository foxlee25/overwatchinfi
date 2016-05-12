import React from 'react';

class BaseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>base component</p>
      </div>
    );
  }

}

export default BaseComponent;