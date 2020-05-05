import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Particles from 'react-particles-js'

import bannerImg from './assets/banner-bg3-fade.png'
import illustrationAlt from './assets/pancreas-islet-cells.png'
import illustration from './assets/pancreas-islet-cells.webp'

export default class Banner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render () {
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
            height={'calc(100vh - 70px)'}
          />
        </div>
        <Container className='banner-container'>
          <Row style={{ height: '33%' }} />
          <Row style={{ height: '33%' }}>
            <Col md='7'>
              <h1 className='banner-header'>We study dynamic changes of the human pancreas from birth to adulthood, in health and disease.</h1>
              <h4 className='banner-subheader-left'>This platform is a practical resource to share data from human pancreas samples.</h4>
              {/* <Link to='/datasets'><Button className='banner-btn'color='info'size='lg' block>View our Collections</Button></Link> */}
            </Col>

            <Col md='5' className='d-none d-md-block'>
              <Row className='mt-3'>
                <div>
                  <Link to={'/datasets'} >
                    <picture>
                      <source srcset={illustration} type="image/webp" alt='View our datasets' />
                      <img src={illustrationAlt} responsive={'true'} alt='View our datasets' />
                    </picture>
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className='align-items-end' style={{ height: '33%' }}>
            <Col md='12' className='text-center'>
              <FontAwesomeIcon className='scroll-down-arrow' onClick={this.props.scrollDown} icon='angle-down' size='6x' color='white' />
            </Col>
          </Row>
          {/* <Row className='mt-4 justify-content-center' style={{ height: '15%' }}>
            <Col md='6'>
              <Link to={'/datasets'}><Button className='banner-btn' color='info' size='lg' block>View Our Collections</Button></Link>
            </Col>
          </Row> */}
          {/* <Row className='h-50 align-items-end'>
            <Col md='12' className='text-center'>
              <FontAwesomeIcon className='scroll-down-arrow' onClick={this.props.scrollDown} icon='angle-down' size='6x' color='white' />
            </Col>
          </Row> */}
        </Container>
      </div>
    )
  }
}
