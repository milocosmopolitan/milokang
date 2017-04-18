import React from 'react';

const propTypes = {
  sensitivity: React.PropTypes.number,
  slideDuration: React.PropTypes.number,
};

const defaultProps = {
  sensitivity: 50,
  slideDuration: 600
};

class ParallaxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      zIndex: 0,
      mouseX: 0,
      mouseY: 0,
      lockScroll: false, // when it's set to true, prevents parallaxScroll to be invoke
      inTransition: false, // when it's set to true, prevents onMouseMove to be invoke
    };
  }

  initCurrent(){
    // Set styles for top two sections as back and front layer 
    let viewportHeight = document.documentElement.clientHeight,
        sections = document.getElementsByClassName('parallax-section'),
        layers = this.indexLayer(null, this.state.current, sections.length),
        styles = {
          back: {
            visibility: 'visible',
            zIndex: 1,
            transform: `matrix(1, 0, 0, 1, 0, ${(-viewportHeight/2)})`  
          },
          front: {
            visibility: 'visible',
            zIndex: 2,
            transform: `matrix(1, 0, 0, 1, 0, 0)`  
          }
        };
    if(!sections.length) return false;
    this.applyLayerStyle([sections], styles, layers);
  }

  setCurrent(direction) {            
    // set new current index depend on direction of mousewheel
    let sections = document.getElementsByClassName('parallax-section'),
        index = this.nextIndex(direction, sections.length),
        layers = this.indexLayer(direction, index, sections.length);

    this.layerTransition(layers, direction); // start transition
    this.setState({      
      current: index,
      zIndex: this.state.zIndex + 2
    });    
  }

  setScroll(bool){
    this.setState({ lockScroll: bool });
  }

  onMouseMove(e) {
    if(!this.state.inTransition) {      
      this.setState({
        mouseX: e.pageX,
        mouseY: e.pageY,
      });
    }
  }

  nextIndex(direction, totalIndexNum){
    // returns next current index number according to direction of mousewheel
    let index = this.state.current;
    if(direction && direction === 'up') index ++;
    if(direction && direction === 'down') index --;
    if(index < 0) index = totalIndexNum -1;
    if(index > totalIndexNum -1) index = 0;
    return index;
  }

  indexLayer(direction=null, newIndex, totalIndexNum){
    // calculates previous, back, front layers index
    const { current } = this.state;
    let layers = {
      prev: null,
      back: totalIndexNum - 1,
      front: 0
    };

    if(direction === 'up') {
      layers.prev = current - 1 < 0 ? totalIndexNum - 1 : current - 1;
      layers.back = current;
      layers.front = newIndex;
    }

    if(direction === 'down') {
      layers.back = newIndex;
      layers.front = current;
    }

    return layers;
  }

  applyLayerStyle(elements=[], styleObj, layerIndex){

    for(let layer in styleObj) {
      for(let cssProp in styleObj[layer]) {
        elements.forEach(elem=>{
          if(layer==='prev' && typeof layerIndex.prev !== 'number') return;
          elem[layerIndex[layer]].style[cssProp] = styleObj[layer][cssProp];
        })        
      }
    }
  }

  parallaxScroll(e){   
    const { sensitivity } = this.props,
          { inTransition, lockScroll } = this.state;

    if (!inTransition && !lockScroll) {
      if (e.deltaY <= -sensitivity) {         
        this.setState({ inTransition:true });
        this.setCurrent('down');        
      }
      if (e.deltaY >= sensitivity) {
        this.setState({ inTransition:true });
        this.setCurrent('up');        
      }
    }
  }

  layerTransition(layers, direction){
    // console.log('layerTransition', layers)
    const { slideDuration } = this.props;

    let frameInterval = 30,
        timeframes = slideDuration / frameInterval,
        transition = setInterval(transitionCallback.bind(this), frameInterval);

    let viewportHeight = document.documentElement.clientHeight,
        backLayerDistancePerFrame = (viewportHeight / 2) / timeframes,
        frontLayerDistancePerFrame = viewportHeight / timeframes,
        backLayerY = direction === 'up' ? 0 : (- viewportHeight / 2),
        frontLayerY = direction === 'up' ? viewportHeight : 0;

    let sections = document.getElementsByClassName('parallax-section');

    let styles = {
      back: {
        visibility: 'visible',
        zIndex: this.state.zIndex + 1,
        transition: `transfrom ${1}s ease-in`
      },
      front: {
        visibility: 'visible',
        zIndex: this.state.zIndex + 2,
        transition: `transfrom ${1}s ease-in`
      },
      prev: {
        visibility: 'visible',
        transform: `matrix(1, 0, 0, 1, 0, ${viewportHeight})`
      }
    };

    this.applyLayerStyle([sections], styles, layers);    

    function transitionCallback() {
      
      if(timeframes <= 0) {
        clearInterval(transition);
        this.setState({
          inTransition: false
        })
        return;
      }
      
      if(direction === 'up'){
        backLayerY -= backLayerDistancePerFrame; // from 0 to - backLayerDistance        
        frontLayerY -= frontLayerDistancePerFrame; // from frontLayerDistance to 0
      } else {        
        backLayerY += backLayerDistancePerFrame; // from - backLayerDistance to 0
        frontLayerY += frontLayerDistancePerFrame; // from 0 to frontLayerDistance
      }

      this.applyLayerStyle([sections], {
        back: {
          transform: `matrix(1, 0, 0, 1, 0, ${backLayerY})`
        },
        front: {
          transform: `matrix(1, 0, 0, 1, 0, ${frontLayerY})`
        }
      }, layers);
      timeframes --;
    }
  }

  render() {
    const { current, mouseX, mouseY, lockScoll } = this.state;

    let viewportHeight = document.documentElement.clientHeight,
        elementProps = Object.assign({
          className: "parallax-container",
          onMouseMove: this.onMouseMove.bind(this),
        });

    if(!lockScoll) elementProps.onWheel = this.parallaxScroll.bind(this);

    // console.log(this.props.children)
    let children = this.props.children && this.props.children.length ? 
      React.Children.map(this.props.children, child => {
        
        let childProps = {};
        if(!child) return;
        if(child.type.name === 'ParallaxBackground'){
          childProps = {             
            current: current,
            mouseX: mouseX,
            mouseY: mouseY,
            initCurrent: this.initCurrent.bind(this)
          }        
        } else if(child.type.name === 'ParallaxNav'){
          childProps.setCurrent = this.setCurrent.bind(this);
        } else if(child.type.name === 'ContentContainer'){
          childProps.current = current;
          childProps.setScroll = this.setScroll.bind(this);
        } else {        
          childProps = child.props;
        }
        return React.cloneElement(child, childProps);
      }) : null;

    // console.log(children)

    return React.createElement(
      'div',
      {...elementProps},
      [children]
    )    
  }
}

ParallaxContainer.propTypes = propTypes;
ParallaxContainer.defaultProps = defaultProps;

export default ParallaxContainer;