import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'
import Logo from '../assets/pancreatlas/logos/handel-p-black-full.png'

export default class HomeTitle extends React.Component {
  render() {
    return (
      <div className="home-title">
        <Row className="pancreatlas-row">
          <Col md="12">
            <img className="img-fluid home-logo" src={Logo} alt="Logo" />
          </Col>
        </Row>
        <Row className="pancreatlas-row">
          <Col md="12">
            <p className='home-description'>Funded by The Leona M. and Harry B. Helmsley Charitable Trust, <strong>HANDEL-P aims to improve understanding of early events and processes in human pancreatic development through an interactive image atlas.</strong> By examining the islet structure and gene expression in pancreata from donors spanning the neonatal and juvenile stages of life, we hope to gain insight into type 1 diabetes.</p>
          </Col>
        </Row>
      </div>
    )
  }
}

HomeTitle.defaultProps ={
  logo: "http://www.placehold.it/600x200",
  description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tincidunt ante, et faucibus nisi rutrum eget. Vestibulum bibendum justo mi, vel aliquet orci rhoncus vitae. Donec et luctus augue. Suspendisse ut felis in tortor iaculis sodales id in elit. Aliquam lorem urna, elementum eget justo sit amet, placerat semper nunc. Integer eget tortor consectetur, vulputate turpis consequat, convallis felis. Phasellus suscipit egestas eleifend. Mauris venenatis, augue id volutpat porta, odio ante finibus diam, non vestibulum mauris mauris condimentum felis. Nam convallis mi sit amet rutrum cursus. Proin justo tellus, consequat ac viverra ut, fringilla at tortor. Nam ut metus arcu.'
}