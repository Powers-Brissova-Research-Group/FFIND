import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table
} from 'reactstrap'

import {
  Link,
  withRouter
} from 'react-router-dom'

import { Parallax } from 'react-parallax'

import axios from 'axios'

class DatasetOverview extends React.Component {
  constructor(props) {
    super(props)
    let re = /(\/\w+\/?)+([0-9]+)(\/\w+\/?)+/
    this.state = {
      did: (re.exec(window.location.pathname) !== null) ? re.exec(window.location.pathname)[2] : 0
    }
  }

  componentDidMount() {
    let result = require(`../../assets/txt/ffind-defaults/${this.state.did}-metadata.json`)
    this.setState({
      title: result.dsname,
      short_desc: result.kvals.description_short,
      long_desc: result.kvals.description_long,
      importDate: result.kvals.import_date,
      imgCount: result.kvals.img_count
    })
  }
  render() {
    return (
      <div className='datasetOverviewWrapper'>
        <Container className='mt-4'>
          <Row className='mb-4'>
            <Col md='12' className='d-flex align-items-center'>
              <span className='dataset-title'><h1><strong>Collection: {this.state.title}</strong></h1>
                <h3>
                  {this.state.short_desc}
                </h3>
              </span>
            </Col>
          </Row>
          <Row className='mb-4 mt-4'>
            <Col md='12'>
              <Row className='my-4'>
                <Col md='6'>
                  <div className='dataset-description' dangerouslySetInnerHTML={{ __html: this.state.long_desc }} />
                </Col>
                <Col md='6'>
                  <div>
                    {this.state.titleImg !== undefined && <a href={this.state.titleImg.url}><img className='img-fluid dataset-picture' src={require(`../../assets/img/datasets/${this.state.did}/${this.state.titleImg.src}`)} alt='' /></a>}
                  </div>
                  <div className='mt-4'>
                    <h4>Dataset Quick Reference</h4>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>No. of Images</th>
                        <th>Import Date</th>
                        <th>Publication Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.imgCount}</td>
                        <td>{this.state.importDate}</td>
                        <td>{this.state.publishDate}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(DatasetOverview)
