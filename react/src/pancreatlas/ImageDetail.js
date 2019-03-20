import React from 'react'

import {
  Container,
  Row,
  Col,
  Table,
  Button
} from 'reactstrap'

import DetailRow from './DetailRow'
import LoadingBar from './LoadingBar'

import Error from './Error'

import { Link } from 'react-router-dom'

export default class ImageDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      imgData: {},
      tags: [],
      pathPath: null,
      ttOpen: false
    }
  }

  componentDidMount () {
    this.defs = require('../assets/pancreatlas/definitions.json')
    let iid = (this.props.match !== undefined) ? this.props.match.params.iid : 0
    window.fetch(`${process.env.REACT_APP_API_URL}/images/${iid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': true,
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          let path = result.kvals['File path'].val
          let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
          let matches = re.exec(path)
          result.kvals['File path'].val = matches[0]
          this.setState({
            loaded: true,
            detailpath: result.detailpath,
            img_data: result.kvals,
            tags: result.tags,
            path_path: result.pathpath
          })
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      })
  }

  render () {
    const { loaded, imgData, pathPath } = this.state
    if (loaded) {
      return (
        <div className='image-detail'>
          <Container>
            <Row className='pancreatlas-row'>
              <Col md='8'>
                <Row className='pancreatlas-row'>
                  <a className='large-thumbnail' href={pathPath} target='_blank' rel='noopener noreferrer'><img className='large-thumbnail' src={require(`../assets/pancreatlas/large_thumbs/${this.props.match.params.iid}.jpg`)} alt='Detail View' /></a>
                </Row>
              </Col>
              <Col md='4'>
                <h3>Image Preview</h3>
                <Row className='pancreatlas-row'>
                  <Col md='12'>
                    <a href={pathPath} target='_blank' rel='noopener noreferrer'><Button className='path-button' color='success'>Open in PathViewer</Button></a>
                  </Col>
                </Row>
                <Row className='pancreatlas-row'>
                  <Table>
                    <tbody>
                      {Object.keys(imgData).sort().filter(key => ['Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - Pancreas Region'].indexOf(key) === -1).map(key => {
                        return <DetailRow data={imgData[key].val} desc={this.defs[key].short_desc} heading={key} />
                        // if (img_data[key] !== null && img_data[key] !== undefined && img_data[key] !== ''){
                        //   return (<tr><td><p id={key + '-tooltip'}>{key}</p></td><td className={key.split('-').map(val => val.trim()).join(' ')}>{img_data[key]}</td></tr>)
                        // } else {
                        //   return null
                        // }
                      })}
                    </tbody>
                  </Table>
                </Row>
                <Row className='pancreatlas-row'>
                  <p className='text-left'>Want more information about the image details? Visit our <Link to={'/pancreatlas/nomenclature'}>nomenclature page</Link></p>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <LoadingBar />
      )
    }
  }
}
