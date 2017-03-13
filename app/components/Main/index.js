import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const classNames = require('classnames');

class Main extends React.Component {
  componentDidMount() {
    
    
  }
  render() {    
    const { defaultActive } = this.props;
    return (
      <div id="main" className={classNames('section', 'fullHeight', 'active')}>
        
        <h1>THIS IS TEST TEXT</h1>
      </div>   
    )
  }
}
export default Main;