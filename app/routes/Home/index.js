import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { 
  Content, Main, Beer, About, 
  ParallaxContainer, ParallaxSection, ParallaxNav, ParallaxImage, ParallaxContent,
  DistortionContainer } from '../../components';
let about = () => (<About />);
let dummyData = [
  {
    id: 'about',    
    colorScheme: {
      background: {r:18, g:26, b:24, a:1},
      font: '#EEEEEE',
      highlight: '#00ffae',
    },
    title: 'Hi there..',
    subheading: "My name is Milo & I'm a web developer with designer's state of mind.",
    description: "I'm focused on creating simple, beautiful and easy to use digital solutions for all types of businesses with a passion for the web, and mobile development. When I’m not making websites, I tend to be working out, brew coffee , learning a new programming language.",    
    images: [
      "./images/projects/landing_01.png", "./images/projects/landing_02.png", "./images/projects/landing_03.png"
    ],
    content: about,
    links: [
      {
        title: "LinkedIn", 
        url: "https://www.linkedin.com/in/milokang"
      },
      {
        title: "Github", 
        url: "https://github.com/milocosmopolitan/"
      }
    ],
  },{
    id: 'hopfinder',    
    colorScheme: {
      background: {r:18, g:26, b:24, a:0.8},
      font: '#EEEEEE',
      highlight: "#ffc000",
    },
    title: 'Hopfinder',
    subheading: "Craft brewery locator",
    description: "App to help craft beer enthusiasts find breweries in their neighborhoods or when they travel. In addition, users can favorite breweries and keep up to date on events such as can/bottle releases.",    
    images: [
      "./images/projects/hopfinder_01.png", "./images/projects/hopfinder_02.png", "./images/projects/hopfinder_03.png"
    ],
    content: () => (null),
    links: [
      {
        title: "live demo", 
        url: "https://quiet-peak-58519.herokuapp.com/"
      },
      {
        title: "github", 
        url: "https://github.com/hopfinder/hopfinder"
      }
    ],
    technology: ['react.js', 'redux', 'node.js', 'express.js', 'sequelize', 'postgres', 'google api', 'passport.js', 'jwt', 'sass', 'webpack']
  },{
    id: 'bisque',    
    colorScheme: {
      background: {r:18, g:26, b:24, a:0.8},
      font: '#EEEEEE',
      highlight: '#00ffd8',
    },
    title: 'Bisque',
    subheading: "Pomodoro timer for your chrome",
    description: "Inspired by the Pomodoro Technique, this extension for chrome broweser, let's user divide their work hours with small breaks as well as which tracks user's browsing behavior and distraction level.",    
    images: [
      "./images/projects/bisque_01.png", "./images/projects/bisque_02.png", "./images/projects/bisque_03.png"
    ],
    content: () => (null),
    links: [
      {
        title: "live demo", 
        url: "https://chrome.google.com/webstore/detail/bisque/fchdhonfcjnaaifldgcmdjipllmgmdhm"
      },
      {
        title: "github", 
        url: "https://github.com/team-bisque/bisque"
      }
    ],
    technology: ['react.js', 'redux', 'firebase', 'chrome extension', 'google api', 'd3', 'sass']
  }
];

export default class Home extends React.Component {
  render(){
    let data = dummyData;
    return(
      <ParallaxContainer>
        <ParallaxNav />
        <Content.Container dimensionStyle={'cube'}>
          {
            dummyData.map((data,index)=>{
              return (
                <Content.Detail key={index} 
                  bound={data.id}
                  title={data.title} 
                  subheading={data.subheading} 
                  description={data.description}
                  backgroundColor={data.colorScheme.background}
                  content={data.content}
                  links={data.links}
                  technology={data.technology}
                  fontColor="#000000" 
                  highlightColor={data.colorScheme.highlight}>

                </Content.Detail>
              )
            })
          }
        </Content.Container>
        <ParallaxSection id="about">
          <DistortionContainer>
            <img alt="background" src="./images/projects/landing_01.png" />
            <img alt="milo" src="./images/projects/landing_02.png" />
            <img alt="name" src="./images/projects/landing_03.png" />
          </DistortionContainer>
        </ParallaxSection>        
        <ParallaxSection id="hopfinder">
          <DistortionContainer>
            <img alt="background" src="./images/projects/hopfinder_01.png" />
            <img alt="hopfinder" src="./images/projects/hopfinder_02.png" />
            <img alt="hopfinder" src="./images/projects/hopfinder_03.png" />
            <Beer />
          </DistortionContainer>      
        </ParallaxSection>
        <ParallaxSection id="bisque">
          <DistortionContainer>
            <img alt="background" src="./images/projects/bisque_01.png" />
            <img alt="bisque" src="./images/projects/bisque_02.png" />
            <img alt="bisque" src="./images/projects/bisque_03.png" />
            <img alt="bisque" src="./images/projects/bisque_04.png" />
          </DistortionContainer>      
        </ParallaxSection>
      </ParallaxContainer>
    )
  }
}