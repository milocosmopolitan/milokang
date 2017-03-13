import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const classNames = require('classNames');

// let dummyData = {
//   title: 'Hopfinder',
//   subTitle: 'Beer enthusiast must have app',
//   description: "Artist Katie Paterson’s work is about natural phenomenon like time, the universe and volcanoes. We became a mix of a rational scientists and poetic artists when we shaped the digital experience to match her newest piece, Hollow."
// };

// let dummyAbout = {
//   title: 'Hi there.',
//   subTitle: "My name is Milo & I'm a web developer with designer's state of mind.",
//   description: "I'm focused on creating simple, beautiful and easy to use digital solutions for all types of businesses with a passion for the web, and mobile development. When I’m not making websites, I tend to be working out, brew coffee , learning a new programming language.",
//   contents: {

//   }
// };
const propTypes = {
  backgroundColor: React.PropTypes.object,
  bound: React.PropTypes.string,
  title: React.PropTypes.string,
  subheading: React.PropTypes.string,
  description: React.PropTypes.string,
  fontColor: React.PropTypes.string,
  highlightColor: React.PropTypes.string,
  links: React.PropTypes.array,
  technology: React.PropTypes.array,
};
const defaultProps = {
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 0.5
  },
  bound: '',
  title: 'Heading',
  subheading: 'Sub Heading',
  description: 'Lorem ipsum ....',
  fontColor: '#FFFFFF',
  highlightColor: '#FFFFFF',
  links: [],
  technology: []
};

    let WrapperStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    } 
    let ContentInfoStyle = {
      position: 'absolute',
      transformStyle: 'flat',
      backfaceVisibility: 'hidden',
      left: '52%',
      bottom: '70px',
      right: '0px',
      width: 'auto',
      maxWidth: '400px',
      height: 'auto',
      minHeight: '229px',
      margin: '0px 40px 0px 0px',
      display: 'block',
      cursor: 'pointer',
      overflow: 'visible'
    };

    let ContentDetailStyle = {
      position: 'absolute',
      transformStyle: 'flat',
      backfaceVisibility: 'hidden',      
      display: 'block',      
      overflow: 'visible'
    };

class ContentDetail extends React.Component {
  constructor(props) {
    super(props); 
  }  

  renderInfo(){
    const {title, subheading, description, highlightColor, children, rotate, technology} = this.props;
    return (
      <div>
        <div className="email smart-object">
          contact@milokang.com
        </div>
        <div className="copyright smart-object">
          © Copyright 2017
        </div>
        <div className="slogan smart-object">
          Let's build something great
        </div>
        <div className="content-info smart-object" onClick={()=>{rotate('right')}}>
          <div className="heading">{title}</div>
          <div className="sub-heading sub-heading-lg">
            <span style={{color: highlightColor}}>{subheading}</span>
          </div>
          <div className="description hidden-sm">{`${description.slice(0, 200)}...`}</div>
          <div className="technology hidden-md">
            {
              technology.length ? technology.map((tech, index) => {
                return (
                  <div className="tech-tag" key={index}>{tech}</div>
                )
              }) : null
            }
          </div>
        </div>
      </div>
    );
  }

  renderDetail(){
    const { title, subheading, description, children, content, backgroundColor, highlightColor, links } = this.props;

    let bottomGradient = {      
      position: 'fixed',      
      background: `linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a}))`,
    }
    let topGradient = {      
      position: 'fixed',      
      background: `linear-gradient(to top, rgba(255, 0, 0, 0), rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a}))`,
    }
    return (
      <div>
        <div className="content-detail smart-object">
          <Grid fluid={true}>
            <Row>          
              <Col className="info" xsHidden={true} mdHidden={true} lg={4}>
                <div className="heading">{title}</div>
                <div className="sub-heading sub-heading-lg">
                  <span style={{color: highlightColor}}>{subheading}</span>
                </div>
                <div className="description">{description}</div>
                {
                  links.length ? links.map((link, index) => {
                    return (
                      <Link key={index} className="link-btn btn" href={link.url} target="_blank">{link.title}</Link>
                    );
                  }) : null
                }
              </Col>
              <Col xs={12} lg={8}>
                {
                  content()
                }
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="top-grad" style={topGradient}></div>
        <div className="bottom-grad" style={bottomGradient}></div>
      </div>
    );
  }

  render(){    

    const { title, subheading, description, children, content } = this.props;
    return (
      <div style={WrapperStyle}>
        { 
          content 
            ? this.renderDetail()
            : this.renderInfo() 
        }
      </div>
    );
  }
}

ContentDetail.propTypes = propTypes;
ContentDetail.defaultProps = defaultProps;

export default ContentDetail;