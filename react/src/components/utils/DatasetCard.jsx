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

import {
  Link
} from 'react-router-dom'


/**
 * Single card to display relevant data for a dataset
 * @component
 * @author Jimmy Messmer
 */
class DatasetCard extends React.Component {
  constructor(props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)

    this.state = {
      dropdownOpen: false
    }
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  revealActions() {
    this.setState({
      showActions: !this.state.showActions
    })
  }

  render() {
    // let sponsors = this.props.funding !== undefined ? this.props.funding.split(',').map(source => require(`../assets/${source}.jpg`)) : []
    /* global Modernizr */
    let logo = null
    let banner = '//www.placehold.it/326x150/000000/111111/?text=326x150'
    try {
      if (Modernizr.webp.alpha) {
        logo = require(`../../assets/img/logos/${this.props.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.webp`)
      } else {
        logo = require(`../../assets/img/logos/${this.props.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.png`)
      }
    } catch (e) {
      console.log('Cannot find logo')
    }
    try {
      if (Modernizr.webp.alpha) {
        banner = require(`../../assets/img/logos/${this.props.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}-banner.webp`)
      } else {
        banner = require(`../../assets/img/logos/${this.props.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}-banner.jpg`)
      }
    } catch (e) {
      console.log('Cannot find banner')
    }
    return (
      <div className='dataset-card h-100'>
        <Card className='h-100'>
          {logo !== null && <div className='dataset-card-heading' style={{ backgroundImage: `url(${banner})` }}><div className='h-100 white-mask'><CardImg className='ds-logo' src={logo} alt='placeholder' /></div></div>}
          {logo === null && <div className='card-heading-text w-100' style={{ backgroundImage: `url(${banner})` }}><div className='white-mask'><h1 className='full-width w-100'>{this.props.title}</h1></div></div>}
          <CardBody className='text-left d-flex flex-column'>
            {/* <div className='w-100 mb-2'>
              <img className='card-banner-img' src={banner} alt='banner img' />
            </div> */}
            <CardText>{this.props.description}</CardText>
            <Link className='mt-auto' to={`/datasets/${this.props.did}/explore`}><Button className='w-100 align-bottom' color='info'>Browse All</Button></Link>
            {/* <Button className='mt-auto'>Test</Button> */}
          </CardBody>
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
                        <Link to={`/datasets/${this.props.did}/explore`}>Browse all</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to={`/datasets/${this.props.did}/browse-by-age`}>Browse by timeline</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to={'/matrixview/' + this.props.did}>
                          Compare data attributes
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Link to={`/datasets/${this.props.did}/overview`}>
                    <Button outline>Collection  Details</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default DatasetCard