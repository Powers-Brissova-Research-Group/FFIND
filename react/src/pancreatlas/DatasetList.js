import React from 'react'
import {
  Table,
  Button,
  Badge
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

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
        <div className="dataset-list">
          <h1>Datasets</h1>
          <p>Please choose a dataset to explore</p>
          <Table hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Images</th>
                <th>Action</th>
                <th>ID</th>
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
                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=false' }}>
                      <Button className='ds-list-left-button' >Browse All Images</Button>
                    </Link>
                    <Link to={{ pathname: `/pancreatlas/dataset/${item.did}`, search: '?browse=true' }}>
                      <Button color="primary">Browse by Age</Button>
                    </Link>
                    <Link to={'/pancreatlas/matrixview/' + item.did}>
                      <Button className='ds-list-right-button' outline color="success">Compare Attributes</Button>
                    </Link>
                  </td>
                  <td>{item.did}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desk={this.state.error.message} />
    } else {
      return <h1>Loading</h1>
    }
  }
}