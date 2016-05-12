import React from 'react';
import {render} from 'react-dom';
import BaseComponent from './components/BaseComponent.jsx'

class App extends React.Component {
  render () {
    return <BaseComponent />;
  }
}

render(<App/>, document.getElementById('app'));