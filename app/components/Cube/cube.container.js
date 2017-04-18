import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
	menuBtn: React.PropTypes.element,
	rotateLeftBtn: React.PropTypes.element,
	rotateRightBtn: React.PropTypes.element,
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	z: React.PropTypes.number,
};

const defaultProps = {
	x: 100,
	y: 1000,
	z: 700
};

class CubeContainer extends React.Component{
	constructor(props) {
		super(props);
		this.state = {			
			currentSide: 'front', // 'front', 'left', 'right'
			toggleMenu: false,
		};
	}
	getBoxSize(){
		let element = ReactDOM.findDOMNode(this);
	}

	onSideChange(side){
		// console.log('onSideChange', this.state.currentSide, side, this.props.setScroll)
		if(side === 'front' && this.props.setScroll) this.props.setScroll(false);
		if(side === 'right' && this.props.setScroll) this.props.setScroll(true);
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.state.currentSide !== nextState.currentSide) this.onSideChange(nextState.currentSide);
	}

	rotate(direction){
		let container = ReactDOM.findDOMNode(this);
		let element = ReactDOM.findDOMNode(this).childNodes[0];
		// console.log(element.style);

		let newState = Object.assign({}, this.state);

		const { x, y, z } = this.props;
		if (direction === "left") {
			// container.style.width = `${z}px`;
			// container.style.transform = `matrix(1,0,0,1,${z / 2},0)`;
			element.style.transform = `translate3d(0, 0, ${-(z / 2)}px) rotateY( 90deg )`;
			this.setSide('left');
		} else if (direction === "right") {
			// container.style.width = `${z}px`;
			// container.style.transform = `matrix(1,0,0,1,${-(z / 2)},0)`;
			element.style.transform = `translate3d(0, 0, ${-(x - ( z / 2))}px) rotateY( -90deg )`;
			this.setSide('right');
		} else if (direction === "menu") {
			// container.style.width = `${z}px`;
			// container.style.transform = `matrix(1,0,0,1,0,0)`;
			element.style.transform = `translate3d(0, 0, ${-x}px) rotateY( 90deg )`;			
			this.setSide('left');

		} else {
			// container.style.width = `${x}px`;
			// container.style.transform = `matrix(1,0,0,1,0,0)`;
			element.style.transform = 'translate3d(0px, 0px, 0px) rotateY(0deg)';			
			this.setSide('front');
		}		
		this.setState({
			currentSide: direction === 'menu' ? 'left' : direction,
			toggleMenu: direction === 'menu' ? true : false,
		})
		this.onSideChange();
	}

	setSide(newSide){
		this.setState({currentSide:newSide})
		this.onSideChange();
	}

	renderCube(children){
		const { x, y, z } = this.props;

		let elementStyle = {
			width: '100%',
		  height: '100%',
		  position: 'relative',
		  transformStyle: 'preserve-3d',
		  transition: 'all 1s',
		  transform: 'rotateY(0deg)'
		};

		let elementProps = Object.assign({
			style: elementStyle
		}, children.props);

		let elementChildren = React.Children.map(children, (child, index)=>{

			let childProps = Object.assign({
				rotate: this.rotate.bind(this)
			}, child.props);
			

			if(child.type.name === "CubeSide"){
				childProps.x = x;
				childProps.y = y;
				childProps.z = z;	
				childProps.currentSide = this.state.currentSide;
			}
			// console.log('renderCube', child, childProps)
			return React.cloneElement(child, childProps, child.props.children)
		})

		return React.createElement('div', elementProps, elementChildren);
	}
	render(){
		const { x, y, z } = this.props;


		let elementStyle = {
			width: this.state.currentSide === "front" ? x : z,
		  height: y !== 0 ? y : 'calc(100vh - 40px)',
		  position: 'relative',
		  perspective: z !== 0 ? z : 'calc(100vw - 40px)',
		  transition: 'all 1s',
		  pointerEvents: 'all'
		};

		if(this.state.currentSide === "front" || this.state.toggleMenu) elementStyle.transform = 'matrix(1,0,0,1,0,0)';
		if(this.state.currentSide === "left" && !this.state.toggleMenu) elementStyle.transform = `matrix(1,0,0,1,${z / 2},0)`;
		if(this.state.currentSide === "right" && !this.state.toggleMenu) elementStyle.transform = `matrix(1,0,0,1,${-(z / 2)},0)`;

		let elementProps = Object.assign({style:elementStyle}, this.props);
		// console.log(elementProps)
		delete elementProps.setScroll;

		return React.createElement('div', elementProps, this.renderCube(this.props.children));
		// return (
		// 	<div {...elementProps}>
		// 		{this.renderCube(this.props.children)}
		// 	</div>
		// 	)
	}
}

CubeContainer.propTypes = propTypes;
CubeContainer.defaultProps = defaultProps;
export default CubeContainer;