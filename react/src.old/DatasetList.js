import React from 'react'
import {
  Table,
  Button
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
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/datasets/')
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
          <Table hover>
            <thead>
              <tr>
                <th>Dataset ID</th>
                <th>Dataset Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datasets.map(item => (
                <tr key={item.did}>
                  <td>{item.did}</td>
                  <td>{item.dsname}</td>
                  <td>
                    <Link to={{pathname: '/dataset/' + item.did, state: { browse: true }}}>
                      <Button className='ds-list-left-button' color="primary">Browse By Age</Button>
                    </Link>
                    <Link to={'/matrixview/' + item.did}>
                      <Button outline color="success">Create Matrix</Button>
                    </Link>
                    <Link to={{pathname: '/dataset/' + item.did, state: {browse: false }}}>
                      <Button  className='ds-list-right-button'>Open Dataset</Button>
                    </Link>
                  </td>
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