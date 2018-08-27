import React from 'react'
import CollectionCard from './CollectionCard'
import HomeTitle from './HomeTitle'
import {
  Row,
  Col
} from 'reactstrap'

export default class HomePage extends React.Component {
  render() {
    let collections = [
      {
        name: 'Collection 1',
        desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tincidunt ante, et faucibus nisi rutrum eget. Vestibulum bibendum justo mi, vel aliquet orci rhoncus vitae.'
      },
      {
        name: 'Collection 2',
        desc: 'Donec et luctus augue. Suspendisse ut felis in tortor iaculis sodales id in elit. Aliquam lorem urna, elementum eget justo sit amet, placerat semper nunc. Integer eget tortor consectetur, vulputate turpis consequat, convallis felis.'
      },
      {
        name: 'Collection 3',
        desc: 'Phasellus suscipit egestas eleifend. Mauris venenatis, augue id volutpat porta, odio ante finibus diam, non vestibulum mauris mauris condimentum felis.'
      }
    ]

    return (
      <div className="home-page align-self-center">
        <Row>
          <Col md="12">
            <HomeTitle />
          </Col>
        </Row>
        <Row className="subheading">
          <Col md="12">
            <h2>Featured Collections:</h2>
          </Col>
        </Row>
        <Row>
          {collections.map(item => (
            <Col key={item.name} md="4"><CollectionCard name={item.name} desc={item.desc} /></Col>
          ))}
        </Row>
      </div>
    )
  }
}