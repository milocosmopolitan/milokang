import React from 'react';
import ReactDOM from 'react-dom';
import * as Component from 'APP/app/components';

const classNames = require('classnames');
const propTypes = {
  src: React.PropTypes.string,
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  style: React.PropTypes.object,  
  dimensions: React.PropTypes.object,  
};

const defaultProps = {
  src: '',
  mouseX: 0,
  mouseY: 0,
  style:{
  	width: `${100}%`,
  	height: `${100}%`
  },
  dimensions: {},  
};


class DistortionContent extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      width: 2020,
      height: 1180,
      top: ( window.innerHeight / 2 ) - ( 1180 / 2 ),
      left: ( window.innerWidth / 2 ) - ( 2020 / 2 )
    }	
	}

  componentDidMount() {
    this.setObjectDimensions(this.state.width, this.state.height)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dimensions !== nextProps.dimensions) {
      // console.log('componentWillReceiveProps', nextProps.dimensions)
      this.setObjectDimensions(nextProps.dimensions.width, nextProps.dimensions.height)
    }
  }

  setObjectDimensions(width, height){
    const { layer, dimensions, elementDepth } = this.props;
    let element = ReactDOM.findDOMNode(this);
    let aspectRatioX, aspectRatioY, aspectRatioXY, aspectX, aspectY, 
        left = 0,
        top = 0;

    aspectRatioXY = width / height;
    // console.log(width, element.clientWidth, element.offsetWidth, element.naturalWidth, element.naturalHeight, element.width)
    if(aspectRatioXY >= (2020 / 1180)){ // landscape
      aspectRatioX = width / 2020;
      aspectX = width;
      aspectY = 1180 * aspectRatioX;
      top = -((aspectY - height) / 2);
    } else { // portrait
      aspectRatioY = height / 1180;
      aspectX = 2020 * aspectRatioY;
      aspectY = height;
      left = -((aspectX - width) / 2);
    }
    
    // console.log(aspectRatioXY, element.naturalWidth, aspectX, aspectY)
    // element.style.width = `${aspectX}px`;
    // element.style.height = `${aspectY}px`;
    // element.style.transform = `translate3d(${left}px, 0px, ${layer.sort * elementDepth}px)`;

    this.setState({
      width: parseInt(aspectX),
      height: parseInt(aspectY),
      top: top,
      left: left
    });
  }

	render(){
    const { width, height, top, left } = this.state;
    const { layer, dimensions, elementDepth } = this.props;
    let defaultStyle = {
      style:{
        position: 'absolute',
        width: width,
        height: height,
        zIndex: layer.sort || 0,
        transform: `translate3d(${left}px, 0px, ${layer.sort * elementDepth}px)`
      }
    };

    let elementProps = {};
    if(layer.type === 'image'){
      elementProps = {
        src: layer.url,
        alt: layer.alt,
        width: 2020,
        height: 1180,
      };
    }

    let props = Object.assign(elementProps, defaultStyle);

    // console.log('distortion', props, dimensions);
    
    return layer.type === 'component' 
      ? React.createElement(Component[layer.url], props)
      : React.createElement('img', props)

		// return React.createElement(this.props.children, elementProps);
	}
}

DistortionContent.propTypes = propTypes;
DistortionContent.defaultProps = defaultProps;

export default DistortionContent;