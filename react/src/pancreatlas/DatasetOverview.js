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

export default class DatasetOverview extends React.Component {
  constructor(props) {
    super(props)
    let re = /(\/\w+\/?)+([0-9]+)(\/\w+\/?)+/

    this.state = {
      title: 'Default Title',
      desc: 'Default desc',
      did: (re.exec(window.location.pathname) !== null) ? re.exec(window.location.pathname)[2] : 0,
      funders: []
    }
    let dsid = (re.exec(window.location.pathname) !== null) ? re.exec(window.location.pathname)[2] : 0
    console.log(dsid)
    window.fetch(`${process.env.REACT_APP_API_URL}/datasets/${dsid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then((result) => {
        const images = require.context('../assets/', true)
        // this.props.funding !== undefined ? this.props.funding.split(',').map(source => images(`./${source}.jpg`)) : []
        let sponsors = result.kvals.funding !== undefined ? result.kvals.funding.split(',').map(source => images(`./${source}.jpg`)) : []
        console.log(sponsors)
        this.setState({
          title: result.dsname,
          desc: result.kvals.description_long,
          funders: sponsors
        })
      })
  }
  render() {
    /*
                                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=false' }}>
                                      <Button className='ds-list-left-button' >Browse All Images</Button>
                                    </Link>
                                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=true' }}>
                                      <Button color='primary'>Browse by Age</Button>
                                    </Link>
                                    <Link to={'/pancreatlas/matrixview/' + item.did}>
                                      <Button className='ds-list-right-button' outline color='success'>Compare Attributes</Button>
                  import {
  Link
} from 'react-router-dom'
                  </Link>

    */
    return (
      <div className='datasetOverviewWrapper'>
        <Parallax
          blur={0}
          bgImage={require('../assets/parallax-bg.jpg')}
          bgImageAlt='Sample Image'
          strength={800}
          style={{ marginTop: '-1.5rem' }}
        >
          <div className='parallax-filler' style={{ height: '90vh' }}>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col md='6' className='d-flex align-items-center'>
                  <span className='dataset-title'><h1>About {this.state.title}</h1></span>
                </Col>
                <Col md='6' className='d-flex align-items-center'>
                  <span className='dataset-title'>
                    <h3>
                      {this.state.desc}
                    </h3>
                  </span>
                </Col>
              </Row>
            </Container>
          </div>
        </Parallax>
        <Container>
          <Row>
            <Col md='12'>
              <Row>
                <Col md='12'>
                  <h1><strong>Explore the Data</strong></h1>
                  <h3>Here are some suggested projections of the data within this set</h3>
                </Col>
              </Row>
              <Row>
                <Col md='4'>
                  <Card>
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
                  <Card>
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
                  <Card>
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
          <Row>
            <Col md='12'>
              <h1>We thank the following sponsors who made gathering these data possible:</h1>
            </Col>
          </Row>
          <Row>
            {this.state.funders.map(funder => (
              <Col md='4'>
                <img src={funder} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}
