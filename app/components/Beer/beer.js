'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class Beer extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			bubbles: []
		}
	}
	componentDidMount() {
		this.createBubbles(30);
	}
	createBubbles(bubbleCount){
		let element = ReactDOM.findDOMNode(this);

		let blur, delay, opacity, scale, size, speed, xPos, yPos;

		let defaults = {
      MAX_BUBBLE_SIZE: 100,
      MAX_BLUR: 10,
      MAX_ANIMATION_DURATION: 8000
    };

    let result = [];

		for (let i = 0; i < bubbleCount; i++) {
			xPos = Math.floor((Math.random() * 100) + 1);
      yPos = Math.floor((Math.random() * 25) + 1);
      size = Math.floor((Math.random() * defaults.MAX_BUBBLE_SIZE) + 1);
      delay = Math.floor((Math.random() * 100 * bubbleCount) + 1);
      scale = size / defaults.MAX_BUBBLE_SIZE;
      blur = scale * defaults.MAX_BLUR;
      speed = (1 - (scale * scale)) * defaults.MAX_ANIMATION_DURATION;
      opacity = 0.25 * (1 - scale);

      result.push({
      	xPos: xPos,
	      yPos: yPos,
	      size: size,
	      delay: delay,
	      scale: scale,
	      blur: blur,
	      speed: speed,
	      opacity: opacity
      });
		}
		this.setState({bubbles:result})
	}
	render(){
		return (
			<div className="beer" style={this.props.style}>
			  {
			  	this.state.bubbles.length ? this.state.bubbles.map((bubble,index) => {
			  		return React.createElement('div', {
			      	className: 'bubble',
			      	key: index,
			      	style: {
			      		width: `${bubble.size}px`,
			      		height: `${bubble.size}px`,
			      		left: `${bubble.xPos}%`,
			      		top: `${bubble.yPos}%`,
			      		animationDelay: bubble.delay + "ms",
			          animationDuration: bubble.speed + "ms",
			          filter: "blur(" + bubble.blur + "px)",
			          opacity: bubble.opacity
			      	}
			      })
			  	}) : null
				}
			</div>
		);
	}
}

export default Beer;