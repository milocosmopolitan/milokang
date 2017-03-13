import React from 'react';
// import _ from 'lodash';

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"

class ParallaxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      zIndex: 0,
      mouseX: 0,
      mouseY: 0,
      lockScroll: false
    }
  }

  componentDidMount() {    
    this.initCurrent();
  }

  setScroll(bool){
    // console.log('setScroll', bool)
    this.setState({ lockScroll: bool });
  }  

  onMouseMove(e) {
    if(!ticking) {
      // this.initCurrent();
      this.setState({
        mouseX: e.pageX,
        mouseY: e.pageY,
      });
    }

  }

  nextIndex(direction, totalIndexNum){
    // this function returns next current index number
    let index = this.state.current;
    if(direction && direction === 'up') index ++;
    if(direction && direction === 'down') index --;
    if(index < 0) index = totalIndexNum -1;
    if(index > totalIndexNum -1) index = 0;
    return index;
  }

  indexLayer(direction=null, newIndex, totalIndexNum){
    let layers = {
      prev: null,
      back: totalIndexNum - 1,
      front: 0
    };

    if(direction === 'up') {
      layers.prev = this.state.current - 1 < 0 ? totalIndexNum - 1 : this.state.current - 1;
      layers.back = this.state.current;
      layers.front = newIndex;
    }

    if(direction === 'down') {
      layers.back = newIndex;
      layers.front = this.state.current;
    }

    return layers;
  }

  applyLayerStyle(elements=[], styleObj, layerIndex){
    // this function applies styles for front, back, previous layers
    for(let layer in styleObj) {
      for(let cssProp in styleObj[layer]) {
        // console.log( style, styleObj[layer], styleObj[layer][style] );
        elements.forEach(elem=>{
          if(layer==='prev' && typeof layerIndex.prev !== 'number') return;
          elem[layerIndex[layer]].style[cssProp] = styleObj[layer][cssProp];
        })        
      }
    }
  }

  initCurrent(){
    let viewportHeight = document.documentElement.clientHeight,
        sections = document.getElementsByClassName('parallax-section'),
        // contents = document.getElementsByClassName('parallax-content'),
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
        }

    this.applyLayerStyle([sections], styles, layers);
  }

  setCurrent(direction) {        
    // set new current index
    let sections = document.getElementsByClassName('parallax-section');
    let index = this.nextIndex(direction, sections.length);    
    let layers = this.indexLayer(direction, index, sections.length);
    // need to track 3 layers    
    this.layerTransition(layers, slideDurationSetting, direction);
    // this.slideDurationTimeout(slideDurationSetting);        
    this.setState({
      current: index,
      zIndex: this.state.zIndex + 2
    });    
  }

  parallaxScroll(e){
    // let delta = e.deltaY;
    
    // if (isFirefox) {
    //   //Set delta for Firefox
    //   delta = e.detail * (-120);
    // } else if (isIe) {
    //   //Set delta for IE
    //   delta = -e.deltaY;
    // } else {
    //   //Set delta for all other browsers
    //   delta = e.wheelDelta;
    // }
    if (!ticking && !this.state.lockScroll) {
      if (e.deltaY <= -scrollSensitivitySetting) {
        ticking = true;        
        this.setCurrent('down');        
      }
      if (e.deltaY >= scrollSensitivitySetting) {
        ticking = true;
        this.setCurrent('up');        
      }
    }
  }

  layerTransition(layers, slideDuration, direction){
    // console.log('layerTransition', layers)
    var framInterval = 10,
        timeframes = slideDuration / framInterval,
        transition = setInterval(transitionCallback.bind(this), framInterval);

    let viewportHeight = document.documentElement.clientHeight,
        backLayerDistancePerFrame = (viewportHeight / 2) / timeframes,
        frontLayerDistancePerFrame = viewportHeight / timeframes,
        backLayerY = direction === 'up' ? 0 : (- viewportHeight / 2),
        frontLayerY = direction === 'up' ? viewportHeight : 0;

    let sections = document.getElementsByClassName('parallax-section');

    let styles = {
      back: {
        visibility: 'visible',
        zIndex: this.state.zIndex + 1
      },
      front: {
        visibility: 'visible',
        zIndex: this.state.zIndex + 2
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
        ticking = false;
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

  // slideDurationTimeout(slideDuration) {    
  //   setTimeout(function() {
  //     ticking = false;
  //   }, slideDuration);
  // }

  render() {
    const { current, mouseX, mouseY } = this.state;

    let viewportHeight = document.documentElement.clientHeight,
        elementProps = Object.assign({
          className: "parallax-container",
          onMouseMove: this.onMouseMove.bind(this),

        });

        if(!this.props.lock) elementProps.onWheel = this.parallaxScroll.bind(this);

    let children = React.Children.map(this.props.children, child => {
      // console.log(child)
      let childProps = {};
      if(child.type.name === 'ParallaxSection'){
        childProps = { 
          style: {
            zIndex: 1,
            visibility: 'hidden',
            transform: `matrix(1, 0, 0, 1, 0, ${viewportHeight})`
          },
          current: current,
          mouseX: mouseX,
          mouseY: mouseY,

        }
      } else if(child.type.name === 'ParallaxNav'){
        childProps.setCurrent = this.setCurrent.bind(this);
      } else if(child.type.name === 'ContentContainer'){
        childProps.current = current;
        childProps.setScroll = this.setScroll.bind(this);
      } else {
        childProps.
        childProps = child.props;
      }
      return React.cloneElement(child, childProps);
    });        
    // console.log(children, this.state)

    return React.createElement(
      'div',
      {...elementProps},
      [children]
    )    
  }
}
export default ParallaxContainer;