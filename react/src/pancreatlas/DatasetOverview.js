import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from 'reactstrap'

import { Parallax } from 'react-parallax'

export default class DatasetOverview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Default Title',
      desc: 'Default desc'
    }
    let re = /(\/\w+\/?)+([0-9]+)(\/\w+\/?)+/
    let dsid = re.exec(window.location.pathname)[2]
    console.log(dsid)
    window.fetch(`${process.env.REACT_APP_API_URL}/datasets/${dsid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        this.setState({
          title: result.dsname,
          desc: result.kvals.description_long,
          funders: result.kvals.funding.split(',')
        })
      })
  }
  render () {
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
          <Row style={{ height: '50vh' }}>
            <Col md='12'>
              <Row>
                <Col md='12'>
                  <h1>Explore the Data</h1>
                  <h3>Here are some suggested projections of the data within this set</h3>
                </Col>
              </Row>
              <Row>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>Browse by Age</h3>
                      <p>Choose a specific age range of donors within which to view samples</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>Browse by Matrix</h3>
                      <p>Create a two-dimensional matrix comparing specified attribute sets to find data matching specific criteria</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>View All Images</h3>
                      <p>Don't restrict the data by any filters and view the entire collection</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ height: '50vh' }}>
            <Col md='12'>
              <h1>We thank the following sponsors who made gathering these data possible:</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
