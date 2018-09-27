import React from 'react'

import {
  Container,
  Row,
  Col,
  Table,
  Progress,
  Button
} from 'reactstrap'

import DetailRow from './DetailRow'

import Error from './Error'

import { Link } from 'react-router-dom'

export default class ImageDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      img_data: {},
      tags: [],
      path_path: null,
      ttOpen: false
    }
  }

  componentDidMount() {
    this.defs = require('../assets/pancreatlas/definitions.json')
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + this.props.match.params.iid)
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
      });

  }

  render() {
    const { loaded, img_data, path_path } = this.state
    if (loaded) {
      return (
        <div className='image-detail'>
          <Container>
            <Row className="pancreatlas-row">
              <Col md="8">
                <Row className="pancreatlas-row">
                    <a className='large-thumbnail' href={path_path} target="_blank"><img className='large-thumbnail' src={require(`../assets/pancreatlas/large_thumbs/${this.props.match.params.iid}.jpg`)} alt="Detail View" /></a>
                </Row>
              </Col>
              <Col md="4">
                <h3>Image Details</h3>
                <Row className="pancreatlas-row">
                  <Col md="12">
                    <a href={path_path} target="_blank"><Button className='path-button' color="success">Open in PathViewer</Button></a>
                  </Col>
                </Row>
                <Row className="pancreatlas-row">
                  <Table>
                    <tbody>
                      {Object.keys(img_data).sort().filter(key => ['Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - Pancreas Region'].indexOf(key) === -1).map(key => {
                         return <DetailRow data={img_data[key].val} desc={this.defs[key].short_desc} heading={key} />
                        // if (img_data[key] !== null && img_data[key] !== undefined && img_data[key] !== ''){
                        //   return (<tr><td><p id={key + '-tooltip'}>{key}</p></td><td className={key.split('-').map(val => val.trim()).join(' ')}>{img_data[key]}</td></tr>)
                        // } else {
                        //   return null
                        // }
                      })}
                    </tbody>
                  </Table>
                </Row>
                <Row className="pancreatlas-row">
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
        <Container>
          <strong>Loading...</strong>
          <Progress animated color="success" value="100" />
        </Container>

      )
    }
  }
}
