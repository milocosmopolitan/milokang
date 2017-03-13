import React from 'react';
import ReactDOM from 'react-dom';
import Cube from './index';

const propTypes = {
	side: React.PropTypes.string,
	backgroundColor: React.PropTypes.string,
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	z: React.PropTypes.number,
	currentSide: React.PropTypes.string,
	overflow: React.PropTypes.string,
	rgba: React.PropTypes.object,

};

const defaultProps = {
	side: '',
	currentSide: 'front',
	overflow: 'hidden',
	backgroundColor: 'rgba(41, 41, 41, 0.5)',
	x: 100,
	y: 1000,
	z: 700,
	rgba: {
    r: 0,
    g: 0,
    b: 0,
    a: 0.5
  }
};

class CubeSide extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
			this.applyColor();
	}	

	applyColor(){
		let element = ReactDOM.findDOMNode(this);
		// console.log('CubeSide apply color', element, element.style);
	}

	getDimensions(){
		const { x, y, z, side } = this.props;
		let width = 0,
				height = 0,
				transform = 'translate3d(0px, 0px, 0px) rotateY( 0deg )';


		if (side === "front" || side === "back"){
			width = x;
			height = y;
			transform = `translate3d(0px, 0px, ${side === "front" ? 0 : -z}px) rotateY( ${side === "front" ? 0 : 180}deg )`;
		} else if(side === "right" || side === "left"){
			width = z;
			height = y;
			transform = `translate3d(${side === "right" ? x - (z / 2) : -(z / 2)}px, 0px, ${-(z / 2)}px) rotateY( ${side === "right" ? 90 : -90}deg )`;
		} else if(side === "top" || side === "bottom"){
			width = x;
			height = z;
			transform = `translate3d(0px, ${side === "top" ? -(z / 2) : y - (z / 2)}px, ${-(z / 2)}px) rotateX( ${side === "top" ? -90 : 90}deg )`;
		}
		return { width, height, transform };
	}
	render(){		
		const {side, currentSide, rotate, rgba} = this.props;
		let dimensions = this.getDimensions();

		let defaultStyle = {
			margin: 0,
		  transition: 'all 1s',
		  display: 'block',
		  position: 'absolute',
		  zIndex: 100,
		  backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${side !== currentSide ? 0 : rgba.a})`
		};

		let elementStyle = Object.assign({
			width: `${dimensions.width}px`,
			height: `${dimensions.height}px`,
			transform: dimensions.transform
		}, defaultStyle);

		let childWrapperStyle = {
			position: 'relative',
			width: '100%',
			height: '100%',
			overflow: this.props.overflow
		}

		const children = React.Children.map(this.props.children, child=>{
			// console.log(child);
			if(typeof child !== 'string'){
				let childElement = React.cloneElement(child, Object.assign({rotate: rotate}, child.props), child.props.children);	
				return (
					<div style={childWrapperStyle}>
						{
							side !== "front" 
								? <Cube.Nav rotate={rotate} close={true} />
								: null
								// : <Cube.Nav rotate={rotate} />
						}					
						<div style={childWrapperStyle}>
							{ childElement }
						</div>
					</div>
				)
			}
		})
		
		// console.log(children)
		// let elementProps = Object.assign({style:elementStyle}, this.props);

		return React.createElement('div', {style:elementStyle}, children);
	}
}


CubeSide.propTypes = propTypes;
CubeSide.defaultProps = defaultProps;

export default CubeSide;