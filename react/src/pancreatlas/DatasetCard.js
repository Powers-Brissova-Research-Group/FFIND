import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardFooter,
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import { Collapse } from 'react-collapse'

import {
  Link
} from 'react-router-dom'

export default class DatasetCard extends React.Component {
  constructor (props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.revealActions = this.revealActions.bind(this)

    this.state = {
      dropdownOpen: false,
      showActions: false
    }
  }

  toggleDropdown () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  revealActions () {
    this.setState({
      showActions: !this.state.showActions
    })
  }

  render () {
    // let sponsors = this.props.funding !== undefined ? this.props.funding.split(',').map(source => require(`../assets/${source}.jpg`)) : []
    let logo = 'http://www.placehold.it/326x116'
    try {
      logo = require(`../assets/pancreatlas/logos/${this.props.title.toLowerCase().replace(/ /g, '-')}.png`)
    } catch (e) {
      console.log('Cannot find logo')
    }
    return (
      <div className='dataset-card' onMouseEnter={this.revealActions} onMouseLeave={this.revealActions}>
        <Card className='h-100'>
          <CardImg className='ds-logo' src={logo} alt='placeholder' />
          <CardBody className='text-left'>
            <div className='ds-alt'><CardText>{this.props.description}</CardText></div>
            <Link to={{ pathname: `/pancreatlas/dataset/${this.props.did}`, search: '?browse=false' }}><Button className='w-100' color='info'>Browse All Images</Button></Link>
          </CardBody>
          <Collapse isOpened={this.state.showActions}>
            <CardFooter>
              <Row className='mb-2'>
                <Col md='12'>
                  <div className='dataset-card-buttons'>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                      <DropdownToggle outline color='secondary' caret>
                    Viewing Options
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link to={{ pathname: `/pancreatlas/dataset/${this.props.did}`, search: '?browse=false' }}>Browse All Images</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={{ pathname: `/pancreatlas/dataset/${this.props.did}`, search: '?browse=true' }}>Browse Images by Age</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={'/pancreatlas/matrixview/' + this.props.did}>
                    Browse Images via Matrix
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <Link to={`/pancreatlas/dataset/${this.props.did}/overview`}>
                      <Button outline>Collection  Details</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </CardFooter>
          </Collapse>
        </Card>
      </div>
    )
  }
}
