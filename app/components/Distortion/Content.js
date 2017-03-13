import React from 'react';
import ReactDOM from 'react-dom';

const classNames = require('classNames');
const propTypes = {
  src: React.PropTypes.string,
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  style: React.PropTypes.object,  
  dimensions: React.PropTypes.object,
  depth: React.PropTypes.number,
  index: React.PropTypes.number
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
  depth: 10,
  index: 0
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
    let element = ReactDOM.findDOMNode(this);
    let aspectRatioX, aspectRatioY, aspectRatioXY, aspectX, aspectY, 
        left = 0,
        top = 0;

    aspectRatioXY = width / height;
    // console.log(width, height, aspectRatioXY, (element.naturalWidth / element.naturalHeight))
    if(aspectRatioXY >= (element.naturalWidth / element.naturalHeight)){ // landscape
      aspectRatioX = width / element.naturalWidth;
      aspectX = width;
      aspectY = element.naturalHeight * aspectRatioX;
      top = -((aspectY - height) / 2);
    } else { // portrait
      aspectRatioY = height / element.naturalHeight;
      aspectX = element.naturalWidth * aspectRatioY;
      aspectY = height;
      left = -((aspectX - width) / 2);
    }
    
    element.style.width = `${aspectX}px`;
    element.style.height = `${aspectY}px`;
    element.style.transform = `translate3d(${left}px, 0px, ${(this.props.index+1) * this.props.elementDepth}px)`;

    this.setState({
      width: aspectX,
      height: aspectY,
      top: top,
      left: left
    });
  }

	render(){
    const { width, height, top, left } = this.state;
    let elementProps = Object.assign({
      style:{
        width: width,
        height: height,
        transform: `translate3d(${left}px, ${top}px, ${this.props.index * 200}px)`
      }
    }, this.props.children.props);

		return React.cloneElement(this.props.children, elementProps);
	}
}

DistortionContent.propTypes = propTypes;
DistortionContent.defaultProps = defaultProps;

export default DistortionContent;