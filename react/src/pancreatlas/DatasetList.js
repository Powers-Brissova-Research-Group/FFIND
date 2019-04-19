import React from 'react'
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import { Parallax } from 'react-parallax'

import MetaTags from 'react-meta-tags'

import Error from './Error'
import LoadingBar from './LoadingBar'
import DatasetCard from './DatasetCard'

import axios from 'axios'

export default class DatasetList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      datasets: [],
      activeTab: '0'
    }
    let params = new URLSearchParams(window.location.search)
    this.iids = (params.has('iids') ? params.get('iids') : window.btoa(JSON.stringify([])))
  }

  componentDidMount () {
    // Get the list of all datasets from our API and store them in the current state
    axios.create({
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/`).then(result => {
      this.setState({
        loaded: true,
        datasets: result.data.sort(function (a, b) {
          if (a.did < b.did) return -1
          if (a.did > b.did) return 1
          return 0
        })
      })
    }).catch(err => {
      this.setState({
        error: err
      })
    })
  }
  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div className='dataset-list'>
          <MetaTags>
            <title>Available Datasets -- Pancreatlas</title>
            <meta name='description' content='List of datasets available to view in the pancreatlas' />
          </MetaTags>
          <Parallax
            blur={0}
            bgImage={require('../assets/header1.jpg')}
            bgImageAlt='Sample Image'
            strength={0}
            style={{ marginTop: '-1.5rem', marginBottom: '1.5rem' }}
          >
            <div className='parallax-filler' style={{ height: '45vh' }}>
              <Container className='h-100'>
                <Row className='h-100'>
                  <Col md='12' className='d-flex align-items-center'>
                    <div className='dataset-title align-middle'>
                      {/* <h1>Explore the pancreatlas</h1> */}
                      <h1>Explore Image Collections</h1>
                      <p className='text-larger'>For more information on our data, please visit our <Link to='/pancreatlas/nomenclature'>nomenclature page</Link>.</p>
                    </div>
                  </Col>
                  {/* <Col md='6' className='d-flex align-items-center'>
                    <span className='dataset-title'>
                      <h3>
                        {this.state.desc}
                      </h3>
                    </span>
                  </Col> */}
                </Row>
              </Container>
            </div>
          </Parallax>

          <Container>

            <div className='dataset-lists'>
              {/* <h1 className='mb-4'>Image Collections</h1> */}
              <Nav tabs>
                <NavItem>
                  <NavLink className={`${(this.state.activeTab === '0') ? 'active' : undefined} navlink`} onClick={() => { this.toggle('0') }}>
                    Grid View
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={`${(this.state.activeTab === '1') ? 'active' : undefined} navlink`} onClick={() => { this.toggle('1') }}>
                    List View
                  </NavLink>
                </NavItem>

              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='0'>
                  <div className='dataset-cards'>
                    <Row>
                      {this.state.datasets.map(item => (
                        <Col key={`${item.dsname}-col`} md='4'>
                          <DatasetCard key={item.dsname} title={item.dsname} description={item.desc || undefined} funding={item.kvals.funding} did={item.did} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </TabPane>
                <TabPane tabId='1'>
                  <Row>
                    <Col md='12'>
                      <div className='table table-responsive'>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th className='text-center'>Images</th>
                              <th className='text-center'>Browsing Option</th>
                              <th className='text-center'>ID</th>
                              <th className='text-center'>Publish Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.datasets.map(item => (
                              <tr key={item.did}>
                                {/* <Badge color='dark' pill><a href='dataset'>? Learn more</a></Badge> */}
                                <td><b>{item.dsname}</b><br />
                                  {item.desc || ''}
                                </td>
                                <td className='text-center'>{item.kvals.image_count}</td>
                                <td className='action-column text-center'>
                                  <Row>
                                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=false' }}>
                                      <Button className='ds-list-left-button' >Browse All Images</Button>
                                    </Link>
                                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=true' }}>
                                      <Button color='primary'>Browse by Age</Button>
                                    </Link>
                                    <Link to={'/pancreatlas/matrixview/' + item.did}>
                                      <Button className='ds-list-right-button' outline color='success'>Compare Attributes</Button>
                                    </Link>
                                  </Row>
                                </td>
                                <td className='text-center'>{item.did}</td>
                                <td className='text-center'>{item.kvals.release_date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Container><Error error_desk={this.state.error.message} /></Container>
    } else {
      return <LoadingBar loadingInfo='list of datasets' />
    }
  }
}
