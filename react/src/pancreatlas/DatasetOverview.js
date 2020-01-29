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
      title: 'Default Title',
      desc: 'Default desc',
      did: (re.exec(window.location.pathname) !== null) ? re.exec(window.location.pathname)[2] : 0,
      funders: [],
      imgs: [],
      titleImg: undefined
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.state.did}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(result => {
      let sponsors = result.data.kvals.funding !== undefined ? result.data.kvals.funding.split(',').map(source => require(`../assets/${source}.jpg`)) : []
      let imgs = result.data.kvals.imgs !== undefined ? result.data.kvals.imgs.split(',') : []
      let titleImgData = JSON.parse(result.data.kvals.title_img)
      this.setState({
        title: result.data.dsname,
        short_desc: result.data.kvals.description_short,
        long_desc: result.data.kvals.description_long,
        funders: sponsors,
        imgs: imgs,
        titleImg: titleImgData,
        sponsors: result.data.kvals.sponsor_text,
        importDate: result.data.kvals.import_date,
        publishDate: result.data.kvals.release_date,
        refs: result.data.kvals.refs,
        imgTypes: result.data.kvals.img_types,
        imgCount: result.data.kvals.img_count,
        importFileLink: result.data.kvals.import_file
      })
    })
  }
  render() {
    var logo = null
    if (this.state.title.toLowerCase() !== 'default title') {
      logo = require(`../assets/${this.state.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.jpg`)
    }
    return (
      <div className='datasetOverviewWrapper'>
        <Parallax
          blur={0}
          bgImage={logo}
          bgImageAlt='Sample Image'
          strength={500}
        >
          <div className='parallax-filler' style={{ height: '50vh' }}>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col md='12' className='d-flex align-items-center'>
                  <span className='dataset-title'><h1><strong>Collection: {this.state.title}</strong></h1>
                    <h3>
                      {this.state.short_desc}
                    </h3>
                  </span>
                </Col>
              </Row>
            </Container>
          </div>
        </Parallax>
        <Container className='mt-4'>
          <Row className='mb-4 mt-4'>
            <Col md='12'>
              <Row className='my-4'>
                <Col md='6'>
                  <div className='dataset-description' dangerouslySetInnerHTML={{ __html: this.state.long_desc }} />
                </Col>
                <Col md='6'>
                  <div>
                    {this.state.titleImg !== undefined && <a href={this.state.titleImg.url}><img className='img-fluid dataset-picture' src={require(`../assets/pancreatlas/${this.state.did}/${this.state.titleImg.src}`)} alt='' /></a>}
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
                        <th>Image Type(s)</th>
                        <th>References</th>
                        <th>Source Import Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.imgCount}</td>
                        <td>{this.state.importDate}</td>
                        <td>{this.state.publishDate}</td>
                        <td>{this.state.imgTypes}</td>
                        <td>{this.state.refs}</td>
                        <td><a href={this.state.importFileLink} target='_blank' rel="noopener noreferrer">Download</a></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md='12'>
                  {this.state.imgs.map((img) => {
                    return <img className='img-fluid' src={require(`../assets/pancreatlas/${this.state.did}/${img}`)} alt='' />
                  })}
                </Col>
              </Row>
              <Row className='my-4'>
                <Col md='12'>
                  <h3 className='mt-4'>Here are some suggested projections of the data within this set:</h3>
                </Col>
              </Row>
              <Row className='my-4'>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>Browse by Age</h3>
                      <p>Choose a specific age range of donors within which to view samples</p>
                      <Link to={{ pathname: `/datasets/${this.state.did}`, search: '?browse=true' }}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>Browse by Matrix</h3>
                      <p>Create a two-dimensional matrix comparing specified attribute sets to find data matching specific criteria</p>
                      <Link to={`/matrixview/${this.state.did}`}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card className='h-100'>
                    <CardBody>
                      <h3>View All Images</h3>
                      <p>Don't restrict the data by any filters and view the entire collection</p>
                      <Link to={{ pathname: `/datasets/${this.state.did}`, search: '?browse=false' }}>
                        <Button>Browse</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Col md='12'>
              <p dangerouslySetInnerHTML={{ __html: this.state.sponsors }} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(DatasetOverview)
