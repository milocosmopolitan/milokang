import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Sidebar, Footer, Contact, Projects } from '../../components';
import {
  Link,
  Events,
  animateScroll,
  scrollSpy
} from 'react-scroll';

/* -----------------    COMPONENT     ------------------ */

class RootComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mouseX: 0,
  //     mouseY: 0,
  //     currentY: 0
  //   }
  //   this.handleScroll = this.handleScroll.bind(this);
  // }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  // onMouseMove(e) {
  //   this.setState({
  //     mouseX: e.pageX,
  //     mouseY: e.pageY,
  //   })
  // }

  // handleScroll() {
  //   console.log('handleScroll')
  //   this.setState({
  //     currentY: this.currentPositionY()
  //   })
  // }

  // currentPositionY() {
  //   var supportPageOffset = window.pageXOffset !== undefined;
  //   var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  //   return supportPageOffset ? window.pageYOffset : isCSS1Compat ?
  //     document.documentElement.scrollTop : document.body.scrollTop;
  // }

  // parallex(strength, options = false) {
  //   // options properties
  //   // {
  //   //   fixed: boolean,
  //   //   background: boolean
  //   // }

  //   const { mouseX, mouseY, currentY } = this.state;

  //   let html = document.documentElement,
  //     viewportHeight = options && options.fixed ? html.scrollHeight : html.clientHeight,
  //     viewportWidth = html.clientWidth;

  //   let fixedPosition = options && options.fixed ? 0 : currentY;

  //   let positionX = (strength / viewportWidth) * (mouseX - (viewportWidth / 2)) * -1,
  //     positionY = (strength / viewportHeight) * (mouseY - (viewportHeight / 2)) * -1 - fixedPosition;

  //   console.log(viewportHeight, window.innerHeight, mouseY, currentY)

  //   if (options && options.background) {
  //     return {
  //       backgroundPosition: `calc(${positionX}px - 3vw) calc(${positionY}px - 3vh)`
  //     }
  //   }
  //   return {
  //     transform: `matrix(1,0,0,1, ${positionX}, ${positionY})`
  //   }
  // }

  render() {
    // let newState = Object.assign({}, this.state);
    // newState.parallex = this.parallex.bind(this);

    return ( 
      <div>
        {
          this.props.children && React.cloneElement(this.props.children)
        } 
      </div>
    );
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({}, ownProps) => {
  return {}
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(RootComponent);
