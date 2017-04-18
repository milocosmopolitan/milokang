import React from 'react';
// import ReactDOM from 'react-dom';

const propTypes = {
	close: React.PropTypes.bool
};

const defaultProps = {
	close: false
};

class CubeNav extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		const { rotate, close } = this.props;		
		if(close) {
			return (
				<div>
					<div className="smart-btn close-btn" style={{right:0}} onClick={()=>{rotate('front')}}>
		        <i className="fa fa-times"></i>
		      </div>   
		    </div>
			);	
		} else {
			return (
				<div>
					<div className="smart-btn menu-btn" onClick={()=>{rotate('menu')}}>
	          <i className="fa fa-bars"></i>
	        </div>
	        <div className="smart-btn rotate-right-btn" onClick={()=>{rotate('right')}}>
	          <i className="fa fa-angle-right"></i>
	        </div>
	        <div className="smart-btn rotate-left-btn" onClick={()=>{rotate('left')}}>
	          <i className="fa fa-angle-left"></i>
	        </div>
	      </div>
			);
		}
	}
}


CubeNav.propTypes = propTypes;
CubeNav.defaultProps = defaultProps;

export default CubeNav;