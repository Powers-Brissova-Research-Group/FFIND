import React from 'react'

import {
  Container
} from 'reactstrap'

export default class BrowserNotSupportedBanner extends React.Component {
  render () {
    return (
      <Container fluid className='warning-banner'>
        {this.props.children}
        {/* <h5>Sorry, but your browser ({this.props.browser.charAt(0).toUpperCase() + this.props.browser.slice(1) + ' ' + this.props.version}) is not supported and some site features may not work properly.</h5>
        <p>Please consider using the most recent versions of <a href='https://www.mozilla.org/en-US/firefox/new/'>Mozilla Firefox</a> or <a href='https://www.google.com/chrome'>Google Chrome</a>.</p> */}
      </Container>
    )
  }
}

BrowserNotSupportedBanner.defaultProps = {
  browser: 'Unknown'
}
