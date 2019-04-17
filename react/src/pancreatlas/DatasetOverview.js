import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import { Parallax } from 'react-parallax'

import SponsorLogo from '../SponsorLogo'

import axios from 'axios'

export default class DatasetOverview extends React.Component {
  constructor (props) {
    super(props)
    let re = /(\/\w+\/?)+([0-9]+)(\/\w+\/?)+/

    this.state = {
      title: 'Default Title',
      desc: 'Default desc',
      did: (re.exec(window.location.pathname) !== null) ? re.exec(window.location.pathname)[2] : 0,
      funders: []
    }
  }

  componentDidMount () {
    axios.create({
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Authorization': process.env.REACT_APP_API_AUTH
      }

    })
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.state.did}`).then(result => {
      let sponsors = result.data.kvals.funding !== undefined ? result.data.kvals.funding.split(',').map(source => require(`../assets/${source}.jpg`)) : []
      this.setState({
        title: result.data.dsname,
        short_desc: result.data.kvals.description_short,
        long_desc: result.data.kvals.description_long,
        funders: sponsors

      })
    })
  }
  render () {
    return (
      <div className='datasetOverviewWrapper'>
        <Parallax
          blur={0}
          bgImage={require('../assets/header1.jpg')}
          bgImageAlt='Sample Image'
          strength={500}
          style={{ marginTop: '-1.5rem' }}
        >
          <div className='parallax-filler' style={{ height: '50vh' }}>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col md='12' className='d-flex align-items-center'>
                  <span className='dataset-title'><h1><strong>About {this.state.title}</strong></h1>
                    <h3>
                      {this.state.short_desc}
                    </h3>
                  </span>
                </Col>
              </Row>
            </Container>
          </div>
        </Parallax>
        <Container>
          <Row className='mb-4'>
            <Col md='12'>
              <Row className='my-4'>
                <Col md='12'>
                  <h3>About this Collection</h3>
                  <p>{this.state.long_desc}</p>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col md='12'>
                  <h3>Here are some suggested projections of the data within this set</h3>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>Browse by Age</h3>
                      <p>Choose a specific age range of donors within which to view samples</p>
                      <Link to={{ pathname: `/pancreatlas/dataset/${this.state.did}`, search: '?browse=true' }}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>Browse by Matrix</h3>
                      <p>Create a two-dimensional matrix comparing specified attribute sets to find data matching specific criteria</p>
                      <Link to={`/pancreatlas/matrixview/${this.state.did}`}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>View All Images</h3>
                      <p>Don't restrict the data by any filters and view the entire collection</p>
                      <Link to={{ pathname: `/pancreatlas/dataset/${this.state.did}`, search: '?browse=false' }}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Col md='12'>
              <h3>We thank the following sponsors who made gathering these data possible:</h3>
            </Col>
          </Row>
          <Row className='mb-4'>
            <div className='overview-sponsors'>
              {this.state.funders.map(funder => (
                <SponsorLogo imgSrc={funder} name='Sponsor Logo' location='http://example.com' size='large' />
              // <Col md='4'>
              //   <img src={funder} alt='Sponsor Logo' />
              // </Col>
              ))}
            </div>

          </Row>
        </Container>
      </div>
    )
  }
}
