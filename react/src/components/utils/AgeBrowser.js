import React from 'react'
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap'

import axios from 'axios'

import MetaTags from 'react-meta-tags'

import {
  Link
} from 'react-router-dom'

import { ImageGrid, ImageGridBoundary } from '../grid-view'
import PageBanner from './PageBanner'

// import neonatalTimeline from '../assets/pancreatlas/ages/timeline-neonatal.png'
// import infantTimeline from '../assets/pancreatlas/ages/timeline-infancy.png'
// import childhoodTimeline from '../assets/pancreatlas/ages/timeline-childhood.png'

// import neonatalIslet from '../assets/pancreatlas/ages/neonatal-islet.png'
// import infantIslet from '../assets/pancreatlas/ages/infant-islet.png'
// import childhoodIslet from '../assets/pancreatlas/ages/childhood-islet.png'

var ageGroups = {
  'neonatal': {
    'start': 'Birth',
    'end': '2 months'
  },
  'infancy': {
    'start': '2 months',
    'end': '24 months'
  },
  'childhood': {
    'start': '2 years',
    'end': '10 years'
  },
  'adult': {
    'start': '10 years',
    'end': null
  }
}

export default class AgeBrowser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: undefined,
      groupName: null,
      group: 4,
      ages: []
    }
    this.show = this.show.bind(this)
  }

  show(ages) {
    // let filters = { AGE: null }
    // let gname = ages
    // switch (ages) {
    //   case 'NEONATAL':
    //     gname = 'GESTATIONAL'
    //     filters['AGE'] = ['G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', 'G18w', 'G33w', 'G34.4w+4d', 'G37w', 'G39.9w', 'G41w']
    //     break
    //   case 1:
    //     gname = 'NEONATAL'
    //     filters['AGE'] = ['1d', '5d', '10mo', '2mo', '3mo']
    //     break
    //   case 2:
    //     gname = 'INFANCY'
    //     filters['AGE'] = ['20mo', '10y', '4y', '5y']
    //     break
    //   case 3:
    //     gname = 'CHILDHOOD'
    //     break
    //   default:
    //     gname = null
    //     break
    // }
    this.setState({
      open: true,
      group: ages,
      groupName: ages,
      tags: {}
    })
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.props.match.params.did}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(result => {
      this.setState({
        title: result.data.dsname,
        ages: JSON.parse(result.data.kvals.ages)
      })
    })
  }

  render() {
    var logo = null
    if (this.state.title !== undefined) {
      logo = require(`../../assets/img/datasets/${this.props.match.params.did}/${this.state.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.jpg`)
    }
    return (
      <div className='age-browser'>
        <MetaTags>
          <title>Browse Data by Age -- Pancreatlas</title>
          <meta name='description' content='Browse a given dataset by age in the pancreatlas' />
        </MetaTags>
        <PageBanner image={logo !== null} bgImg={logo}>
          <h1>Browse Images by Donor Age</h1>
          <p className='text-larger'>View all images from a specific age group</p>
        </PageBanner>
        <Container className='age-group-list'>
          <Row className='pancreatlas-row'>
            {/* <Col md='3'>
                <span className='age-group' onClick={() => this.show(0)}>
                  <span className='age-group-text'>Gestational<br /><small>Weeks 7 &ndash; 18</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={gestationalIslet} alt='gestational islet' />
                    <img className='age-group-img' src={neonatalTimeline} alt='gestational' />
                  </span>
                </span>
              </Col> */}
            <Col md='12 d-flex flex-row justify-content-between'>
              {this.state.ages.map((age) => {
                return (
                  <Link to={`/datasets/${this.props.match.params.did}/explore?AGE=${age.link}`}>
                    <span className='age-group'>
                      <span className='age-group-text'>{`${age.name.charAt(0).toUpperCase()}${age.name.slice(1).toLowerCase()}`}<br />{`${ageGroups[age.name].start} - ${ageGroups[age.name].end}`}</span>
                      <span className='age-group-imgs'>
                        <img className='age-group-img islet' src={require(`../../assets/img/ages/${age.name}-islet.png`)} alt='' />
                        <img className='age-group-img' src={require(`../../assets/img/ages/timeline-${age.name}.png`)} alt='' />
                      </span>
                    </span>
                  </Link>
                )
              })
              }
              {/* <span className='age-group' onClick={() => this.show(1)}>
                  <span className='age-group-text'>Neonatal<br /><small>Birth &ndash; 2 months</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={neonatalIslet} alt='neonatal islet' />
                    <img className='age-group-img' src={neonatalTimeline} alt='neonatal' />
                  </span>
                </span>
                <span className='age-group' onClick={() => this.show(2)}>
                  <span className='age-group-text'>Infant<br /><small>2 months &ndash; 24 months</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={infantIslet} alt='infant islet' />
                    <img className='age-group-img' src={infantTimeline} alt='infant' />
                  </span>
                </span>
                <span className='age-group' onClick={() => this.show(3)}>
                  <span className='age-group-text'>Childhood<br /><small>2 years &ndash; 10 years</small></span>
                  <span className='age-group-imgs'>
                    <img className='age-group-img islet' src={childhoodIslet} alt='childhood islet' />
                    <img className='age-group-img' src={childhoodTimeline} alt='childhood' />
                  </span>
                </span> */}
              {/* <Button color="primary" size="lg" block onClick={() => this.show(3)}>Childhood</Button> */}
            </Col>
          </Row>
          <Row className='pancreatlas-row view-all-ages last'>
            <Col md='12'>
              <Button className='view-all' color='secondary' size='lg' block onClick={() => this.show(4)}>View All Ages</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

AgeBrowser.defaultProps = {
  location: {
    state: {
      browse: false
    }
  }
}
