import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class About extends React.Component {
  constructor(props) {
    super(props);    
  }
  render(){
    let highlightColor = {
      color: '#00ffae'
    }
    return (
      <Grid fluid={true}>
        <Row>          
          <Col xs={12} lg={6} className="section-col">
            <div className="heading">Skills</div>
            <div className="sub-heading-sm">
              <span style={highlightColor}>
              A list of abilities I’m proud to have learned</span>
            </div>
            <Grid fluid={true}>
              <Row className="section-row">
                <Col xs={6}>
                  <div className="text-lg" style={highlightColor}><strong>Coding</strong></div>
                  <div>HTML/CSS</div>
                  <div>Javascript</div>
                  <div>PHP</div>
                  <div>MySQL/Postgres</div>
                </Col>
                <Col xs={6}>
                  <div className="text-lg" style={highlightColor}><strong>Design</strong></div>
                  <div>Web Design</div>
                  <div>Mobile/Web App</div>
                  <div>UI/UX</div>
                  <div>Branding & Print</div>
                </Col>                
              </Row>              
              <Row className="section-row">
                <Col xs={12}>
                  <div className="text-lg" style={highlightColor}><strong>Tools & Frameworks</strong></div>
                </Col>
                <Col xs={6}>
                  <div>Node.js</div>
                  <div>Express.js</div>
                  <div>React.js</div>
                  <div>Redux</div>
                  <div>Angular1.5</div>
                  <div>Laravel</div>
                  <div>Mocha/Chai</div>
                  <div>D3.js</div>
                </Col>
                <Col xs={6}>
                  <div>Photoshop</div>
                  <div>Illustrator</div>
                  <div>Bootstrap</div>
                  <div>Materialize</div>
                </Col>                
              </Row>
            </Grid>
          </Col>
          <Col xs={12} lg={6} className="section-col">
            <div className="heading">Experience</div>
            <div className="sub-heading-sm">
              <span style={highlightColor}>
              Here's where I've been</span>
            </div>            
            <Grid fluid={true}>
              <Row className="section-row">
                <Col xs={12}>
                  <div className="text-lg" style={highlightColor}><strong>Wholesale24x7.com</strong></div>                  
                  <div className="text-md">March 2015 - October 2015</div>
                </Col>
                <Col xs={12}>
                  <div className="text-md" style={highlightColor}>Web Developer</div>
                  <div>Created an user-friendly custom back-end admin platform for existing e-commerce built on zen-cart. The primary goal was to increase work efficiency by providing electronic invoicing method for purchase orders and visualizing the sales reports. Automated email, bulk actions, data visualization, drag and drop file upload features were included in the project, which allowed the business to easily monitor inventory transactions and focuses more on marketing and sales, while spending less time on daily operation tasks.</div>
                </Col> 
              </Row>
              <Row className="section-row">
                <Col xs={12}>
                  <div className="text-lg" style={highlightColor}><strong>Wholesale24x7.com</strong></div>                  
                  <div className="text-md">January 2012 - October 2015</div>
                </Col>
                <Col xs={12}>
                  <div className="text-md" style={highlightColor}>Marketing Manager</div>
                  <div>Successfully conducted AdWord, email, social media, seasonal promotion marketing campaigns, which led to increase in the number of customers and sale. Also directed the operation of graphic designers to create various marketing contents and over 40,000 stock images of products.</div>
                </Col> 
              </Row>
              <Row className="section-row">
                <Col xs={12}>
                  <div className="text-lg" style={highlightColor}><strong>Freelance</strong></div>                  
                  <div className="text-md">February 2012 - Present</div>
                </Col>                
                <Col xs={12}>
                  <div className="text-md" style={highlightColor}>Photographer & Retoucher</div>
                  <div>Supported fashion accessories importing/wholesale distributors to set up in-house photo studio and produced stock images for their e-commerce site and marketing contents. Also educated in-house graphic designers to corresponding tasks as well.</div>
                </Col> 
              </Row>
              <Row className="section-row">
                <Col xs={12}>
                  <div className="text-lg" style={highlightColor}><strong>EC Soft</strong></div>                  
                  <div className="text-md">June 2008 - March 2009</div>
                </Col>
                <Col xs={12}>
                  <div className="text-md" style={highlightColor}>Web Designer</div>
                  <div>Created and customized web design templates and contents. The team successfully launched 3~4 websites per month(informative website for academies, e-commerce). Provided animation shockwave files for main content to attract the visitors, which was trends at the time.</div>
                </Col> 
              </Row>
            </Grid>
            <div>
              <div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>  
    )
  }
}

export default About
