import React from 'react'

import {
  Container,
  Row,
  Col,
  Table,
  Progress,
  Button
} from 'reactstrap'

import Error from './Error'

export default class ImageDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      img_data: {},
      tags: [],
      path_path: null
    }
  }

  componentDidMount() {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + this.props.match.params.iid)
      .then(res => res.json())
      .then(
        (result) => {
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
    const { loaded, img_data, detailpath, path_path } = this.state
    if (loaded) {
      return (
        <div className='image-detail'>
          <Container>
            <Row>
              <Col md="8">
                <Row>
                  <Col md="12">
                    <img src={"http://127.0.0.1:8000/" + detailpath} alt="" />
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <h3>Image Details</h3>
                <Row>
                  <Col md="12">
                    <a href={path_path} target="_blank"><Button className='path-button' color="success">Open in Path Viewer</Button></a>
                  </Col>
                </Row>
                <Row>
                  <Table>
                    <tbody>
                      {Object.keys(img_data).sort().map(key => {
                        if (img_data[key] !== null && img_data[key] !== undefined && img_data[key] !== ''){
                          return (<tr><td>{key}</td><td className={key.split('-').map(val => val.trim()).join(' ')}>{img_data[key]}</td></tr>)
                        } else {
                          return null
                        }
                      })}
                    </tbody>
                  </Table>
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