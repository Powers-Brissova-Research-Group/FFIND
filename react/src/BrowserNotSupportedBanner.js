import React from 'react'

import {
  Container
} from 'reactstrap'

export default class BrowserNotSupportedBanner extends React.Component {
  render() {
    return (
      <Container fluid className='browser-not-supported-banner'>
        <h5>{this.props.browser.charAt(0).toUpperCase() + this.props.browser.slice(1)} is not supported. Please consider using the most recent versions of <a href='https://www.mozilla.org/en-US/firefox/new/'>Mozilla Firefox</a> or <a href="https://www.google.com/chrome/">Google Chrome</a>.</h5>
      </Container>
    )
  }
}