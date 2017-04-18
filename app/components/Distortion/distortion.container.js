import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  isCurrent: React.PropTypes.bool, //current section index
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  effectWeight: React.PropTypes.number,
  enableSmoothing: React.PropTypes.bool,
  outerBuffer: React.PropTypes.number,
  elementDepth: React.PropTypes.number
};

const defaultProps = {
  isCurrent: false,
  mouseX: 0,
  mouseY: 0,
  effectWeight: 1.2,
  enableSmoothing: true,
  outerBuffer: 1.1,
  elementDepth: 145
};

let defaultDimensions = {
  position: 'absolute',
  width: '110%',
  height: '110%',
  top: '-5%',
  left: '-5%' 
}

let containerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};


let parent3dStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
  opacity: 1
};


class DistortionContainer extends React.Component {
	constructor(props) {
		super(props);	
		this.options = {
      directions: [1, 1, 1, 1, -1, -1, 1, 1],
      weights: [0.0000310, 0.0001800, 0.0000164, 0.0000019, 0.0001200],    
      basePerspective: 9000  
    };
    this.state = {
    	matrix3d: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
      dimensions: null,
      center: {
        x: ((document.documentElement.clientWidth * props.outerBuffer) / 2),
        y: ((document.documentElement.clientHeight * props.outerBuffer) / 2)
      }
    };
    this.onResize = this.onResize.bind(this);
	}

  componentWillUnmount () {
    if( typeof window !== 'undefined' )
      window.removeEventListener('resize', this.onResize)
  }


	componentDidMount() {
		const { mouseX, mouseY } = this.props;    
    this.calculateOuterContainer();
		this.setTransform(mouseX, mouseY);    

    if ( typeof window !== 'undefined' )
      window.addEventListener('resize', this.onResize, false)
	}

	componentWillReceiveProps(nextProps) {
		const { mouseX, mouseY, isCurrent } = this.props;
		if (isCurrent && ( mouseX !== nextProps.mouseX || mouseY !== nextProps.mouseY )) {
			this.setTransform(nextProps.mouseX, nextProps.mouseY);
		}
	}
  onResize(){
    console.log('Resizing!')
    this.calculateOuterContainer();
  }
  
	calculateOuterContainer(){
    const container = ReactDOM.findDOMNode(this);    
    let width   = container.offsetWidth * this.props.outerBuffer,
        height  = container.offsetHeight * this.props.outerBuffer,
        left    = Math.abs((width - container.offsetWidth) / 2),
        top     = Math.abs((height - container.offsetHeight) / 2);

    // console.log('calculateOuterContainer', container, container.offsetWidth, container.clientWidth);
    // console.log('calculateOuterContainer', width, height, left, top)
    this.setState({
      dimensions: {
        width: width.toFixed(2),
        height: height.toFixed(2),
        left: -left.toFixed(2),
        top: -top.toFixed(2)
      },
      center: {
        x: (width / 2).toFixed(2),
        y: (height / 2).toFixed(2),
      }
    });    
  }

	setTransform(mouseX, mouseY){
		let viewportHeight = document.documentElement.clientHeight,
    		viewportWidth = document.documentElement.clientWidth,
    		positionX = mouseX,
      	positionY = mouseY;

    // console.log('setTransform', mouseX, mouseY, positionX, positionY, this.generateTransformString(positionX, positionY))
		this.setState({
			matrix3d: this.generateTransformString(positionX, positionY)
		})
	}

	getDistance2d(currX, currY, targetX, targetY) {
    return Math.sqrt(Math.pow(currX - targetX, 2) + (Math.pow(currY - targetY, 2)));
  }

	getDistanceFromCenter(appliedX, appliedY) {
    return this.getDistance2d(appliedX, appliedY, this.state.center.x, this.state.center.y);
  }

  getDistanceFromEdgeCenterAndCenter(fromCenter, fromX, fromY) {
    //divide by 50 instead of 100 because distance is already divided by 2
    return -((fromCenter/100) * (fromX/50) * (fromY/50));
  }

  applyTransform(distance, effect) {
    return distance * this.options.weights[effect];
  }

	calculateTransform(appliedX, appliedY) {
    var _transforms = [];
    var _directions = this.options.directions;
    var _temp;

    var _fromCenter = this.getDistanceFromCenter(appliedX, appliedY);
    var _fromX = appliedY - this.state.center.y; //
    var _fromY = appliedX - this.state.center.x; //

    var _fromCenterAndEdge = this.getDistanceFromEdgeCenterAndCenter(_fromCenter, _fromX, _fromY);
    const {effectWeight} = this.props;

    // Lets add our transforms to the array
    _transforms.push(_directions[0] * (1 - (this.applyTransform(_fromCenter, 0) * effectWeight)));
    _transforms.push(_directions[1] * (this.applyTransform(_fromY, 1) * effectWeight));
    _transforms.push(_directions[2] * (this.applyTransform(_fromCenterAndEdge, 2) * effectWeight));
    _transforms.push(_directions[3] * (1 - (this.applyTransform(_fromCenter, 3) * effectWeight)));
    _transforms.push(_directions[4] * (this.applyTransform(_fromX, 4) * effectWeight));
    _transforms.push(_directions[5] * _transforms[1]);
    _transforms.push(_directions[6] * _transforms[4]);
    _transforms.push(_directions[7] * Math.abs(_transforms[3]));
    _transforms.forEach((transform, index) => {
      _transforms[index] = transform.toFixed(5);
    });

    return _transforms;
  }

	generateTransformString(appliedX, appliedY){
		var _transforms = this.calculateTransform(appliedX, appliedY);

    var _transformString = 'matrix3d(' +
      _transforms[0]+ ', 0, ' + _transforms[1] + ', 0, ' +
      _transforms[2] + ', ' + _transforms[3] + ', ' + _transforms[4] + ', 0, ' +
      _transforms[5] + ', ' + _transforms[6] + ', ' + _transforms[7] + ', 0, ' +
      '0, 0, 100, 1)';

    return _transformString;
	}
 
  renderChildren(){
    const { dimensions } = this.state;
    if(!this.props.children) return;
    let children = React.Children.map(this.props.children, (child) => {
      
      if(child.props.layer){
        let contentProps = Object.assign({
          dimensions: dimensions,
          layer: child.props.layer,
        }, this.props);
                
        return React.cloneElement(child, {...contentProps});
      }      
    })

    return children;
  }

  generateBufferDimensionsStyle(){
    const { dimensions } = this.state;    
    
    return {
      position: 'absolute',
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      top: `${dimensions.top}px`,
      left: `${dimensions.left}px`
    }
  }

	render(){		
    const { dimensions, matrix3d } = this.state;
    const { basePerspective } = this.options;
    const { outerBuffer, enableSmoothing } = this.props;    
		return (
      <div style={containerStyle}>
  			<div style={!dimensions ? defaultDimensions : this.generateBufferDimensionsStyle()}>
  				<div style={Object.assign({perspective:`${basePerspective*outerBuffer}px`}, parent3dStyle)}>
  					<div className="smart-object" style={{
              position: 'relative',
              transform: matrix3d,
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              transition: 'transform 0.8s linear'
            }}>
  						{ this.renderChildren() }
  					</div>
  				</div>
  			</div>
      </div>
		);
	}
}
DistortionContainer.propTypes = propTypes;
DistortionContainer.defaultProps = defaultProps;

export default DistortionContainer;