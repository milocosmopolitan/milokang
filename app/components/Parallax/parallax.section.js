import React from 'react';
import classNames from 'classnames';

const propTypes = {  
  isCurrent: React.PropTypes.bool,
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  fullHeight: React.PropTypes.bool,
  style: React.PropTypes.object
};

const defaultProps = {  
  isCurrent: false,
  mouseX: 0,
  mouseY: 0,
  fullHeight: false,
  style: {}
};



/*
 * Full page parallax scrolldown and up
 */
class ParallaxSection extends React.Component {
  render() {    
    const { id, style, fullHeight, isCurrent, mouseX, mouseY } = this.props;

    let classes = classNames('parallax-section', { fullHeight: fullHeight });

    let children = React.Children.map(this.props.children, function(child){
      return React.cloneElement(child, { isCurrent, mouseX, mouseY });
    });

    return React.createElement(
      'div',
      { 
        id: id, 
        className: classes,
        style: style
      },
      [children]
    );
  }
}

ParallaxSection.propTypes = propTypes;
ParallaxSection.defaultProps = defaultProps;

export default ParallaxSection;