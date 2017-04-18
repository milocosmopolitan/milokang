import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
const classNames = require('classnames');

const propTypes = {
  title:        React.PropTypes.string,
  subheading:   React.PropTypes.string,
  description:  React.PropTypes.string,  
  component:    React.PropTypes.func,
  content:      React.PropTypes.string,
  colors:       React.PropTypes.object,  
  links:        React.PropTypes.array,
  technology:   React.PropTypes.array,  
  short:        React.PropTypes.bool,
};
const defaultProps = {
  short: false,
  title: 'Heading',
  subheading: 'Sub Heading',
  description: 'Lorem ipsum ....',
  component: null,
  content: '',
  colors: {
    background: { r:0, g:0, b:0, a:0.5 },
    font: "#FFFFFF",
    highlight: "#FFFFFF"
  },
  links: [],
  technology: []
};

let WrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

class ContentDetail extends React.Component {
  constructor(props) {
    super(props); 
  }  

  renderInfo(){
    const {title, subheading, description, colors, rotate, technology} = this.props;
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
            <span style={{color: colors.highlight}}>{subheading}</span>
          </div>
          <div className="description hidden-sm">{`${description.slice(0, 200)}...`}</div>
          <div className="technology hidden-md">
            {
              technology && technology.length ? technology.map((tech, index) => {
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
    const { title, subheading, description, content, component, colors, links } = this.props;

    function generateGradient(direction) {
      return {
        position: 'fixed', 
        background: `linear-gradient(to ${direction}, rgba(255, 0, 0, 0), rgba(${colors.background.r}, ${colors.background.g}, ${colors.background.b}, ${colors.background.a}))`,
      };
    }
    return (
      <div>
        <div className="content-detail smart-object">
          <Grid fluid={true}>
            <Row>          
              <Col className="info" xsHidden={true} mdHidden={true} lg={4}>
                <div className="heading">{title}</div>
                <div className="sub-heading sub-heading-lg">
                  <span style={{color: colors.highlight}}>{subheading}</span>
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
                  component ? component({colors}) : content
                }
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="top-grad" style={generateGradient('top')}></div>
        <div className="bottom-grad" style={generateGradient('bottom')}></div>
      </div>
    );
  }

  render(){
    return (
      <div style={WrapperStyle}>
        { 
          this.props.short 
            ? this.renderInfo()
            : this.renderDetail() 
        }
      </div>
    );
  }
}

ContentDetail.propTypes = propTypes;
ContentDetail.defaultProps = defaultProps;

export default ContentDetail;