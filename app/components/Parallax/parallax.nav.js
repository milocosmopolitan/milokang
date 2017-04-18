import React from 'react';

const ParallaxNav = props => {
		return (
			<div>
        <div className="smart-btn prev-btn" onClick={()=>{props.setCurrent('down')}}>
          <i className="fa fa-chevron-circle-up"></i>
        </div>
        <div className="smart-btn next-btn" onClick={()=>{props.setCurrent('up')}}>
          <i className="fa fa-chevron-circle-down"></i>
        </div>
      </div>
		);
};

export default ParallaxNav;