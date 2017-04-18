import React from 'react';

const classNames = require('classnames');

const propTypes = {  
  current: React.PropTypes.number,  //current section index do I need this???
  dimensionStyle: React.PropTypes.string,  
};

const defaultProps = {  
  current: 0,  
  dimensionStyle: 'flat',  
};

let smartObjectStyle = {
  position: 'absolute',
  transformStyle: 'flat',
  backfaceVisibility: 'hidden'
};

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

import { Cube } from '../index.js';

class ContentContainer extends React.Component {
  constructor(props) {
    super(props); 
  }

  renderInfo(){
    const { children, current } = this.props;
    return children && children.length ? 
      React.Children.map(children, (child, index)=>{
        if(current === index) {
          let childProps = Object.assign({}, child.props);
          childProps.short = true;
          return React.cloneElement(child, childProps);
        }      
      }) : null;
  }

  renderDetail(){
    const { children, current } = this.props;
    return children && children.length ? 
      React.Children.map(children, (child, index)=>{
        if(current === index) {
          return React.cloneElement(child, child.props);
        }
      }) : null;
  }

  renderCube(){
    const { current, children, setScroll } = this.props;
    let viewportHeight = document.documentElement.clientHeight,
        viewportWidth = document.documentElement.clientWidth;

    let backgroundColor = children && children.length 
                        ? children[current].props.colors.background 
                        : {r:0, g:0, b:0, a:0};

    return (
      <div className="smart-object" style={wrapperStyle}>
        <Cube.Container x={viewportWidth / 2} y={viewportHeight - 40} z={viewportWidth - 40} setScroll={setScroll}>
          <Cube.Side side="front" rgba={backgroundColor}>
            { this.renderInfo() }
          </Cube.Side>
          <Cube.Side side="left" rgba={backgroundColor}>
            <div style={{
              width: `${viewportWidth / 2}vw`,
              position: 'relative',
              marginLeft: 'auto'
            }}>
              <div>
                <div>
                  HOME
                </div>
                <div>
                  ABOUT
                </div>
                <div>
                  PROJECTS
                </div>
                <div>
                  BLOGS
                </div>
              </div>
            </div>
          </Cube.Side>
          <Cube.Side side="right" rgba={backgroundColor} overflow="scroll">
            { this.renderDetail() }            
          </Cube.Side>          
        </Cube.Container>
      </div>
    );
  }

  renderFlat(){
    return (
      <div className="smart-object" style={wrapperStyle}>
        <div>
          <div className="smart-btn menu-btn">
            <i className="fa fa-bars"></i>
          </div>
          <div className="smart-btn rotate-right-btn">
            <i className="fa fa-angle-right"></i>
          </div>
          <div className="smart-btn rotate-left-btn">
            <i className="fa fa-angle-left"></i>
          </div>
        </div>
        <div className="smart-object" style={backgroundStyle} />
        <div className="smart-object" style={childrenWrapperStyle}>
          { this.props.children[this.props.current] }
        </div>
      </div>
    );
  }

  render(){
    const { dimensionStyle } = this.props;    
    let viewportWidth = document.documentElement.clientWidth;
    let containerStyle = Object.assign({
      zIndex: 999,
      width: `${viewportWidth / 2}px`,
      height: '100%',
    }, smartObjectStyle);
    return (
      <div className="smart-object" style={containerStyle}>
        {
          dimensionStyle === 'flat' ? this.renderFlat() : this.renderCube()
        }
      </div>
    );
  }
}

ContentContainer.propTypes = propTypes;
ContentContainer.defaultProps = defaultProps;

export default ContentContainer;