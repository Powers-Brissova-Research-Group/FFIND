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
      tags: undefined,
      groupName: null,
      group: 4
    }
    this.show = this.show.bind(this)
  }

  show(ages) {
    let filters = {AGE: null}
    let gname = null
    switch(ages){
      case 0:
        gname = 'GESTATIONAL'
        filters['AGE'] = ["G12w", "G12.3w", "G15w", "G15.5w", "G17w", "G17.3w", "G18w", "G33w", "G34.4w+4d", "G37w", "G39.9w", "G41w"]
        break
      case 1:
        gname = 'NEONATAL'
        filters['AGE'] = ["1d", "5d", "10mo", "2mo", "3mo"]
        break
      case 2:
        gname = 'INFANCY'
        filters['AGE'] = ["20mo", "10y", "4y", "5y"]
        break
      case 3:
        gname = 'CHILDHOOD'
        break
      default:
        gname = null
        break
    }
    this.setState({
      open: true,
      group: ages,
      groupName: gname,
      tags: {}
    })
  }

  render() {
    if (!this.state.open && this.props.location.state.browse) {
      return (
        <div className='age-browser'>
          <Container className="age-group-list">
            <Row className="pancreatlas-row">
              <Col md="12">
                <h1>Browse By Age</h1>
              </Col>
            </Row>
            <Row className="pancreatlas-row">
              <Col md="6">
                <Button color="primary" size="lg" block onClick={() => this.show(0)}>Gestational</Button>
              </Col>
              <Col md="6">
                <Button color="primary" size="lg" block onClick={() => this.show(1)}>Neonatal</Button>
              </Col>
            </Row>
            <Row className="pancreatlas-row">
              <Col md="6">
                <Button color="primary" size="lg" block onClick={() => this.show(2)}>Infant</Button>
              </Col>
              <Col md="6">
                <Button color="primary" size="lg" block onClick={() => this.show(3)}>Childhood</Button>
              </Col>
            </Row>
            <Row className="pancreatlas-row"w>
              <Col md="12">
                <Button color="secondary" size="lg" block onClick={() => this.show(4)}>All</Button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else {
      return(
        <ImageGrid filters={{}} group={this.state.group } groupName={this.state.groupName} did={this.props.match.params.did} />
      )
    }
  }
}