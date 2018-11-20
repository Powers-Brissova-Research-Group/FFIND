import React from 'react'
import HomeTitle from './HomeTitle'
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button,
  Container
} from 'reactstrap'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  faFlask,
  faVials,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

import {
  Link
} from 'react-router-dom'

export default class HomePage extends React.Component {
  constructor (props) {
    super(props)
    console.log(process.env.REACT_APP_API_URL)
  }

  render () {
    let defs = require('../assets/pancreatlas/definitions.json')
    console.log(defs)
    let params = new URLSearchParams(window.location.search)
    this.favs = (params.has('iids') ? params.get('iids') : window.btoa(JSON.stringify([])))
    return (
      <Container>
        <div className='home-page align-self-center'>
          <Row className='pancreatlas-row'>
            <Col md='12'>
              <HomeTitle />
            </Col>
          </Row>
          <Row className='pancreatlas-row'>
            <Col md='12' sm='12'>
              <Link to={`pancreatlas/dataset?iids=${this.favs}`}><Button size='lg' className='explore-button' color='success'>Explore Our Atlas</Button></Link>
            </Col>
          </Row>
          <Row className='pancreatlas-row'>
            <Col className='d-flex align-items-stretch' key='team' md='4' sm='12'>
              <Card className='home-card'>
                <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faUsers} size='3x' /></CardTitle>
                <CardSubtitle className='home-card-title'>TEAM</CardSubtitle>
                <CardBody>
                  Researchers at the University of Florida and Vanderbilt University, in collaboration with organizations around the country
                </CardBody>
              </Card>
            </Col>
            <Col className='d-flex align-items-stretch' key='approach' md='4' sm='12'>
              <Card className='home-card'>
                <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faVials} size='3x' /></CardTitle>
                <CardSubtitle className='home-card-title'>APPROACH</CardSubtitle>
                <CardBody>
                  Cross-sectional immunohistochemical analysis of islet cell composition, mass, proliferation, innervation, and function
                </CardBody>
              </Card>
            </Col>
            <Col className='d-flex align-items-stretch' key='mission' md='4' sm='12'>
              <Card className='home-card'>
                <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faFlask} size='3x' /></CardTitle>
                <CardSubtitle className='home-card-title'>MISSION</CardSubtitle>
                <CardBody>
                  Enhance our knowledge of juvenile pancreatic development in an effort to understand the onset and progression of type 1 diabetes
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}
