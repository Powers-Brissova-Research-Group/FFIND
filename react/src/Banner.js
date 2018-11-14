import React from 'react';
import {
  Container,
  Button,
  Row,
  Col
} from 'reactstrap';

import {
  Link
} from 'react-router-dom'

import HomeModal from './HomeModal'

import Particles from 'react-particles-js';

import bannerImg from './assets/banner-bg3-fade.png';

import illustration from './assets/pancreas-islet-cells.png'

export default class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (
      <div>
        <div className='overlay'>
          <Particles
            params={{
              particles: {
                number: {
                  value: 50,
                  density: {
                    enable: true,
                    value_area: 1600
                  }
                },
                color: {
                  value: '#ffffff'
                },
                shape: {
                  type: 'circle',
                  stroke: {
                    width: 0,
                    color: '#000000'
                  },
                  polygon: {
                    nb_sides: 5
                  },
                  image: {
                    src: 'img/github.svg',
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 10,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 1,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: '#ffffff',
                  opacity: 0.4,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: 'top-right',
                  random: false,
                  straight: false,
                  out_mode: 'out',
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: 'window',
                events: {
                  onhover: {
                    enable: true,
                    mode: 'bubble'
                  },
                  onclick: {
                    enable: false,
                    mode: 'push'
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1
                    }
                  },
                  bubble: {
                    distance: 400,
                    size: 12,
                    duration: 2,
                    opacity: 0.7,
                    speed: 3
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4
                  },
                  push: {
                    particles_nb: 4
                  },
                  remove: {
                    particles_nb: 2
                  }
                }
              },
              retina_detect: true
            }} style={{
              display: 'block',
              position: 'relative',
              zIndex: -1,
              width: '100%',
              height: '100%',
              background: `url(${bannerImg}) no-repeat center center fixed`,
              backgroundSize: 'cover'
            }}
            height={600}
          />
        </div>

        <Container className='banner-container'>
          <Row className='banner-row'>
            <Col md="6" className='align-self-center'>
              <h1 className='banner-header'>We study the human pancreas and islet during the first decade of life.</h1>
            </Col>
            <Col md="1"></Col>
            <Col md="5" className='align-self-center'>
              <Row className="mt-3">
                  <div>
                    <h3 className="banner-subheader">Our goal is to assemble a world-class resource for collecting and sharing data from human pancreas samples. </h3>
                    <img src={illustration}/>
                    </div>
              </Row>

              {/*<Row className="mt-3"><Button size="lg" color="info" className='banner-button' onClick={this.toggle}>Markers of beta cell-directed autoimmunity appear in some individuals in the first 2-3 years of life</Button></Row>
              <Row className="mt-3"><Link to='/handelp/collaborators'><Button size="lg" color="info" className='banner-button'>The number of beta cells and islets in the human pancreas is determined in the first decade of life</Button></Link></Row>*/}
            </Col>
          </Row>
          <HomeModal isOpen={this.state.modalOpen} toggle={this.toggle} />
        </Container>
      </div>
    );
  }
}