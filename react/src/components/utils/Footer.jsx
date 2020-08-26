import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                <p>&copy; 2020 - Copyright Notice<br/>
                  <a href="https://github.com/Powers-Brissova-Research-Group/FFIND/">Developed with FFIND</a>
                </p>
              </Col>

              <Col md='6'>
                <span className='float-right scroll-button'><FontAwesomeIcon icon='hand-pointer' size='2x' id='x' onClick={this.scrollToTop} /></span>
                <p>Dummy text here</p>
              </Col>

            </Row>
          </Container>
        </Container>

      </footer>
    )
  }
}
