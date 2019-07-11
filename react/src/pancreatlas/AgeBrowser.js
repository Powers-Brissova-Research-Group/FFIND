import React from 'react'
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap'

import axios from 'axios'

import MetaTags from 'react-meta-tags'

import ImageGrid from './ImageGrid'
import ImageGridBoundary from './ImageGridBoundary'
import PageBanner from './PageBanner'

import neonatalTimeline from '../assets/pancreatlas/ages/timeline-neonatal.png'
import infantTimeline from '../assets/pancreatlas/ages/timeline-infancy.png'
import childhoodTimeline from '../assets/pancreatlas/ages/timeline-childhood.png'

import gestationalIslet from '../assets/pancreatlas/ages/fetal-islet.png'
import neonatalIslet from '../assets/pancreatlas/ages/neonatal-islet.png'
import infantIslet from '../assets/pancreatlas/ages/infant-islet.png'
import childhoodIslet from '../assets/pancreatlas/ages/childhood-islet.png'

export default class AgeBrowser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      tags: undefined,
      groupName: null,
      group: 4
    }
    this.show = this.show.bind(this)
  }

  show (ages) {
    let filters = { AGE: null }
    let gname = null
    switch (ages) {
      case 0:
        gname = 'GESTATIONAL'
        filters['AGE'] = ['G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', 'G18w', 'G33w', 'G34.4w+4d', 'G37w', 'G39.9w', 'G41w']
        break
      case 1:
        gname = 'NEONATAL'
        filters['AGE'] = ['1d', '5d', '10mo', '2mo', '3mo']
        break
      case 2:
        gname = 'INFANCY'
        filters['AGE'] = ['20mo', '10y', '4y', '5y']
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

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.props.match.params.did}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(result => {
      this.setState({
        title: result.data.dsname
      })
    })
  }

  render () {
    let params = new URLSearchParams(this.props.location.search)
    let browse = !((params.get('browse') === null || params.get('browse').toLowerCase() !== 'true'))
    var logo = null
    if (this.state.title !== undefined) {
      logo = require(`../assets/${this.state.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.jpg`)
    }

    if (!this.state.open && browse === true) {
      return (
        <div className='age-browser'>
          <MetaTags>
            <title>Browse Data by Age  -- Pancreatlas / HANDEL-P</title>
            <meta name='description' content='Browse a given dataset by age in the pancreatlas' />
          </MetaTags>
          <PageBanner image={logo !== null} bgImg={logo}>
            <h1>Browse Images by Donor Age</h1>
            <p className='text-larger'>View all images from a specific age group</p>
          </PageBanner>
          <Container className='age-group-list'>
            <Row className='pancreatlas-row'>
              <Col md='3'>
                <span className='age-group' onClick={() => this.show(0)}>
                  <span className='age-group-text'>Gestational<br /><small>Weeks 7 &ndash; 18</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={gestationalIslet} alt='gestational islet' />
                    <img className='age-group-img' src={neonatalTimeline} alt='gestational' />
                  </span>
                </span>
                {/* <Button color="primary" size="lg" block onClick={() => this.show(0)}>Gestational</Button> */}
              </Col>
              <Col md='3'>
                <span className='age-group' onClick={() => this.show(1)}>
                  <span className='age-group-text'>Neonatal<br /><small>Birth &ndash; 2 months</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={neonatalIslet} alt='neonatal islet' />
                    <img className='age-group-img' src={neonatalTimeline} alt='neonatal' />
                  </span>
                </span>
                {/* <Button color="primary" size="lg" block onClick={() => this.show(1)}>Neonatal</Button> */}
              </Col>
              <Col md='3'>
                <span className='age-group' onClick={() => this.show(2)}>
                  <span className='age-group-text'>Infant<br /><small>2 months &ndash; 24 months</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={infantIslet} alt='infant islet' />
                    <img className='age-group-img' src={infantTimeline} alt='infant' />
                  </span>
                </span>
                {/* <Button color="primary" size="lg" block onClick={() => this.show(2)}>Infant</Button> */}
              </Col>
              <Col md='3'>
                <span className='age-group' onClick={() => this.show(3)}>
                  <span className='age-group-text'>Childhood<br /><small>2 years &ndash; 10 years</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={childhoodIslet} alt='childhood islet' />
                    <img className='age-group-img' src={childhoodTimeline} alt='childhood' />
                  </span>
                </span>
                {/* <Button color="primary" size="lg" block onClick={() => this.show(3)}>Childhood</Button> */}
              </Col>
            </Row>
            <Row className='pancreatlas-row view-all-ages last'>
              <Col md={{ size: 8, offset: 2 }}>
                <Button className='view-all' color='secondary' size='lg' block onClick={() => this.show(4)}>View All Ages</Button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else {
      let did = (this.props.match !== undefined) ? this.props.match.params.did : 0
      return (
        <ImageGridBoundary>
          <ImageGrid favorites={this.props.favorites} favoriteCallback={this.props.favoriteCallback} filters={{}} group={this.state.group} groupName={this.state.groupName} did={did} />
        </ImageGridBoundary>
      )
    }
  }
}

AgeBrowser.defaultProps = {
  location: {
    state: {
      browse: false
    }
  }
}
