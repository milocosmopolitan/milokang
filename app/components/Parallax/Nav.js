import React from 'react';

const classNames = require('classnames');
const propTypes = {
 

};

const defaultProps = {

};

class ParallaxNav extends React.Component {
	constructor(props) {
		super(props);			
	}

	render(){		
  	// let children = 
    const { setCurrent } = this.props
		return (
			<div>
        <div className="smart-btn prev-btn" onClick={()=>{setCurrent('down')}}>
          <i className="fa fa-chevron-circle-up"></i>
        </div>
        <div className="smart-btn next-btn" onClick={()=>{setCurrent('up')}}>
          <i className="fa fa-chevron-circle-down"></i>
        </div>
      </div>
		);
	}
}
ParallaxNav.propTypes = propTypes;
ParallaxNav.defaultProps = defaultProps;

export default ParallaxNav;