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

import Error from './Error'
import LoadingBar from './LoadingBar'
import DatasetCard from './DatasetCard'

import mock_datasets from '../../assets/txt/ffind-defaults/mock_datasets.json'

export default class DatasetList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      datasets: [],
      activeTab: '0'
    }
    let params = new URLSearchParams(window.location.search)
    this.iids = (params.has('iids') ? params.get('iids') : window.btoa(JSON.stringify([])))
  }

  componentDidMount() {
    this.setState({
      loaded: true,
      datasets: mock_datasets.sort(function (a, b) {
        if (a.did < b.did) return -1
        if (a.did > b.did) return 1
        return 0
      })
    })
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className='dataset-lists'>
          {/* <h1 className='mb-4'>Image Collections</h1> */}
          <Nav tabs>
            <NavItem>
              <NavLink className={`dataset-nav ${(this.state.activeTab === '0') ? 'active' : undefined} navlink`} onClick={() => { this.toggle('0') }}>
                Grid View
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`dataset-nav ${(this.state.activeTab === '1') ? 'active' : undefined} navlink`} onClick={() => { this.toggle('1') }}>
                List View
              </NavLink>
            </NavItem>

          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId='0'>
              <div className='dataset-cards'>
                <Row>
                  {this.state.datasets.map(item => (
                    <Col className='mb-4' key={`${item.dsname}-col`} md='4'>
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
                    <Table style={{color: 'white'}}>
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
                            <td className='text-center'>{item.kvals.img_count}</td>
                            <td className='action-column text-center'>
                              <Row>
                                <Link to={{ pathname: `/datasets/${item.did}`, search: '?browse=false' }}>
                                  <Button className='ds-list-left-button' >Browse all</Button>
                                </Link>
                                <Link to={{ pathname: `/datasets/${item.did}`, search: '?browse=true' }}>
                                  <Button color='primary'>Browse by timeline</Button>
                                </Link>
                                <Link to={'/matrixview/' + item.did}>
                                  <Button className='ds-list-right-button' outline color='success'>Compare data attributes</Button>
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
          <Link to='/explore-all-images'>
            <Button color='primary'>Explore all Images</Button>
          </Link>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Container><Error error_desk={this.state.error.message} /></Container>
    } else {
      return <LoadingBar loadingInfo='list of datasets' />
    }
  }
}
