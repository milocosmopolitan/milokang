import React from 'react';

const classNames = require('classNames');

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

import { Cube } from '../index.js'

class ContentContainer extends React.Component {
  constructor(props) {
    super(props); 
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.current !== nextProps.current){
      // console.log(this.props.current, nextProps.current)
    }
  }

  renderInfo(current){
    return React.Children.map(this.props.children, (child, index)=>{
      if(this.props.current === index) {
        let childProps = Object.assign({}, child.props);
        // console.log(child, childProps)
        childProps.content = null;
        return React.cloneElement(child, childProps);
      }      
    });
  }
  renderDetail(current){
    return React.Children.map(this.props.children, (child, index)=>{
      if(this.props.current === index) {

        // console.log('renderDetail', child)
        return React.cloneElement(child, child.props);
      }
    });
  }
  renderCube(){
    const { current } = this.props;
    let viewportHeight = document.documentElement.clientHeight,
        viewportWidth = document.documentElement.clientWidth;

    return (
      <div className="smart-object" style={wrapperStyle}>
        <Cube.Container x={viewportWidth / 2} y={viewportHeight - 40} z={viewportWidth - 40} setScroll={this.props.setScroll}>
          <Cube.Side side="front" rgba={this.props.children[this.props.current].props.backgroundColor}>
            { this.renderInfo(current) }
          </Cube.Side>
          <Cube.Side side="back">
            Back
          </Cube.Side>
          <Cube.Side side="left" rgba={this.props.children[this.props.current].props.backgroundColor}>
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
          <Cube.Side side="right" rgba={this.props.children[this.props.current].props.backgroundColor} overflow="scroll">
            { this.renderDetail(current) }            
          </Cube.Side>
          <Cube.Side side="top">Top</Cube.Side>
          <Cube.Side side="bottom">Bottom</Cube.Side>
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
    let viewportHeight = document.documentElement.clientHeight,
        viewportWidth = document.documentElement.clientWidth;

    let containerStyle = Object.assign({
      zIndex: 999,
      width: `${viewportWidth/2}px`, // expand to `${viewportWidth-40}px`
      height: '100%',
    }, smartObjectStyle);

    const { dimensionStyle } = this.props;

    let contentWrapper = dimensionStyle === 'flat' ? this.renderFlat() : this.renderCube();

    return (
      <div className="smart-object" style={containerStyle}>
        {contentWrapper}
      </div>
    );
  }
}

ContentContainer.propTypes = propTypes;
ContentContainer.defaultProps = defaultProps;

export default ContentContainer;