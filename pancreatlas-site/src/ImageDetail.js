import React from 'react'

import {
  Container,
  Row,
  Col,
  Table,
  Progress,
  Button
} from 'reactstrap'

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
    fetch('http://127.0.0.1:8000/api/images/' + this.props.match.params.iid)
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
        });
  }

  render() {
    const { loaded, img_data, detailpath, path_path } = this.state
    if (!loaded) {
      return (
        <Container>
          <strong>Loading...</strong>
          <Progress animated color="success" value="100" />
        </Container>
      )
    } else {
      return (
        <div className='image-detail'>
          <Container>
            <Row>
              <Col md="8">
                <img src={"http://127.0.0.1:8000/" + detailpath} alt="" />
              </Col>
              <Col md="4">
                <h3>Image Details</h3>
                <Table>
                  <tbody>
                    {Object.keys(img_data).map(key => (
                      <tr><td>{key}</td><td>{img_data[key]}</td></tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <a href={path_path}><Button color="success">Open in Path Viewer</Button></a>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }
}