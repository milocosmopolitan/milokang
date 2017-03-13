import React from 'react';

const classNames = require('classNames');
const propTypes = {
  src: React.PropTypes.string,
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  style: React.PropTypes.object,  
  depth: React.PropTypes.number
};

const defaultProps = {
  src: '',
  mouseX: 0,
  mouseY: 0,
  style:{
  	width: `${100}%`,
  	height: `${100}%`
  },  
  depth: 10,
};


class ParallaxImage extends React.Component {
	constructor(props) {
		super(props);	
	}
	render(){
		const { width, height, src, style, depth, mouseX, mouseY } = this.props;

	  let viewportHeight = document.documentElement.clientHeight,
      	viewportWidth = document.documentElement.clientWidth;

    let positionX = (depth / viewportWidth) * (mouseX - (viewportWidth / 2)) * -1,
      	positionY = (depth / viewportHeight) * (mouseY - (viewportHeight / 2)) * -1;

		let elementStyle = Object.assign({
				backgroundImage: `url('${src}')`,
				// transform: `translate3d(-108px, 0px, ${depth*10}px)`
				transform: `matrix(1,0,0,1, ${positionX}, ${positionY})`
			}, style);

  	let elementProps = {
				className: classNames('parallax-image', `depth-${depth}`),
				style: elementStyle
			};	

		return React.createElement(
      'div',
      {...elementProps}
    );
	}
}

ParallaxImage.propTypes = propTypes;
ParallaxImage.defaultProps = defaultProps;

export default ParallaxImage;