import React from 'react'
import * as Sentry from '@sentry/browser'
import {
  Button
} from 'reactstrap'

export default class ImageGridBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      eventId: null
    }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render () {
    if (this.state.error) {
      return (<Button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</Button>)
    } else {
      return this.props.children
    }
  }
}
