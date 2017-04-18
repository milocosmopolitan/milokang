import React from 'react';
import { connect } from 'react-redux';
import * as Component from 'APP/app/components';
import { Content, Parallax, Distortion } from '../../components';

class Home extends React.Component {
  render(){
    const { posts } = this.props;
    // console.log('HOME PROPS', this.props);
    return(
      <Parallax.Container>
        <Parallax.Nav />
        <Content.Container dimensionStyle={'cube'}>
          {
            posts.length && posts.map((post,index)=>{              
              return (
                <Content.Detail key={index}                   
                  title={post.title} 
                  subheading={post.subtitle} 
                  description={post.description}                  
                  content={post.content}
                  component={Component[post.content] && post.type === 'component' ? props => React.createElement(Component[post.content], props) : null }
                  links={post.links}
                  technology={post.technology}
                  colors={post.colors} />
              );
            })
          }
        </Content.Container>
        <Parallax.Background>
        {
          posts.length ? posts.map((post,index)=>{
            return (
              <Parallax.Section key={index}>
                <Distortion.Container>
                  {
                    post.media.length && post.media.map((media, index)=>(
                      <Distortion.Content layer={media} key={index} />
                    ))
                  }
                </Distortion.Container>
              </Parallax.Section>  
            );
          }) :  null
        }
        </Parallax.Background>
      </Parallax.Container>
    )
  }
}

const mapState = ({ posts }) => ({ posts });

export default connect(mapState)(Home);