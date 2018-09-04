import React from 'react'
import HomeTitle from './HomeTitle'
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button
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
  render() {
    return (
      <div className="home-page align-self-center">
        <Row>
          <Col md="12">
            <HomeTitle description="Funded by the Leona M. and Harry B. Helmsley Charitable Trust, HANDEL-P aims to improve understanding of early events and processes in human pancreatic development through an interactive image atlas. By examining the islet structure and gene expression in pancreata from donors spanning the neonatal and juvenile stages of life, we hope to gain insight into coinciding processes of &beta; cell-directed autoimmunity in type 1 diabetes." />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-stretch" key="team" md="4" sm="12">
            <Card className='home-card'>
              <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faUsers} size="3x" /></CardTitle>
              <CardSubtitle className='home-card-title'>TEAM</CardSubtitle>
              <CardBody>
                Researchers at the University of Florida and Vanderbilt University, in collaboration with organizations around the country.
              </CardBody>
            </Card>
          </Col>
          <Col className="d-flex align-items-stretch" key="approach" md="4" sm="12">
            <Card className='home-card'>
              <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faVials} size="3x" /></CardTitle>
              <CardSubtitle className='home-card-title'>APPROACH</CardSubtitle>
              <CardBody>
                Perform immunohistochemical analysis of donor pancreata to obtain cross-sectional data of islet cell composition, mass, proliferation, innervation, and function
              </CardBody>
            </Card>
          </Col>
          <Col className="d-flex align-items-stretch" key="mission" md="4" sm="12">
            <Card className='home-card'>
              <CardTitle className='home-card-icon'><FontAwesomeIcon icon={faFlask} size="3x" /></CardTitle>
              <CardSubtitle className='home-card-title'>MISSION</CardSubtitle>
              <CardBody>
                Enhance our knowledge of juvenile pancreatic development in an effort to understand the onset and progression of type 1 diabetes
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" sm="12">
            <Link to="/dataset/261/"><Button size="lg" className="explore-button" color="success">Explore Our Collections</Button></Link>
          </Col>
        </Row>
      </div>
    )
  }
}