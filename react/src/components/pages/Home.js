import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { 
  Banner,
  DatasetList,
  Feature,
  SponsorLogo 
} from '../utils'

import Helmsley from '../../assets/helmsley.jpg'
import HIRN from '../../assets/hirn.jpg'
import IIAM from '../../assets/IIAM.png'
import IIDP from '../../assets/IIDP.png'
import NDRI from '../../assets/NDRI.jpg'
import VUMC from '../../assets/VUMC.png'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.aboutRef = React.createRef()

    this.scrollToAbout = this.scrollToAbout.bind(this)
  }

  scrollToAbout () {
    // console.log(this.myRef)
    window.scrollTo(0, this.aboutRef.current.offsetTop)
  }

  componentDidMount () {
    console.log(this.myRef)
  }

  render () {
    return (
      <div className='home'>
        <Banner scrollDown={this.scrollToAbout} />
        <div className='dataset-list' ref={this.aboutRef}>
          <Container className='mt-4'>
            <h1 className='my-4 py-4'><strong>Image Collections</strong></h1>
            <DatasetList />
          </Container>
        </div>
        <Container fluid className='shaded'>
          <Container>
            <Row className='mb-4'>
              <div className='head-description v-padded'>
                <Row>
                  <Col md='12'>
                    <h2 className='section-heading'>Our Approach</h2>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <h5 className='section-desc'>Through detailed analysis of donor tissue, we hope to better understand events that trigger type 1 and type 2 diabetes. This website&mdash;an “atlas” of our findings&mdash;is designed to engage scientists worldwide and accelerate the discoveries in diabetes research.</h5>
                  </Col>
                </Row>
              </div>
              <Row className='mb-4'>
                <Col md='4'>
                  <Feature icon='users' heading='Team Science' description='Research groups at Vanderbilt University, the University of Florida, and Stanford University are leading synergistic, collaborative research efforts' />
                </Col>
                <Col md='4'>
                  <Feature icon='vial' heading='Systematic Methodology' description='We rely on high-resolution analysis of donor pancreatic tissues by immunohistochemistry, genomic approaches, and other functional techniques' />
                </Col>
                <Col md='4'>
                  <Feature icon='flask' heading='Fueling Discovery' description='Our goal is to fully describe pancreatic composition and architecture, informing the development of therapeutic interventions for disease' />
                </Col>
              </Row>
            </Row>
          </Container>
        </Container>
        <Container fluid>
          <div className='support v-padded'>
            <Row className='center-row my-4'>
              <Col sm='12'>
                <img style={{ height: '8rem' }} className='img-fluid' src={Helmsley} alt='Helmsley Trust' />
              </Col>
            </Row>
            <Row className='center-row'>
              <Col sm='12'>
                <h4>This project is generously supported by <a href='https://helmsleytrust.org'>The Leona M. and Harry B. Helmsley Charitable Trust</a>.</h4>
              </Col>
            </Row>
            <Row className='center-row my-4 pt-4'>
              <Col sm='12'>
                <h4>We also thank the following:</h4>
              </Col>
            </Row>
            <Row className='justify-content-around align-items-center my-4 pb-4'>
              <Col lg={2} md={4} sm={6} className='d-flex justify-content-center'>
                <SponsorLogo location='https://www.iiam.org/' name='IIAM' imgSrc={IIAM} size='small' />
              </Col>
              <Col lg={2} md={4} sm={6} className='d-flex justify-content-center'>
                <SponsorLogo location='https://ndriresource.org/' name='NDRI' imgSrc={NDRI} size='small' />
              </Col>
              <Col lg={2} md={4} sm={6} className='d-flex justify-content-center'>
                <SponsorLogo location='https://iidp.coh.org/' name='IIDP' imgSrc={IIDP} size='small' />
              </Col>
              <Col lg={2} md={4} sm={6} className='d-flex justify-content-center'>
                <SponsorLogo location='https://hirnetwork.org/' name='HIRN' imgSrc={HIRN} size='small' />
              </Col>
              <Col lg={2} md={4} sm={6} className='d-flex justify-content-center'>
                <SponsorLogo location='https://vumc.org' name='VUMC' imgSrc={VUMC} size='small' />
              </Col>
            </Row>
            <Row className='center-row my-4'>
              <Col sm='12'>
                <h4><em>We are extremely grateful to organ donors and their families.</em></h4>
              </Col>
            </Row>
          </div>
        </Container>

        {/* <Container>
          <Row className='mb-4'>
            <div className='head-description v-padded' ref={this.aboutRef}>
              <Row>
                <Col md='12'>
                  <h2 className='section-heading'>Our Approach</h2>
                </Col>
              </Row>
              <Row>
                <Col md='12'>
                  <h5 className='section-desc'>Our investigators are studying dynamic changes in the human pancreas and islets from birth to adulthood, in health and disease. Through detailed analysis of donor tissue, we hope to better understand events that trigger type 1 and type 2 diabetes. This website&mdash;an “atlas” of our findings&mdash;is designed to engage scientists worldwide and accelerate the discoveries in diabetes research.</h5>
                </Col>
              </Row>
            </div>
            <Row className='mb-4'>
              <Col md='4'>
                <Feature icon='users' heading='Team Science' description='Led by research groups at Vanderbilt University, the University of Florida, and Stanford University, in collaboration with organizations and scientists around the country' />
              </Col>
              <Col md='4'>
                <Feature icon='vial' heading='Systematic Methodology' description='High-resolution analysis of donor pancreatic tissues by immunohistochemistry, genomic approaches, and other functional techniques' />
              </Col>
              <Col md='4'>
                <Feature icon='flask' heading='Fueling Discovery' description='Enhancing our knowledge of pancreatic architecture and physiology, in an effort to understand the onset and progression of diabetes' />
              </Col>
            </Row>
          </Row>
        </Container>
        <Container fluid className='shaded'>
          <Container>
            <Row className='v-padded mb-4'>
              <Col md='6'>
                <h3>Creating new</h3>
                <h1>Connections</h1>
                <p>By building an interactive platform that blends data from varied imaging modalities, we hope to share knowledge, technologies, and developments that help us better understand the intricacies of the human pancreas and islets.</p>
                <p>Our goal is to reach those with novel ideas and approaches, engaging a diverse group of scientists to accelerate advances in diabetes research.</p>
                <a className='btn btn-dark' href='/collaborators'>Learn about our collaborators and their work</a>
              </Col>
              <Col md='6'>
                <img src={MapPicture} alt='Collaborators map' className='img-fluid' />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid>
          <div className='support v-padded'>
            <Row className='center-row'>
              <Col sm='12'>
                <h2>This project is generously supported by:</h2>
              </Col>
            </Row>
            <Row className='center-row my-4'>
              <Col sm='12'>
                <SponsorLogo location='https://helmsleytrust.org/' name='The Leona M. and Harry B. Helmsley Charitable Trust' imgSrc={Helmsley} size='large' />
              </Col>
            </Row>
            <Row className='center-row my-4'>
              <Col sm='12'>
                <h5>We also thank the following:</h5>
              </Col>
            </Row>
            <Row className='justify-content-around my-4'>
              <Col sm='2'>
                <SponsorLogo location='https://www.iiam.org/' name='IIAM' imgSrc={IIAM} size='small' />
              </Col>
              <Col sm='2'>
                <SponsorLogo location='https://ndriresource.org/' name='NDRI' imgSrc={NDRI} size='small' />
              </Col>
              <Col sm='2'>
                <SponsorLogo location='https://iidp.coh.org/' name='IIDP' imgSrc={IIDP} size='small' />
              </Col>
              <Col sm='2'>
                <SponsorLogo location='https://hirnetwork.org/' name='HIRN' imgSrc={HIRN} size='small' />
              </Col>
              <Col sm='2'>
                <SponsorLogo location='https://vumc.org' name='VUMC' imgSrc={VUMC} size='small' />
              </Col>
            </Row>
            <Row className='center-row my-4'>
              <Col sm='12'>
                <h5><i>We are extremely grateful to organ donors and their families.</i></h5>
              </Col>
            </Row>
          </div>
        </Container> */}
      </div>
    )
  }
}
