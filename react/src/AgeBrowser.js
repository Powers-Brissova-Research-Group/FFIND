import React from 'react'
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap'

import ImageGrid from './ImageGrid'

export default class AgeBrowser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: undefined
    }
    this.show = this.show.bind(this)
  }

  show(ages) {
    let filters = {AGE: null}
    switch(ages){
      case 0:
        console.log('Gestational')
        filters['AGE'] = ["G12w", "G12.3w", "G15w", "G15.5w", "G17w", "G17.3w", "G18w", "G33w", "G34.4w+4d", "G37w", "G39.9w", "G41w"]
        break
      case 1:
        filters['AGE'] = ["1d", "5d", "10mo", "2mo", "3mo"]
        console.log('Neonatal')
        break
      case 2:
        filters['AGE'] = ["20mo", "10y", "4y", "5y"]
        console.log('Infant')
        break
      case 3:
      default:
        filters = {}
        console.log('All')
    }
    this.setState({
      open: true,
      tags: filters
    })
  }

  render() {
    if (!this.state.open) {
      return (
        <div className='age-browser'>
          <Container>
            <Row>
              <Col md="12">
                <h1>Browse By Age</h1>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <Button color="primary" size="lg" block onClick={() => this.show(0)}>Gestational</Button>
              </Col>
              <Col md="3">
                <Button color="primary" size="lg" block onClick={() => this.show(1)}>Neonatal</Button>
              </Col>
              <Col md="3">
                <Button color="primary" size="lg" block onClick={() => this.show(2)}>Infant</Button>
              </Col>
              <Col md="3">
                <Button color="primary" size="lg" block onClick={() => this.show(3)}>All</Button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else {
      return(
        <ImageGrid filters={this.state.tags} did={this.props.match.params.did} />
      )
    }
  }
}