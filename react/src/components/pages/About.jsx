import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import { Link } from 'react-router-dom'

import { PageBanner } from '../utils'

export default class About extends React.Component {
  render() {
    return (
      <div className='about'>
        <MetaTags>
          <title>About FFIND</title>
          <meta name='description' content='What is the FFIND project?' />
        </MetaTags>
        {/* <Header heading="About" /> */}
        <PageBanner>
          <h1>About FFIND</h1>
          <p className='text-larger'>Curabitur facilisis elementum mollis. Etiam tempus, tortor in efficitur feugiat, ex nibh fermentum leo, sed luctus lacus metus vitae enim. Nunc in magna ac orci sagittis consequat. Proin rutrum nisi.</p>
        </PageBanner>
        <Container className='v-padded'>
          <Row className='mb-4'>
            <Col md='12'>
              <div>
                <p>Nullam dignissim eleifend molestie. Nam sed luctus est. Aenean ex diam, cursus vel eros eget, scelerisque vehicula neque. Nullam imperdiet vestibulum libero quis molestie. Praesent in sapien accumsan, consectetur sem nec, pellentesque dolor. Curabitur dignissim, justo eu tincidunt accumsan, justo leo pharetra arcu, a dignissim risus ligula a ipsum. Donec id efficitur dui, ac auctor arcu. Suspendisse potenti. Integer efficitur dui in augue tincidunt laoreet. Nullam iaculis vitae sem at congue. Phasellus eu nibh nisl.</p>
                <p>Vivamus molestie turpis pharetra velit euismod commodo. Etiam sit amet risus vitae ante mattis rhoncus non ac augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris hendrerit semper sem, mattis cursus arcu euismod ac. Vestibulum consequat dui lacus, id posuere arcu molestie eu. Suspendisse congue vitae odio quis aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur gravida elit eget molestie dignissim. Mauris justo ipsum, fermentum a tempor eu, molestie id lacus. Cras pulvinar cursus elit, a viverra mauris mollis sed. Nullam luctus efficitur odio non molestie. Praesent laoreet, diam non mollis molestie, massa purus iaculis lacus, sit amet viverra massa mi eu nisl.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
