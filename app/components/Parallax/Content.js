import React from 'react';

const classNames = require('classNames');

const propTypes = {  
  current: React.PropTypes.number,  //current section index
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number
};

const defaultProps = {  
  current: 0,
  mouseX: 0,
  mouseY: 0
};

class ParallaxContent extends React.Component {
	constructor(props) {
		super(props);	
	}  
	render(){		
	  let viewportHeight = document.documentElement.clientHeight,
        viewportWidth = document.documentElement.clientWidth;

    let children = React.Children.map(this.props.children, child => {
      let element = React.cloneElement(child);
      return React.createElement('div', {
          className: 'parallax-content',
          style: {
            zIndex: 1,
            visibility: 'hidden',
            transform: `matrix(1, 0, 0, 1, 0, ${viewportHeight})`
          }
        },
        [element]
      );      
    });

    let smartObjectStyle = {
      position: 'absolute',
      transformStyle: 'flat',
      backfaceVisibility: 'hidden'
    };

    let containerStyle = Object.assign({
      zIndex: 999,
      width: `${viewportWidth/2}px`,
      height: '100%',
    }, smartObjectStyle);

    let wrapperStyle = Object.assign({
      display: 'block',
      width: '100%',
      height: 'auto',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: '20px 0px 20px 20px'
    }, smartObjectStyle);
    
    let backgroundStyle = Object.assign({
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
      width: '100%',
      height: '100%',
      background: 'rgb(41, 41, 41)',
      opacity: '0.9',
    }, smartObjectStyle);

    let childrenWrapperStyle = Object.assign({
      transform: 'translate3d(0px, 0px, 0px)',
      width: '100%',
      height: '100%',
    }, smartObjectStyle);

    return (
      <div className="smart-object" style={containerStyle}>
        <div className="smart-object" style={wrapperStyle}>
          <div className="smart-object" style={backgroundStyle} />
          <div className="smart-object" style={childrenWrapperStyle}>
            { children[this.props.current] }
          </div>
        </div>
      </div>
    );
	}
}

ParallaxContent.propTypes = propTypes;
ParallaxContent.defaultProps = defaultProps;

export default ParallaxContent;