import React from 'react'
import {
  Table,
  Button,
  Container
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
        <Container>
          <div className="dataset-list">
            <MetaTags>
              <title>HDL-P | Pancreatlas > Dataset List</title>
              <meta name="description" content="List of datasets available to view in the pancreatlas"/>
            </MetaTags>
            <h1>Datasets</h1>
            <p>Please choose a dataset to explore</p>
            <Table hover>
              <thead>
                <tr>
                  <th>Dataset ID</th>
                  <th>Dataset Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.datasets.map(item => (
                  <tr key={item.did}>
                    <td>{item.did}</td>
                    <td><strong>{item.dsname}</strong><br></br>{item.desc}</td>
                    <td className='action-column'>
                      <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=false' }}>
                        <Button className='ds-list-left-button' >Browse Dataset</Button>
                      </Link>
                      <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=true' }}>
                        <Button color="primary">Browse by Age</Button>
                      </Link>
                      <Link to={'/pancreatlas/matrixview/' + item.did}>
                        <Button className='ds-list-right-button' outline color="success">Pick &amp; Compare Attribute Pairs</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      )
    } else if (this.state.error !== undefined) {
      return <Container><Error error_desk={this.state.error.message} /></Container>
    } else {
      return <Container><h1>Loading</h1></Container>
    }
  }
}