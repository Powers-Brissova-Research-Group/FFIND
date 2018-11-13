import React from 'react'
import {
  Table,
  Button,
  Badge,
  Container,
  Row,
  Col
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import MetaTags from 'react-meta-tags'

import Error from './Error'

export default class DatasetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      datasets: []
    }
    let params = new URLSearchParams(window.location.search)
    this.iids = (params.has('iids') ? params.get('iids') : window.btoa(JSON.stringify([])))
  }

  componentDidMount() {
    // Get the list of all datasets from our API and store them in the current state
    fetch(`${process.env.REACT_APP_API_URL}/datasets/`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            datasets: result
          })
        })
      .catch(err => {
        this.setState({
          error: err
        })
      });
  }

  render() {
    if (this.state.loaded) {
      return (
          <div className="dataset-list">
            <MetaTags>
              <title>Available Datasets -- Pancreatlas / HANDEL-P</title>
              <meta name="description" content="List of datasets available to view in the pancreatlas"/>
            </MetaTags>
            <Container fluid>
              <Container>
                <Row className="v-padded">
                  <Col md="6">
                    <h3>Explore the pancreatlas</h3>
                    <h1>Datasets</h1>
                    <p>Maecenas lorem orci, imperdiet quis gravida vel, aliquam eu quam. Ut vulputate finibus aliquam. Nullam at molestie risus. Pellentesque dignissim nibh eget leo pharetra, vitae congue lectus posuere. Aenean venenatis nibh at odio molestie, nec consequat erat ultricies. Donec dictum velit eget viverra egestas.</p>
                    <p>Quisque cursus facilisis diam, in ornare velit tincidunt facilisis. Proin ut dapibus ligula, quis porta mi. Curabitur posuere bibendum nisl, non fermentum lacus vulputate ac. Sed ut odio mattis, fringilla quam tempus, varius lectus. </p>
                  </Col>

                  <Col md="6">
                    <h3>&nbsp;</h3>
                    <h1>&nbsp;</h1>
                    <p>Generously funded by The Leona M. and Harry B. Helmsley Charitable Trust, <strong>HANDEL-P aims to improve understanding of early events and processes in human pancreatic development through an interactive image atlas.</strong> By examining the islet structure and gene expression in pancreata from donors spanning the neonatal and juvenile stages of life, we hope to gain insight into type 1 diabetes.</p>
 </Col>
                </Row>
              </Container>
            </Container>

        <Container fluid className='shaded'>

          <Container className='v-padded'>
            <Table hover>
              <thead>
                <tr>
                <th>Description</th>
                <th>Images</th>
                <th>Action</th>
                <th>ID</th>
                <th>Date</th>
              </tr>
              </thead>
              <tbody>
                {this.state.datasets.map(item => (
                  <tr key={item.did}>
                  <td><strong>{item.dsname}</strong> <Badge color="light" pill><a href="">? Learn more</a></Badge> <br/>
                      {item.desc || ''}
                  </td>
                  <td>#</td>
                  <td className='action-column'>
                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: `?browse=false&iids=${this.iids}` }}>
                      <Button className='ds-list-left-button' >Browse All Images</Button>
                    </Link>
                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: `?browse=true&iids=${this.iids}` }}>
                      <Button color="primary">Browse by Age</Button>
                    </Link>
                    <Link to={'/pancreatlas/matrixview/' + item.did}>
                      <Button className='ds-list-right-button' outline color="success">Compare Attributes</Button>
                    </Link>
                  </td>
                  <td>{item.did}</td>
                  <td>date-released</td>
                </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Container>


          </div>
      )
    } else if (this.state.error !== undefined) {
      return <Container><Error error_desk={this.state.error.message} /></Container>
    } else {
      return <Container><h1>Loading</h1></Container>
    }
  }
}