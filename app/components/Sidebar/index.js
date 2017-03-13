/*
 * Default Blank Component 
 */

import React from 'react';
import { Link } from 'react-router';
var classNames = require('classnames');

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuStatus: false,
			menuButtonStatus: false
		}
	}

	toggleMenu(){
		
		if(this.state.menuStatus){
			const contentWrapper = document.getElementById('content-wrapper');		
			contentWrapper.className = "";
			this.setState({
				menuStatus: false,
				menuButtonStatus: false
			})
		} else {
			const contentWrapper = document.getElementById('content-wrapper');		
			contentWrapper.className = "open";
			this.setState({
				menuStatus: true,
				menuButtonStatus: true
			})
		}	
	}

	onClickMenuButton(e) {				
		this.toggleMenu();
	}

	onClickMenuItem(e) {
		this.toggleMenu();
		const { name } = e.target;
		const contentSections = document.getElementsByClassName('section-wrapper'),
					miloWrapper = document.getElementById('milo-wrapper'),
					targetElem = document.getElementById(name);		
		Array.prototype.forEach.call(contentSections, section=>{			
			let className = section.className.split(' '),
					index = className.findIndex(str=>(str==='active'))
			if( index >= 0 ) { // if index exist
				className.splice(index, 1);
			}
			section.className = className.join(' ');
		});		

		if(name==='about') miloWrapper.className = "active"
		else miloWrapper.className = ""
		targetElem.className += " active";
		
	}

	render(){
		return (
			<div id="sidebar" style={this.props.parallex(35, {fixed: true})}>
		  	<div id="btn-menu" 
		  		className={classNames({open: this.state.menuButtonStatus})} 
		  		onClick={this.onClickMenuButton.bind(this)}>
					<span className="top"></span>
					<span className="middle"></span>
					<span className="bottom"></span>
				</div>

		  	<div className={classNames('menu', {open: this.state.menuStatus})}>		  		
		  		<div>
			  		<ul>
			  			<li>
			  				<Link name="about" onClick={this.onClickMenuItem.bind(this)}>About</Link>
		  				</li>
		  				<li>
			  				<Link name="projects" onClick={this.onClickMenuItem.bind(this)}>Projects</Link>
		  				</li>
		  				<li>
			  				<Link name="blog" onClick={this.onClickMenuItem.bind(this)}>Blog</Link>
		  				</li>
		  				<li>
			  				<Link name="contact" onClick={this.onClickMenuItem.bind(this)}>Contact</Link>
		  				</li>
			  		</ul>
		  		</div>		  		
		  	</div>

		  </div>		
		)
	}
}
 