import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
  constructor (props) {
    super(props)

    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <footer className='footer'>
        {/* Lower area */}

          <Container fluid>
            <Container>
              <Row className='v-padded'>
                <Col md='6'>
                  <p>Dummy text here</p>
                </Col>

                <Col md='6'>
                  <p>More dummy text here</p>
                  <span className='float-right scroll-button'><FontAwesomeIcon icon='hand-pointer' size='2x' id='x' onClick={this.scrollToTop} /></span>
                </Col>

              </Row>
            </Container>
          </Container>

      </footer>
    )
  }
}
