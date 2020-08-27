import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)

    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <footer className='footer'>
        {/* Lower area */}

        <Container fluid>
          <Container>
            <Row className='v-padded'>
              <Col md='4'>
                <p>&copy; 2020 - Copyright Notice<br/>
                  <a href="https://github.com/Powers-Brissova-Research-Group/FFIND/">Developed with FFIND</a>
                </p>
                <p>
                  <a href='https://github.com/Powers-Brissova-Research-Group/FFIND' rel='noreferrer nofollow' target='_blank'><span className='scroll-button'><FontAwesomeIcon icon={['fab', 'github']} size='2x' /></span></a>
                </p>
              </Col>

              <Col md='4'>
                <p>Dummy text here</p>
                <ul>
                  <li>List item 1</li>
                  <li>List item 2</li>
                  <li>List item 3</li>
                </ul>
              </Col>

              <Col md='4'>
                <span className='float-right scroll-button'><FontAwesomeIcon icon='hand-pointer' size='2x' id='x' onClick={this.scrollToTop} /></span>
                <p>Dummy text here</p>
                <ul>
                  <li>List item 1</li>
                  <li>List item 2</li>
                  <li>List item 3</li>
                </ul>
              </Col>

            </Row>
          </Container>
        </Container>

      </footer>
    )
  }
}